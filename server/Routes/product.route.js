import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../Controllers/product.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addProduct);
router.get("/get/:id", getProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.post("/update/:id", verifyToken, updateProduct);

export default router;
