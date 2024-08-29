import User from "../Models/user.model.js";
import Vendor from "../Models/vendor.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res, next) => {
  const { username, email, password, mobileNumber } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    mobileNumber,
  });

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

export const userSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!(validUser && validPassword)) {
      return next(errorHandler(404, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60),
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const vendorSignin = async (req, res, next) => {
  const { brandName, password } = req.body;
  try {
    const validVendor = await Vendor.findOne({ brandName });
    const validPassword = bcryptjs.compareSync(password, validVendor.password);
    if (!(validVendor && validPassword)) {
      return next(errorHandler(404, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: validVendor._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validVendor._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60),
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Successfully logged out!!!");
  } catch (err) {
    next(err);
  }
};
