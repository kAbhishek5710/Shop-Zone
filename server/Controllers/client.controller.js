import User from "../Models/user.model.js";
import Vendor from "../Models/vendor.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "You can only update your account!!"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          mobileNumber: req.body.mobileNumber,
          companyWebsite: req.body.companyWebsite,
          gender: req.body.gender,
          dateOfBirth: req.body.dateOfBirth,
          location: req.body.location,
          alternateMobile: req.body.alternateMobile,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const updateVendor = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return next(errorHandler(401, "You can only update your own account!!!"));
  }

  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          companyWebsite: req.body.companyWebsite,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          postalCode: req.body.postalCode,
          country: req.body.country,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedVendor._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    next(errorHandler(401, "You can only delete your own account !!!!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!!!");
  } catch (err) {
    next(err);
  }
};
