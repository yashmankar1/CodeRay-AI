const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth.middleware");
const { listRepos } = require("../controllers/repo.controller");

router.get("/", userAuth, listRepos);

module.exports = router;
