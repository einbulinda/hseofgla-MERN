import express from "express";
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/create", createProduct);
router.patch("/update", updateProduct);

export default router;
