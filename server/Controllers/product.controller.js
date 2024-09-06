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

export const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler(404, "Product not found!!!"));
  }

  if (req.user.id !== product.vendorRef) {
    return next(errorHandler("You can only update your products!!!"));
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          productName: req.body.productName,
          description: req.body.description,
          price: req.body.price,
          discount: req.body.discount,
          category: req.body.category,
          subCategory: req.body.subCategory,
          brand: req.body.brand,
          stock: req.body.stock,
          images: req.body.images,
        },
      },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};
