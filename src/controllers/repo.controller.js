const axios = require("axios");
const Report = require("../models/Report.model");

exports.listRepos = async (req, res) => {
  try {
    const { accessToken } = req.user;

    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const repos = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      private: repo.private,
      htmlUrl: repo.html_url,
      defaultBranch: repo.default_branch,
      updatedAt: repo.updated_at,
    }));

    res.json(repos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
};

exports.getRepoContents = async (req, res) => {
  try {
    const { accessToken } = req.user;
    const { owner, repo } = req.params;
    const { path } = req.query;

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path || ""}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.encoding === "base64" && response.data.content) {
      const decodedContent = Buffer.from(
        response.data.content,
        "base64",
      ).toString("utf-8");
      response.data.content = decodedContent;
    }

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch repo contents" });
  }
};


