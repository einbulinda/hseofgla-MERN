import express from "express";
import {
  createOrder,
  getUserOrders,
} from "../controllers/ordersControllers.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/:id", getUserOrders);

export default router;
