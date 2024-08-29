import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/, // Validates 10-digit mobile numbers
    },
    gender: {
      type: String,
      default: null,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    alternateMobile: {
      type: String,
      default: null,
      match: /^[0-9]{10}$/,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
