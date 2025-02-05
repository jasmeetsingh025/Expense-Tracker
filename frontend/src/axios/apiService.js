import axiosInstance from "./axiosInstance";

//* User API calls

// Login user
export const fetchUserlogin = async (userData) => {
  const { email, password } = userData;
  try {
    const response = await axiosInstance.post(
      "/users/login",
      { email: email, password: password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    // let error;
    // if (err.response) {
    //   // The request was made and the server responded with a status code >= 400
    //   console.error("Backend returned an error:", err.response.data);
    //   error = err.response.data;
    // } else if (err.request) {
    //   // The request was made but no response was received
    //   console.error("No response received:", err.request);
    //   error = err.request;
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   console.error("Error setting up request:", err.message);
    //   error = err.message;
    // }
    // Rethrow the error so the calling function/component can handle it
    throw err;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Update user by ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Soft delete user by ID
export const softDeleteUser = async (userId) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}/soft-delete`);
    return response.data;
  } catch (error) {
    console.error("Error soft deleting user:", error);
    throw error;
  }
};

// Request password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await axiosInstance.post("/users/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (resetToken, password) => {
  try {
    const response = await axiosInstance.post(
      `/users/reset-password/${resetToken}`,
      { password }
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Change current password
export const changePassword = async (password) => {
  try {
    const response = await axiosInstance.put("/users/change-password", {
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

//* Category API calls

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Fetch category by ID
export const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw error;
  }
};

// Update category by ID
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axiosInstance.put(
      `/categories/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Delete category by ID
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

//* Budget API calls

// Fetch all budgets
export const fetchBudgets = async () => {
  try {
    const response = await axiosInstance.get("/budgets");
    return response.data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }
};

// Create a new budget
export const createBudget = async (budgetData) => {
  try {
    const response = await axiosInstance.post("/budgets", budgetData);
    return response.data;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
};

// Fetch budget by ID
export const fetchBudgetById = async (budgetId) => {
  try {
    const response = await axiosInstance.get(`/budgets/${budgetId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching budget by ID:", error);
    throw error;
  }
};

// Update budget by ID
export const updateBudget = async (budgetId, budgetData) => {
  try {
    const response = await axiosInstance.put(
      `/budgets/${budgetId}`,
      budgetData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
};

// Delete budget by ID
export const deleteBudget = async (budgetId) => {
  try {
    const response = await axiosInstance.delete(`/budgets/${budgetId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting budget:", error);
    throw error;
  }
};

// Soft delete budget by ID
export const softDeleteBudget = async (budgetId) => {
  try {
    const response = await axiosInstance.put(
      `/budgets/${budgetId}/soft-delete`
    );
    return response.data;
  } catch (error) {
    console.error("Error soft deleting budget:", error);
    throw error;
  }
};

//* Expense API calls
// Fetch all expenses
export const fetchExpenses = async () => {
  try {
    const response = await axiosInstance.get("/expenses");
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

// Create a new expense
export const createExpense = async (expenseData) => {
  try {
    const response = await axiosInstance.post("/expenses", expenseData);
    return response.data;
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
};

// Fetch expense by ID
export const fetchExpenseById = async (expenseId) => {
  try {
    const response = await axiosInstance.get(`/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching expense by ID:", error);
    throw error;
  }
};

// Update expense by ID
export const updateExpense = async (expenseId, expenseData) => {
  try {
    const response = await axiosInstance.put(
      `/expenses/${expenseId}`,
      expenseData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

// Delete expense by ID
export const deleteExpense = async (expenseId) => {
  try {
    const response = await axiosInstance.delete(`/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};

// Create Re-recurring expenses
export const createRecurringExpense = async (expenseData) => {
  try {
    const response = await axiosInstance.post(
      `/recurring-expenses/`,
      expenseData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating re-recurring expense:", error);
    throw error;
  }
};

// Update recurring expense by ID
export const updateRecurringExpense = async (expenseId, expenseData) => {
  try {
    const response = await axiosInstance.put(
      `/recurring-expenses/${expenseId}`,
      expenseData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating recurring expense:", error);
    throw error;
  }
};

// Delete recurring expense by ID
export const deleteRecurringExpense = async (expenseId) => {
  try {
    const response = await axiosInstance.delete(
      `/recurring-expenses/${expenseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting recurring expense:", error);
    throw error;
  }
};

//* Report API calls

// Fetch all reports
export const fetchReports = async () => {
  try {
    const response = await axiosInstance.get("/reports");
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};
