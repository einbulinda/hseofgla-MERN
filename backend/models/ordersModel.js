import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: String,
    paymentMode: String,
    isPaid: Boolean,
    deliveryMode: String,
    amountDue: Number,
    amountPaid: Number,
    orderTotal: Number,
    address: { type: Object, default: {} },
    products: { type: Array, default: [] },
    status: { type: String, default: "Pending" },
    deliveryDate: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Orders", orderSchema);

export default OrderModel;
