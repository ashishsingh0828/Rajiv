import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import bookingRoutes from "./routes/bookingRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

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
    service: "Rajiv Fitness API",
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

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[Express Error Handler]", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
