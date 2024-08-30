import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser } from "../Controllers/client.controller.js";

const router = express.Router();

router.post("/update/user/:id", verifyToken, updateUser);

export default router;
