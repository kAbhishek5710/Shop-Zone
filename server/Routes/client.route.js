import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  deleteUser,
  updateUser,
  updateVendor,
} from "../Controllers/client.controller.js";

const router = express.Router();

router.post("/update/user/:id", verifyToken, updateUser);
router.post("/update/vendor/:id", verifyToken, updateVendor);
router.delete("/delete/user/:id", verifyToken, deleteUser);

export default router;
