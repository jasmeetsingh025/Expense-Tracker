import { UserEnumRole } from "../constants.js";
import Budget from "../model/budget.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Category from "../model/category.model.js";

//* Create Budget
export const createBudget = asyncHandler(async (req, res, next) => {
  const { category, limit, startDate, endDate, period } = req.body;
  //? A user can have two types of budgets - global and category based
  //? If category is global, then the budget is global
  //? If category is not global, then the budget is category based
  //* So if the user already have a category based budget but they send the create request with new category then
  //* we will not create a new budget but update the existing budget by pushing the new category to the categories array

  const userId = req.user?.id;
  const existingBudget = await Budget.find({ userId: userId });
  //* First we check if the user already have a budget and what type of budget is it
  //? We can diffrentiate between period of the budgets
  //? If the user already have a budget with the same period then we will update the existing budget
  //? If the user already have a budget with different period then we will create a new budget
  //* We will loop the existing budgets and check if the user already have a budget with the same period
  for (let i = 0; i < existingBudget.length; i++) {
    if (existingBudget[i].period == period) {
      if (existingBudget[i].categories.length > 0) {
        //* If the user already have a category based budget and they send a request to create a new category based budget
        //* then we will update the existing budget by pushing the new category to the categories array
        if (category !== "global") {
          const categoryExists = await Category.findOne({ name: category });
          if (categoryExists) {
            existingBudget[i].categories.push({
              category: categoryExists.id,
              categoryName: categoryExists.name,
              initialLimit: limit,
              currentLimit: limit,
            });
            await existingBudget[i].save();
          } else {
            return next(
              new ApiError(404, `Category ${category} not found`, [])
            );
          }
        } else {
          //* If the user already have a category based budget and they send a request to create a new global budget
          //* then we will update the existing budget by updating the globalInitialLimit and globalCurrentLimit
          existingBudget[i].globalInitialLimit = limit;
          existingBudget[i].globalCurrentLimit = limit;
          await existingBudget[i].save();
        }
        return res
          .status(201)
          .json(
            new ApiResponse(
              201,
              { budget: existingBudget[i] },
              "Budget created successfully"
            )
          );
      } else {
        //* If the user already have a global budget and non of the category based budget
        //* then we will update the existing budget by updating the categories by pushing the new category to the categories array
        if (category !== "global") {
          const categoryExists = await Category.findOne({ name: category });
          if (categoryExists) {
            existingBudget[i].categories.push({
              category: categoryExists.id,
              categoryName: categoryExists.name,
              initialLimit: limit,
              currentLimit: limit,
            });
            await existingBudget[i].save();
            return res
              .status(201)
              .json(
                new ApiResponse(
                  201,
                  { budget: existingBudget[i] },
                  "Budget created successfully"
                )
              );
          } else {
            return next(
              new ApiError(404, `Category ${category} not found`, [])
            );
          }
        } else {
          return next(
            new ApiError(404, "User already have a global budget", [])
          );
        }
      }
    }
  }
  let isGlobalBudget = false;
  let categoryData = [];

  // Validate category
  if (category !== "global") {
    const categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
      return next(new ApiError(404, `Category ${category} not found`, []));
    }
    categoryData.push({
      category: categoryExists.id,
      categoryName: categoryExists.name,
      initialLimit: limit,
      currentLimit: limit,
    });
  } else {
    isGlobalBudget = true;
  }

  const budget = await Budget.create({
    categories: categoryData,
    globalInitialLimit: isGlobalBudget ? limit : 0,
    globalCurrentLimit: isGlobalBudget ? limit : 0,
    startDate,
    endDate,
    period,
    userId: userId,
  });

  if (!budget) {
    return next(new ApiError(400, "Failed to create budget", []));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { budget }, "Budget created successfully"));
});

//* Get all budgets
export const getAllBudgets = asyncHandler(async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    category,
    period,
    startDate,
    endDate,
  } = req.query;
  const isAdmin = req.user?.role === UserEnumRole.ADMIN;
  // Build the $match filter dynamically
  const filter = {};
  if (category && category !== "global") {
    filter.category = category; // Match specific category
  }
  if (period) {
    filter.period = period; // Match specific period
  }
  if (startDate && endDate) {
    filter.startDate = { $gte: new Date(startDate) }; // Match budgets starting from startDate
    filter.endDate = { $lte: new Date(endDate) }; // Match budgets ending before endDate
  }
  if (filter.length === 0 && !isAdmin) {
    filter.userId = req.user?.id; // Match only budgets of the logged in user
  }
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    pagination: true,
  };
  const budgetAggregate = Budget.aggregate([{ $match: filter }]);
  const budgets = await Budget.aggregatePaginate(budgetAggregate, options);
  if (!budgets || budgets.length === 0) {
    return next(new ApiError(404, "No budget Found", []));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { budgets }, "Budgets fetched successfully"));
});

//* Get budget by ID
export const getBudgetById = asyncHandler(async (req, res, next) => {
  const { budgetId } = req.params;
  const userId = req.user?.id;
  //   const aggregate = [
  //     { $match: { userId: userId, _id: budgetId } },
  //     {
  //       $lookup: {
  //         from: "categories",
  //         localField: "category",
  //         foreignField: "name",
  //         as: "category",
  //       },
  //     },
  //     { $unwind: "$category" },
  //   ];
  //   const aggregate = [
  //     {
  //       $match: { _id: toObjectId(budgetId), active: true },
  //     },
  //     { $group: { _id: "$category", total: { $sum: "$amount" } } },
  //   ];
  //   const budget = await Budget.aggregate(aggregate);
  const budget = await Budget.findOne({
    _id: budgetId,
    userId: userId,
    active: true,
  }).select("-_id -__v");
  if (!budget) {
    return next(new ApiError(404, "Budget not found", []));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { budget }, "Budget fetched"));
});

//* Update Budget
export const updateBudget = asyncHandler(async (req, res, next) => {
  const { budgetId } = req.params;
  const { category, limit, startDate, endDate, period } = req.body;
  let categoryData = {};
  let isGlobalBudget = false;
  const budget = await Budget.findById(budgetId);
  if (!budget.active) {
    return next(
      new ApiError(404, `Budget with ID ${budgetId} is in-active`, [])
    );
  }
  isGlobalBudget = budget.category ? false : true;
  //! Stop the updation from category based budget to global budget
  //* we don't change to global budget from category based budget or vice versa
  if (budget.category && category === "global") {
    return next(
      new ApiError(
        400,
        "Cannot change category based budget to global budget",
        []
      )
    );
  } else if (!budget.category && category !== "global") {
    return next(
      new ApiError(
        400,
        "Cannot change global budget to category based budget",
        []
      )
    );
  }
  const categoryExists = await Category.findOne({ name: category });
  if (categoryExists) {
    categoryData = {
      category: categoryExists.id,
      categoryName: categoryExists.name,
      initialLimit: limit,
      currentLimit: limit,
    };
  } else {
    return next(new ApiError(404, "Category not found", []));
  }
  const updateBudget = await Budget.findByIdAndUpdate(
    { budgetId },
    {
      $set: {
        categories: categoryData,
        globalInitialLimit: isGlobalBudget ? limit : 0,
        globalCurrentLimit: isGlobalBudget ? limit : 0,
        startDate,
        endDate,
        period,
      },
    },
    { new: true }
  ).select("-_id -__v");
  if (!updateBudget) {
    return next(new ApiError(404, `Budget with ID ${budgetId} not found`, []));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { budget: updateBudget },
        "Budget updated successfully"
      )
    );
});

//* Delete Budget
export const deleteBudget = asyncHandler(async (req, res, next) => {
  const { budgetId } = req.params;
  const deleteBudget = await Budget.findByIdAndDelete(budgetId);
  if (!deleteBudget) {
    return next(new ApiError(404, `Budget with ID ${budgetId} not found`, []));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { budget: deleteBudget },
        "Budget deleted successfully"
      )
    );
});

//* Soft delete budget
export const softDeleteBudget = asyncHandler(async (req, res, next) => {
  const { budgetId } = req.params;
  const budget = await Budget.findById(budgetId);
  if (!budget) {
    return next(new ApiError(404, `Budget with ID ${budgetId} not found`, []));
  }
  budget.active = false;
  await budget.save();
  return res
    .status(200)
    .json(new ApiResponse(200, { budget }, "Budget deleted successfully"));
});

//* Get budget by category
// export const getBudgetByCategory = asyncHandler(async (req, res, next) => {
//   const { category } = req.url;
//   const userId = req.user?.id;
//   const aggregate = [
//     {
//       $match: { category: category, active: true },
//     },
//     { $group: { _id: "$category", total: { $sum: "$amount" } } },
//   ];
//   const budget = await Budget.aggregate(aggregate);
//   if (!budget) {
//     return next(new ApiError(404, "Budget not found", []));
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, { budget }, "Budget fetched"));
// });

// //* Get budget by period
// export const getBudgetByPeriod = asyncHandler(async (req, res, next) => {
//   const { period } = req.params;
//   const userId = req.user?.id;
//   const aggregate = [
//     { $match: { userId: toObjectId(userId), period: period, active: true } },
//     { $group: { _id: "$category", total: { $sum: "$amount" } } },
//   ];
//   const budget = await Budget.aggregate(aggregate);
//   if (!budget) {
//     return next(new ApiError(404, "Budget not found", []));
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, { budget }, "Budget fetched"));
// });

// //* Get budget by date
// export const getBudgetByDate = asyncHandler(async (req, res, next) => {
//   const { startDate, endDate } = req.params;
//   const userId = req.user?.id;
//   const aggregate = [
//     {
//       $match: {
//         userId: toObjectId(userId),
//         $or: [
//           {
//             startDate: { $gte: startDate },
//             endDate: { $lte: endDate },
//           },
//         ],
//         active: true,
//       },
//     },
//     { $group: { _id: "$category", total: { $sum: "$amount" } } },
//   ];
//   const budget = await Budget.aggregate(aggregate);
//   if (!budget) {
//     return next(new ApiError(404, "Budget not found", []));
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, { budget }, "Budget fetched"));
// });

//* Get budget by amount
// export const getBudgetByAmount = asyncHandler(async (req, res, next) => {
//   const { userId, amount } = req.params;
//   const aggregate = [
//     { $match: { userId: userId, amount: amount, active: true } },
//     { $group: { _id: "$category", total: { $sum: "$amount" } } },
//   ];
//   const budget = await Budget.aggregate(aggregate);
//   if (!budget) {
//     return next(new ApiError(404, "Budget not found", []));
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, { budget }, "Budget fetched"));
// });
