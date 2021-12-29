import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.post("/create", createCategory);
router.patch("/:id", updateCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);

export default router;
