import expressAsyncHandler from "express-async-handler";
import OrderModel from "../models/ordersModel.js";

// Create an Order
export const createOrder = expressAsyncHandler(async (req, res) => {
  const {
    user,
    paymentMode,
    isPaid,
    deliveryMode,
    amountDue,
    address,
    products,
  } = req.body;

  // Save Order
  const placedOrder = await OrderModel.create({
    user,
    paymentMode,
    isPaid,
    deliveryMode,
    amountDue,
    address,
    products,
  });

  if (placedOrder) {
    res.status(201).json({
      user: placedOrder.user,
      paymentMode: placedOrder.paymentMode,
      isPaid: placedOrder.isPaid,
      deliveryMode: placedOrder.deliveryMode,
      amountDue: placedOrder.amountDue,
      address: placedOrder.address,
      products: placedOrder.products,
    });
  } else {
    res.status(400);
    throw new Error("Error encountered during placing of order");
  }
});

// Get a user's orders
export const getUserOrders = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await OrderModel.find({ user: id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
