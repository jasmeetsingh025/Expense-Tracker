import Expense from "../model/expense.model.js";
import RecurringExpense from "../model/recurringExpense.model.js";
import Category from "../model/category.model.js";
import Budget from "../model/budget.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";
import { toObjectId } from "../utils/helper.js";

//* Create Expense
export const createExpense = asyncHandler(async (req, res, next) => {
  const { title, description, paymentMethod, category, amount } = req.body;

  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    return next(new ApiError(404, "Category not found", []));
  }

  //* Manage the budget based on the expense category
  const budget = await Budget.findOne({
    userId: req.user._id,
    categories: { $elemMatch: { category: categoryExists._id } },
  });
  if (!budget) {
    return next(
      new ApiError(
        404,
        `Budget not found for the provided category ${category}`,
        []
      )
    );
  }

  const categoryIndex = budget.categories.findIndex(
    (cat) => cat.category.toString() === categoryExists._id.toString()
  );
  if (categoryIndex === -1) {
    return next(
      new ApiError(404, `Category ${category} not found in the budget`, [])
    );
  }

  const categoryBudget = budget.categories[categoryIndex];
  if (categoryBudget.currentLimit < amount) {
    return next(
      new ApiError(
        400,
        `Amount exceeds the limit for the category ${category}`,
        []
      )
    );
  }

  budget.categories[categoryIndex].currentLimit -= amount;
  await budget.save();

  const expense = await Expense.create({
    title,
    description,
    paymentMethod,
    category: categoryExists.name,
    amount,
    userId: req.user._id,
  });

  if (!expense) {
    return next(new ApiError(400, "Failed to create expense", []));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { expense }, "Expense created successfully"));
});

//* Get all expenses of a particular user
export const getExpenseById = asyncHandler(async (req, res, next) => {
  const forAdmin = req?.forAdmin || false;
  const { expenseId } = req.params;
  if (!forAdmin && !expenseId) {
    return next(new ApiError(500, "User Id is not found", []));
  }
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    pagination: true,
  };
  const expenseAggregate = Expense.aggregate([
    { $match: forAdmin ? {} : { _id: toObjectId(expenseId) } },
  ]);

  const expenses = await Expense.aggregatePaginate(expenseAggregate, options);
  if (!expenses) {
    return next(new ApiError(404, "No Expense found", []));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { expenses }, "Expenses fetched successfully"));
});

//* Get all expenses of all the user
//! Only for the Admin
export const getAllExpenses = asyncHandler(async (req, res, next) => {
  req.forAdmin = true;
  return getExpenseById(req, res, next);
});

//* Update Expense
export const updateExpense = asyncHandler(async (req, res, next) => {
  const { expenseId } = req.params;
  const { description, paymentMethod, amount = 0, category } = req.body;
  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    return next(new ApiError(404, "Category not found", []));
  }
  const originalExpense = await Expense.findById(expenseId);
  if (!originalExpense) {
    return next(new ApiError(404, `Expense with ID ${expenseId} not found`));
  }

  //* Check if the amount is changed
  const amountDifference = amount - originalExpense.amount;

  //* Update the budget as well for the category
  const budget = await Budget.findOne({
    userId: req.user._id,
    categories: { $elemMatch: { category: categoryExists._id } },
  });
  if (!budget) {
    return next(
      new ApiError(
        404,
        `Budget not found for the provided category ${category}`,
        []
      )
    );
  }
  const categoryIndex = budget.categories.findIndex(
    (cat) => cat.category == categoryExists._id
  );
  if (categoryIndex === -1) {
    return next(
      new ApiError(404, `Category ${category} not found in the budget`, [])
    );
  }
  const categoryBudget = budget.categories[categoryIndex];
  if (amountDifference > 0 && categoryBudget.currentLimit < amountDifference) {
    return next(
      new ApiError(
        400,
        `Amount exceeds the limit for the category ${category}`,
        []
      )
    );
  }
  budget.categories[categoryIndex].currentLimit -= amountDifference;
  await budget.save();

  originalExpense.description = description;
  originalExpense.paymentMethod = paymentMethod;
  originalExpense.amount = amount;
  originalExpense.category = categoryExists.name;
  const updateExpense = await originalExpense.save();
  if (!updateExpense) {
    return next(new ApiError(400, "Bad request error", []));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { updateExpense }, "Expense Updated successfully")
    );
});

//* Delete Expense
export const deleteExpense = asyncHandler(async (req, res, next) => {
  const { expenseId } = req.params;
  const deleteExpense = await Expense.findByIdAndDelete(expenseId);
  if (!deleteExpense) {
    return next(new ApiError(404, `Expense with ID ${expenseId} is not found`));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { Expense: deleteExpense },
        "Expense Deleted successfully"
      )
    );
});

//* Create recurring expense
export const createRecurringExpense = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    paymentMethod,
    category,
    amount,
    startDate,
    frequency,
  } = req.body;
  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    return next(new ApiError(404, "Category not found", []));
  }
  const recurringExpense = await RecurringExpense.create({
    title,
    description,
    paymentMethod,
    category: categoryExists.name,
    amount,
    startDate,
    frequency,
    userId: req.user._id,
  });
  if (!recurringExpense) {
    return next(new ApiError(400, "Bad request error", []));
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { recurringExpense },
        "Recurring Expense created successfully"
      )
    );
});

//* Update recurring expense
export const updateRecurringExpense = asyncHandler(async (req, res, next) => {
  const { expenseId } = req.params;
  const { description, paymentMethod, amount, category, startDate, frequency } =
    req.body;
  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    return next(new ApiError(404, "Category not found", []));
  }
  const recurringExpense = await RecurringExpense.findByIdAndUpdate(
    expenseId,
    {
      $set: {
        description,
        paymentMethod,
        category: categoryExists.name,
        amount,
        startDate,
        frequency,
      },
    },
    { new: true }
  );
  if (!recurringExpense) {
    return next(
      new ApiError(404, `Recurring Expense with ID ${expenseId} not found`, [])
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { recurringExpense },
        "Recurring Expense Updated successfully"
      )
    );
});

//* Delete recurring expense
export const deleteRecurringExpense = asyncHandler(async (req, res, next) => {
  const { expenseId } = req.params;
  const deleteRecurringExpense = await RecurringExpense.findByIdAndDelete(
    expenseId
  );
  if (!deleteRecurringExpense) {
    return next(
      new ApiError(404, `Recurring Expense with ID ${expenseId} is not found`)
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { RecurringExpense: deleteRecurringExpense },
        "Recurring Expense Deleted successfully"
      )
    );
});
