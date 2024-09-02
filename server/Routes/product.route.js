import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addProduct } from "../Controllers/product.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addProduct);

export default router;
