import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: String,
    paymentMode: String,
    isPaid: Boolean,
    deliveryMode: String,
    amountDue: Number,
    orderTotal: Number,
    address: { type: [String], default: [] },
    products: { type: [String], default: [] },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Orders", orderSchema);

export default OrderModel;
