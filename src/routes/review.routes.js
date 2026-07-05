const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth.middleware");
const { reviewCode } = require("../controllers/review.controller");

router.post("/", userAuth, reviewCode);

module.exports = router;
