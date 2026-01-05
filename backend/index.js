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

// =====================================================
// CORS Configuration - UPDATED
// =====================================================
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://briskreport.netlify.app/', // Replace with your actual Netlify URL
  'https://main--briskreport.netlify.app', // If you have a branch preview
];

// Add environment variable for frontend URL
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list or matches Netlify pattern
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.netlify.app')) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'user-key'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  maxAge: 86400 // 24 hours
}));

// Middleware - Increased payload limit for PDF generation
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// // Routes
// app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
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
        },
        timeout: 30000 // 30 second timeout
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "BRisk GetStatus Error:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({ 
      error: "Failed to fetch BRisk report status",
      details: error.message
    });
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
        responseType: "arraybuffer",
        timeout: 60000 // 60 second timeout for large PDFs
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
    res.status(error.response?.status || 500).json({ 
      error: "Download failed",
      details: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Origin not allowed'
    });
  }
  
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

/**
 * =====================================================
 * START SERVER
 * =====================================================
 */
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Allowed origins:`, allowedOrigins);
});