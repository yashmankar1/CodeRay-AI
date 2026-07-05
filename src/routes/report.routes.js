const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth.middleware");
const { getReports } = require("../controllers/report.controller");

router.get("/", userAuth, getReports);

module.exports = router;
