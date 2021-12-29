import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  qty: Number,
  cost: Number,
  price: Number,
  description: String,
  discount: { type: String, default: 0 },
  image: { type: [String], default: [] },
  createdDt: {
    type: Date,
    default: new Date(),
  },
});

const ProductModel = mongoose.model("Products", productSchema);

export default ProductModel;