const express = require("express");
const connectDB = require("./src/config/db");
const router = require("./src/routes/auth.routes");
const reviewRoutes = require("./src/routes/review.routes");
const cookieParser = require("cookie-parser");
const repoRoutes = require("./src/routes/repo.routes");
const reportRoutes = require("./src/routes/report.routes");
require("dotenv").config();
const cors = require("cors");

console.log("Loaded Client ID:", process.env.GITHUB_CLIENT_ID);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/repos", repoRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/reports", reportRoutes);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`),
    );
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
