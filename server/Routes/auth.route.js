import express from "express";
import {
  userSignup,
  vendorSignup,
  userSignin,
  vendorSignin,
  signOut,
  google,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/userSignup", userSignup);
router.post("/vendorSignup", vendorSignup);
router.post("/userSignin", userSignin);
router.post("/vendorSignin", vendorSignin);
router.post("/google", google);
router.post("/signout", signOut);

export default router;
