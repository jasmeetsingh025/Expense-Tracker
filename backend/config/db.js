import mongoose from "mongoose";
import categorySchema from "../model/category.model.js";

async function createDefaultCategories() {
  try {
    /**
     * An array of category objects used for expense tracking.
     * Each category object contains the following properties:
     *
     * @type {Array<Object>}
     * @property {string} name - The name of the category.
     * @property {string} type - The type of the category, either "income" or "expense".
     * @property {string} icon - The icon associated with the category.
     */
    const categories = [
      { name: "Salary", type: "income", icon: "default", userId: null },
      { name: "Investments", type: "income", icon: "default", userId: null },
      { name: "Food", type: "expense", icon: "default", userId: null },
      { name: "Transport", type: "expense", icon: "default", userId: null },
      { name: "Rent", type: "expense", icon: "default", userId: null },
    ];

    const bulkOps = categories.map((category) => ({
      updateOne: {
        filter: { name: category.name, type: category.type },
        update: { $setOnInsert: category },
        upsert: true,
      },
    }));

    await categorySchema.bulkWrite(bulkOps);
    console.log("Default categories created or already exist");
  } catch (error) {
    console.error(`Error creating default categories: ${error.message}`);
  }
}

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(
      `Connected successfully to the database ${process.env.DB_NAME}`
    );
    // Create default categories if they don't exist
    await createDefaultCategories();
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
}

export default connectToDatabase;
