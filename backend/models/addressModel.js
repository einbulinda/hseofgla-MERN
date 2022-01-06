import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phone: String,
    county: String,
    town: String,
    deliveryAddress: String,
    uid: String,
  },
  { timestamps: true }
);

const AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel;
