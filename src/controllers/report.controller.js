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
