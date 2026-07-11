const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth.middleware");
const {
  getReports,
  getRepoStats,
  deleteReport,
} = require("../controllers/report.controller");

router.get("/", userAuth, getReports);
router.get("/stats/:owner/:repo", userAuth, getRepoStats);
router.delete("/:id", userAuth, deleteReport);

module.exports = router;
