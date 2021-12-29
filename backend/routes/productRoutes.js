import express from "express";
import { getProduct, getProducts } from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;