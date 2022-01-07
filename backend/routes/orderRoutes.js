import express from "express";
import {
  createOrder,
  getOrderDetails,
  getUserOrders,
} from "../controllers/ordersControllers.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/:id", getUserOrders);
router.get("/details/:id", getOrderDetails);

export default router;
