import express from "express";
import { Consultation } from "../models/Consultation.js";
import { sendConsultationNotification } from "../services/emailService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, goal, message } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields: name, phone, and email.",
      });
    }

    const consultation = new Consultation({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      goal: goal ? goal.trim() : "General Fitness",
      message: message ? message.trim() : "",
    });

    await consultation.save();
    console.log(`[Consultation] Saved request from ${consultation.name} (${consultation.goal})`);

    sendConsultationNotification(consultation).catch((err) => {
      console.error("[Consultation] Email notification error:", err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Consultation requested successfully! Rajiv will contact you shortly.",
      consultation: {
        id: consultation._id,
        name: consultation.name,
        phone: consultation.phone,
        email: consultation.email,
        goal: consultation.goal,
        createdAt: consultation.createdAt,
      },
    });
  } catch (error) {
    console.error("[Consultation] Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit consultation request. Please try again.",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 }).limit(100);
    return res.json({
      success: true,
      count: consultations.length,
      consultations,
    });
  } catch (error) {
    console.error("[Consultation] Error fetching:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch consultation requests.",
      error: error.message,
    });
  }
});

export default router;
