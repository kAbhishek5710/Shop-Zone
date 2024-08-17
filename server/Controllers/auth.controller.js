import User from "../Models/user.model.js";
import Vendor from "../Models/vendor.model.js";
import bcryptjs from "bcryptjs";

export const userSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User Created Successfully...");
  } catch (err) {
    next(err);
  }
};

export const vendorSignup = async (req, res, next) => {
  const { vendorName, brandName, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newVendor = new Vendor({
    vendorName,
    brandName,
    email,
    password: hashedPassword,
  });

  try {
    await newVendor.save();
    res.status(201).json("Vendor added successfully!!");
  } catch (err) {
    next(err);
  }
};
