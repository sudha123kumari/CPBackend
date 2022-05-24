const express = require("express");
const router = express.Router();
const { Remind, Register,Login, Check,NewContest,DeleteContest } = require("../controllers/auth");
router.post("/remind", Remind);
router.post("/register", Register);
router.post("/login", Login); 
router.post("/check", Check); 
router.post("/newContest",NewContest);
router.post("/deleteContest",DeleteContest);



module.exports = router;

