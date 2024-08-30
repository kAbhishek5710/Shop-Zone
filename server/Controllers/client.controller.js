import User from "../Models/user.model.js";
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
