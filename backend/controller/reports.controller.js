import Report from "../model/reports.model.js";
import Budget from "../model/budget.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AvailableFrequencies } from "../constants.js";
import { toObjectId } from "../utils/helper.js";

const gendate = (period) => {
  const date = new Date();
  const year = date.getUTCFullYear(); // Use UTC year
  const month = date.getUTCMonth(); // Use UTC month

  if (period === "YEARLY") {
    const startDate = new Date(Date.UTC(year, 0, 1)); // Start of the year (UTC)
    const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)); // End of the year (UTC)
    return { startDate, endDate };
  } else if (period === "MONTHLY") {
    const startDate = new Date(Date.UTC(year, month, 1)); // Start of the month (UTC)
    const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999)); // End of the month (UTC)
    return { startDate, endDate };
  } else if (period === "WEEKLY") {
    const startDate = new Date(
      Date.UTC(year, month, date.getUTCDate() - date.getUTCDay())
    ); // Start of the week (UTC)
    const endDate = new Date(
      Date.UTC(
        year,
        month,
        date.getUTCDate() - date.getUTCDay() + 6,
        23,
        59,
        59,
        999
      )
    ); // End of the week (UTC)
    return { startDate, endDate };
  } else {
    throw new ApiError(
      500,
      "Invalid period. Allowed values: 'YEARLY', 'MONTHLY', 'WEEKLY'.",
      []
    );
  }
};

/**
 * Create report for the user based on the period
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @description Create report for the user based on the period {@link AvailableFrequencies}
 */
export const createReport = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const period = req.query.period.toUpperCase();

  // Validate period
  if (!AvailableFrequencies.includes(period)) {
    return next(new ApiError(400, "Invalid period", []));
  }

  const { startDate, endDate } = gendate(period);

  // Aggregate pipeline to fetch budgets, categories, and expenses
  const report = await Budget.aggregate([
    {
      $match: {
        userId: toObjectId(userId),
        period: period,
        startDate: { $gte: startDate },
        endDate: { $lte: endDate },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categories.category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $unwind: "$categoryDetails",
    },
    {
      $lookup: {
        from: "expenses",
        let: { categoryId: "$categoryDetails.name" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$userId", toObjectId(userId)] },
                  { $eq: ["$category", "$$categoryId"] },
                  { $gte: ["$date", startDate] },
                  { $lte: ["$date", endDate] },
                ],
              },
            },
          },
        ],
        as: "expenses",
      },
    },
    // {
    //   $project: {
    //     _id: 1,
    //     categoryDetails: 1, // Inspect the categories array
    //     categories: 1,
    //     expenses: 1,
    //   },
    // },
    {
      $set: {
        totalBudget: {
          $sum: {
            $map: {
              input: "$categories",
              as: "category",
              in: "$$category.initialLimit",
            },
          },
        },
        totalExpenses: {
          $sum: { $sum: "$expenses.amount" },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        categoryData: {
          $push: {
            // category: "$categoryDetails.name",
            categories: {
              $map: {
                input: {
                  $filter: {
                    input: "$categories",
                    as: "category",
                    cond: {
                      $eq: ["$$category.categoryName", "$categoryDetails.name"],
                    },
                  },
                },
                as: "category",
                in: {
                  categoryId: "$$category._id",
                  name: "$$category.categoryName",
                  limit: "$$category.initialLimit",
                  totalSpent: "$$category.currentLimit",
                },
              },
            },
            expenses: "$expenses",
          },
        },

        totalBudget: {
          $first: "$totalBudget",
        },
        totalExpenses: { $sum: { $sum: "$expenses.amount" } },
      },
    },
    {
      $project: {
        _id: 0,
        categoryData: 1,
        totalBudget: 1,
        totalExpenses: 1,
        difference: { $subtract: ["$totalBudget", "$totalExpenses"] },
      },
    },
  ]);

  if (!report || report.length === 0) {
    return next(new ApiError(404, "No report found", []));
  }
  const data = new Report({
    user: userId,
    type: period,
    startDate: startDate,
    endDate: endDate,
    totalBudget: report[0].totalBudget,
    totalExpenses: report[0].totalExpenses,
    categoryBreakdown: report[0].categoryData.map((cat) => ({
      category: cat.categories.map((v) => v.categoryId),
      totalSpent: cat.categories.map((v) => v.totalSpent),
    })),
    paymentMethodBreakdown: report.categoryData.map((data) => ({
      paymentMethod: data.expenses.map((v) => v.paymentMethod),
      totalSpent: data.expenses.map((v) => v.amount),
    })),
  });
  await data.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { report: report[0] },
        "Report generated successfully"
      )
    );
});
