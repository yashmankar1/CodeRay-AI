const { GoogleGenerativeAI } = require("@google/generative-ai");
const Report = require("../models/Report.model");
const axios = require("axios");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.reviewCode = async (req, res) => {
  try {
    const { accessToken } = req.user;
    const { owner, repo, path } = req.body;

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const fileResponse = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const sha = fileResponse.data.sha;

    const existingReport = await Report.findOne({ owner, repo, path, sha });
    if (existingReport) {
      console.log("Cache hit! Returning saved report.");
      return res.json(existingReport);
    }

    const code = Buffer.from(fileResponse.data.content, "base64").toString(
      "utf-8",
    );

    const fileName = fileResponse.data.name;

    const ALLOWED_EXTENSIONS = [
      ".js",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx",
      ".py",
      ".java",
      ".go",
      ".rb",
      ".php",
      ".c",
      ".cpp",
      ".cs",
    ];

    const MAX_CODE_LENGTH = 10000;

    const extension = fileName.slice(fileName.lastIndexOf("."));
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return res.status(400).json({
        error: `File type "${extension}" is not supported for review.`,
      });
    }

    if (code.length > MAX_CODE_LENGTH) {
      return res.status(400).json({
        error: "FIle is too large to review. Please select a smaller file.",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a senior code reviewer. Review the following code file named "${fileName}".

Respond ONLY with valid JSON in exactly this shape, no extra text, no markdown code fences:

{
  "summary": "a 1-2 sentence overview of the file's purpose and overall quality",
  "bugs": ["list of specific bugs found, empty array if none"],
  "suggestions": ["list of improvement suggestions, empty array if none"],
  "qualityScore": a number from 1 to 10
}

Code to review:
${code}`;

    const result = await model.generateContent(prompt);

    let rawText = result.response.text();

    rawText = rawText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    let reviewData;

    try {
      reviewData = JSON.parse(rawText);
    } catch (parseError) {
      return res
        .status(500)
        .json({ error: "AI response was not valid JSON", raw: rawText });
    }

    const report = await Report.create({
      userId: req.user._id,
      owner,
      repo,
      path,
      fileName,
      sha,
      summary: reviewData.summary,
      bugs: reviewData.bugs,
      suggestions: reviewData.suggestions,
      qualityScore: reviewData.qualityScore,
    });

    res.json(report);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "AI review failed" });
  }
};
