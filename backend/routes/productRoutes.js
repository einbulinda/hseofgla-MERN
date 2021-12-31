import express from "express";
import {
  getProduct,
  getProducts,
  createProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/create", createProduct);

export default router;
