
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.get("/", (req, res) => res.json({ status: "OK", message: "Auth API running" }));
app.use("/api/auth", authRoutes);

module.exports = app;
