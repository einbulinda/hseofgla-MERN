import expressAsyncHandler from "express-async-handler";
import OrderModel from "../models/ordersModel.js";

// Create an Order
export const createOrder = expressAsyncHandler(async (req, res) => {
  const {
    user,
    paymentMode,
    amountPaid,
    isPaid,
    deliveryMode,
    deliveryDate,
    amountDue,
    status,
    orderTotal,
    address,
    products,
  } = req.body;

  // Save Order
  const placedOrder = await OrderModel.create({
    user,
    paymentMode,
    amountPaid,
    isPaid,
    deliveryMode,
    deliveryDate,
    amountDue,
    status,
    orderTotal,
    address,
    products,
  });

  if (placedOrder) {
    res.status(201).json({
      user: placedOrder.user,
      paymentMode: placedOrder.paymentMode,
      amountPaid: placedOrder.amountPaid,
      isPaid: placedOrder.isPaid,
      deliveryMode: placedOrder.deliveryMode,
      deliveryDate: placedOrder.deliveryDate,
      orderTotal: placedOrder.orderTotal,
      amountDue: placedOrder.amountDue,
      address: placedOrder.address,
      products: placedOrder.products,
      status: placedOrder.status,
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

// Get Order details
export const getOrderDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const orderDtls = await OrderModel.findById(id);
    res.send(orderDtls);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
