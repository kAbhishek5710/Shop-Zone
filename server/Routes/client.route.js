import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser, updateUser } from "../Controllers/client.controller.js";

const router = express.Router();

router.post("/update/user/:id", verifyToken, updateUser);
router.delete("/delete/user/:id", verifyToken, deleteUser);

export default router;
