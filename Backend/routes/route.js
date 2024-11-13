const express = require("express");
const { signup, verifyOtp, signin } = require("../controllers/authController");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/forgotPasswordController");

const router = express.Router();

// auth routes
router.post("/signup", signup);
router.post("/verifyotp", verifyOtp);
router.post("/signin", signin);

// password routes
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

module.exports = router;
