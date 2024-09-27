import User from "../Models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const addToCart = async (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "Login to add to cart"));
    }
    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId, quantity });
    }
    await user.save();

    res.status(200).json(existingItem);
  } catch (err) {
    next(errorHandler(500, "Could not add to cart"));
  }
};
