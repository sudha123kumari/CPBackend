const express = require("express");
const router = express.Router();

const { Register } = require("../controllers/auth");

// router.post("/otpVerify", otpVerify);
router.post("/register", Register);

module.exports = router;
