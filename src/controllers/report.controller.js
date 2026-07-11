const Report = require("../models/Report.model");

exports.getReports = async (req, res) => {
  try {
    const userId = req.user._id;

    const reports = await Report.find({ userId });
    res.json(reports);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

exports.getRepoStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const { owner, repo } = req.params;

    const reports = await Report.find({ userId, owner, repo });

    const totalFiles = reports.length;

    if (totalFiles === 0) {
      return res.json({
        totalFiles: 0,
        avgQualityScore: 0,
        totalBugs: 0,
        totalSuggestions: 0,
        lastReviewDate: null,
      });
    }

    const totalQualityScore = reports.reduce(
      (sum, report) => sum + report.qualityScore,
      0,
    );
    const avgQualityScore = (totalQualityScore / totalFiles).toFixed(1);

    const totalBugs = reports.reduce(
      (sum, report) => sum + report.bugs.length,
      0,
    );

    const totalSuggestions = reports.reduce(
      (sum, report) => sum + report.suggestions.length,
      0,
    );

    const lastReviewDate = reports.reduce((latest, report) => {
      return report.createdAt > latest ? report.createdAt : latest;
    }, reports[0].createdAt);

    res.json({
      totalFiles,
      avgQualityScore: Number(avgQualityScore),
      totalBugs,
      totalSuggestions,
      lastReviewDate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch repo stats" });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const report = await Report.findOneAndDelete({ _id: id, userId });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete report" });
  }
};
