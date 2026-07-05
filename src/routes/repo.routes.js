const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth.middleware");
const {
  listRepos,
  getRepoContents,
} = require("../controllers/repo.controller");

router.get("/", userAuth, listRepos);
router.get("/:owner/:repo/contents", userAuth, getRepoContents);

module.exports = router;
