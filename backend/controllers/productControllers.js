import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ProductModel from "../models/productModels.js";

// Create a Product
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    cost,
    discount,
    image,
    price,
    qty,
    description,
  } = req.body;

  // Check if product exists
  const productExists = await ProductModel.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error("The product name is already existing.");
  }

  // Save Product
  const newProduct = await ProductModel.create({
    name,
    category,
    brand,
    cost,
    discount,
    image,
    price,
    qty,
    description,
  });

  if (newProduct) {
    res.status(201).json({
      _id: newProduct._id,
      name: newProduct.name,
      category: newProduct.category,
      brand: newProduct.brand,
      cost: newProduct.cost,
      discount: newProduct.discount,
      price: newProduct.price,
      image: newProduct.image,
      qty: newProduct.qty,
      description: newProduct.description,
    });
  } else {
    res.status(400);
    throw new Error("Error was encountered in saving the product");
  }
});

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ updatedAt: "desc" });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a Specific Product
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a Product
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    _id,
    name,
    brand,
    category,
    cost,
    price,
    discount,
    qty,
    description,
    image,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No product found with ID ${_id}`);

  const updatedProduct = {
    _id: _id,
    name,
    brand,
    category,
    cost,
    price,
    discount,
    qty,
    description,
    image,
  };
  await ProductModel.findByIdAndUpdate(_id, updatedProduct, { new: true });

  res.json(updatedProduct);
});
