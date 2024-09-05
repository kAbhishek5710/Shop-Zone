import Product from "../Models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(errorHandler(404, "Product does not exist!!"));
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(errorHandler(404, "Product does not exist!!!"));
  }
  if (req.user.id !== product.vendorRef) {
    return next(errorHandler(401, "You can only delete your products!!"));
  }
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json("Listing has been deleted");
  } catch (err) {
    next(err);
  }
};
