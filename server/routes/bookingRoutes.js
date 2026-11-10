import express from "express";
import { Booking } from "../models/Booking.js";
import { sendBookingNotifications } from "../services/emailService.js";

const router = express.Router();

// Create new booking & PhonePe payment confirmation
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      programId,
      programName,
      programSubtitle,
      mode,
      amount,
      billingText,
      transactionId,
      notes,
    } = req.body;

    if (!name || !email || !phone || !programName || !amount) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: name, email, phone, programName, amount.",
      });
    }

    const booking = new Booking({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      programId: programId ? String(programId) : undefined,
      programName: programName.trim(),
      programSubtitle: programSubtitle?.trim(),
      mode: mode === "offline" ? "offline" : "online",
      amount: Number(amount),
      billingText: billingText || "/ month",
      paymentMethod: "PhonePe UPI",
      upiId: "9996889494@ybl",
      payeeName: "Rajiv Dalal",
      transactionId: transactionId ? transactionId.trim() : "",
      paymentStatus: "pending_verification",
      notes: notes ? notes.trim() : "",
    });

    await booking.save();
    console.log(`[Booking] Created booking ${booking.bookingId} for ${booking.name} (₹${booking.amount})`);

    // Send notifications to Google / Gmail asynchronously without blocking response
    sendBookingNotifications(booking).catch((err) => {
      console.error("[Booking] Background email sending error:", err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Booking and payment details received successfully!",
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        programName: booking.programName,
        amount: booking.amount,
        mode: booking.mode,
        transactionId: booking.transactionId,
        paymentStatus: booking.paymentStatus,
        createdAt: booking.createdAt,
      },
    });
  } catch (error) {
    console.error("[Booking] Error creating booking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process booking. Please try again or contact Rajiv directly.",
      error: error.message,
    });
  }
});

// Get recent bookings
router.get("/", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(limit);

    return res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("[Booking] Error fetching bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
});

// Get single booking by bookingId or _id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let booking = await Booking.findOne({ bookingId: id });
    if (!booking && id.match(/^[0-9a-fA-F]{24}$/)) {
      booking = await Booking.findById(id);
    }

    if (!booking) {
      return res.status(400).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("[Booking] Error fetching booking:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking.",
      error: error.message,
    });
  }
});

export default router;
