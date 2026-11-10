import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      index: true,
      default: () => `RJV-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Customer email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    programId: {
      type: String,
      required: false,
    },
    programName: {
      type: String,
      required: [true, "Program name is required"],
    },
    programSubtitle: {
      type: String,
    },
    mode: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    billingText: {
      type: String,
      default: "/ month",
    },
    paymentMethod: {
      type: String,
      default: "PhonePe UPI",
    },
    upiId: {
      type: String,
      default: "9996889494@ybl",
    },
    payeeName: {
      type: String,
      default: "Rajiv Dalal",
    },
    transactionId: {
      type: String,
      trim: true,
      default: "",
    },
    paymentStatus: {
      type: String,
      enum: ["pending_verification", "verified", "failed"],
      default: "pending_verification",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
