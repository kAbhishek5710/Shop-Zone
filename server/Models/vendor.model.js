import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
