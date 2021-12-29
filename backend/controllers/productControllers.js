import express from "express";
import mongoose from "mongoose";

import ProductModel from "../models/productModels.js";

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
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

// Create a Product
