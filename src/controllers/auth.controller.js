const axios = require("axios");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.githubLogin = (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user`;

  res.redirect(githubAuthUrl);
};

exports.githubCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const githubProfile = userResponse.data;

    let user = await User.findOne({ githubId: githubProfile.id });

    if (user) {
      user.accessToken = accessToken;
      user.username = githubProfile.login;
      user.displayName = githubProfile.name;
      user.avatarUrl = githubProfile.avatar_url;
      user.email = githubProfile.email;
      await user.save();
    } else {
      user = await User.create({
        githubId: githubProfile.id,
        username: githubProfile.login,
        displayName: githubProfile.name,
        avatarUrl: githubProfile.avatar_url,
        email: githubProfile.email,
        accessToken: accessToken,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("User in DB:", user);

    res.json({
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Github authentication failed" });
  }
};
