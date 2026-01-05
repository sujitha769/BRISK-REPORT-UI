import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
// import mongoose from "mongoose";

// import authRoutes from "./routes/authRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected✅"))
//   .catch((err) => console.error("MongoDB error:", err));

const app = express();

// Middleware - Increased payload limit for PDF generation
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// // Routes
// app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

/**
 * =====================================================
 * 1️⃣ GET BRisk Report Status (JSON)
 * =====================================================
 */
app.get("/api/report/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const response = await axios.get(
      `https://api.instafinancials.com/InstaReports/v1/BRisk/OrderID/${orderId}/GetStatus`,
      {
        headers: {
          "user-key": process.env.BRISK_API_KEY,
          Accept: "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "BRisk GetStatus Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch BRisk report status" });
  }
});

/**
 * =====================================================
 * 2️⃣ DOWNLOAD OFFICIAL BRisk REPORT (PDF)
 * =====================================================
 */
app.get("/api/report/:orderId/download", async (req, res) => {
  const { orderId } = req.params;

  try {
    const response = await axios.get(
      `https://api.instafinancials.com/InstaReports/v1/BRisk/OrderID/${orderId}/DownloadReport`,
      {
        headers: {
          "user-key": process.env.BRISK_API_KEY,
          Accept: "*/*"
        },
        responseType: "arraybuffer"
      }
    );

    // Debug logs
    console.log("STATUS:", response.status);
    console.log("CONTENT-TYPE:", response.headers["content-type"]);
    console.log(
      "FIRST 20 BYTES:",
      response.data.slice(0, 20).toString("utf8")
    );

    // Temporarily send as text to inspect
    res.send(response.data.toString("utf8"));

  } catch (error) {
    console.error(
      "BRisk DownloadReport Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Download failed" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

/**
 * =====================================================
 * START SERVER
 * =====================================================
 */
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});