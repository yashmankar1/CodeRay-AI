const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

const {
  githubLogin,
  githubCallback,
} = require("../controllers/auth.controller");

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);

router.get("/me", userAuth, (req, res) => {
  const { _id, githubId, username, displayName, avatarUrl, email } = req.user;
  res.json({
    user: {
      _id,
      githubId,
      username,
      displayName,
      avatarUrl,
      email,
    },
  });
});

module.exports = router;
