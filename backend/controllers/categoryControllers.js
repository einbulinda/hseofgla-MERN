import asyncHandler from "express-async-handler";
import Category from "../models/categoryModels.js";
import mongoose from "mongoose";

// Create Category
// POST /api/category/create
// Admin Access
export const createCategory = asyncHandler(async (req, res) => {
  const { name, status } = req.body;

  const categoryExists = await Category.findOne({ name });

  // Check if Category exists
  if (categoryExists) {
    res.status(400);
    throw new Error("This category already exists.");
  }

  const newCategory = await Category.create({
    name,
    status,
  });

  if (newCategory) {
    res.status(201).json({
      _id: newCategory._id,
      name: newCategory.name,
      status: newCategory.status,
    });
  } else {
    res.status(400);
    throw new Error("An error ocurred during adding category");
  }
});

// Get All Category
// POST /api/category
// Admin Access
export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get Specific Category
// POST /api/category/:id
// Admin Access
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update A Category
// POST /api/category/update
// Admin Access
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, status, id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No category found with ID: ${id}`);

  const updateCategory = { name, status, _id: id };
  await Category.findByIdAndUpdate(id, updateCategory, { new: true });

  res.json(updateCategory);
});
