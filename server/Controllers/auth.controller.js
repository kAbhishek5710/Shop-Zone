import User from "../Models/user.model.js";
import Vendor from "../Models/vendor.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res, next) => {
  const {
    username,
    email,
    password,
    mobileNumber,
    gender,
    dateOfBirth,
    location,
    alternateMobile,
    avatar,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    mobileNumber,
    gender,
    dateOfBirth,
    location,
    alternateMobile,
    avatar,
  });

  try {
    await newUser.save();
    res.status(201).json("User Created Successfully...");
  } catch (err) {
    next(err);
  }
};

export const vendorSignup = async (req, res, next) => {
  const {
    name,
    companyName,
    companyWebsite,
    email,
    password,
    street,
    city,
    state,
    postalCode,
    country,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newVendor = new Vendor({
    name,
    companyName,
    email,
    password: hashedPassword,
    companyWebsite: companyWebsite,
    address: { street, city, state, postalCode, country },
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
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const vendorSignin = async (req, res, next) => {
  const { companyName, password } = req.body;
  try {
    const validVendor = await Vendor.findOne({ companyName });
    const validPassword = bcryptjs.compareSync(password, validVendor.password);
    if (!(validVendor && validPassword)) {
      return next(errorHandler(404, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: validVendor._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validVendor._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.avatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { passwrod: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 60),
        })
        .status(200)
        .json(rest);
    }
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
