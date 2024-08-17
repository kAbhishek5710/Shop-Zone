import express from "express";
import {
  userSignup,
  vendorSignup,
  userSignin,
  vendorSignin,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/userSignup", userSignup);
router.post("/vendorSignup", vendorSignup);
router.post("/userSignin", userSignin);
router.post("/vendorSignin", vendorSignin);

export default router;
