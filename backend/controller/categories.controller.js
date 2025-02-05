import categoryModel from "../model/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//* Create Category
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, type, icon } = req.body;
  const existingCategory = await categoryModel.find({
    name,
    type,
    $or: [{ userId: req.user._id }, { userId: null }],
  });
  if (existingCategory.length > 0) {
    return next(
      new ApiError(400, "Category with that name already exists", [])
    );
  }

  const category = await categoryModel.create({
    name,
    type,
    icon,
    userId: !req.user?.role === "ADMIN" ? req.user?.id : null,
  });
  if (!category) {
    return next(new ApiError(400, "Bad Request Error creating category", []));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { category }, "Category created successfully"));
});

//* Get all categories
export const getAllCategories = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    pagination: true,
  };
  const categoryAggregate = categoryModel.aggregate([{ $match: {} }]);

  const categories = await categoryModel.aggregatePaginate(
    categoryAggregate,
    options
  );
  if (!categories) {
    return next(new ApiError(404, "No category Found", []));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { categories }, "Categories fetched successfully")
    );
});

//* Get category by ID
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryModel.findById(categoryId);
  if (!category) {
    return next(
      new ApiError(404, `Category with ID ${categoryId} not found`, [])
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { category }, "Category fetched"));
});

//* Update category
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { name, type, icon } = req.body;
  const updatedCategory = await categoryModel.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        name,
        type,
        icon,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedCategory) {
    return next(
      new ApiError(404, `Category with ID ${categoryId} not found`, [])
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { category: updatedCategory },
        "Category updated successfully"
      )
    );
});

//* Delete category
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
    return next(
      new ApiError(404, `Category with ID ${categoryId} not found`, [])
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { category: deletedCategory },
        "Category deleted successfully"
      )
    );
});
