import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: "Product Image",
        trim: true,
      },
    },
  ],
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5,
  },
  reviews: [
    {
      username: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  vendorRef: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
