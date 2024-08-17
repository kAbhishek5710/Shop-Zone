import express from "express";
import { userSignup, vendorSignup } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/userSignup", userSignup);
router.post("/vendorSignup", vendorSignup);

export default router;
