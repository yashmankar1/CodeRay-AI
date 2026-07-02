const axios = require("axios");

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
