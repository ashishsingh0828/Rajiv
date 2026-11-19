import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import bookingRoutes from "./routes/bookingRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../dist");

const app = express();

// Middleware
app.use(
  cors({
    origin: true, // Allow frontend origin
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(distPath));

// Ensure DB is connected for every request (especially on serverless Vercel)
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("[DB Middleware] Could not connect to MongoDB:", err.message);
  }
  next();
});

// API Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/contact", contactRoutes);

// Public Stats (Count of active transformations & clients coached)
app.get("/api/stats", async (req, res) => {
  try {
    const bookingCount = await mongoose.model("Booking").countDocuments();
    const consultationCount = await mongoose.model("Consultation").countDocuments();
    res.json({
      success: true,
      activeClients: bookingCount + 15,
      consultationsCompleted: consultationCount + 42,
      location: "Bahadurgarh, Haryana",
    });
  } catch (e) {
    res.json({ success: true, activeClients: 25, consultationsCompleted: 50 });
  }
});

// Health Check
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Aurafit by Rajiv API",
    database: {
      status: dbStatusMap[dbState] || "unknown",
      name: mongoose.connection.name || "rajivDB",
    },
    upi: {
      id: process.env.PHONEPE_UPI_ID || "9996889494@ybl",
      payee: process.env.PHONEPE_PAYEE_NAME || "Rajiv Dalal",
    },
  });
});

// Client-side SPA routing fallback for production deployment (AmbitionHost / cPanel / Node.js)
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        next();
      }
    });
  }
  next();
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[Express Error Handler]", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
