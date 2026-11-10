import express from "express";
import { Contact } from "../models/Contact.js";
import { sendContactNotification } from "../services/emailService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields: name, phone, email, and message.",
      });
    }

    const contact = new Contact({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    await contact.save();
    console.log(`[Contact] Saved message from ${contact.name}`);

    sendContactNotification(contact).catch((err) => {
      console.error("[Contact] Email notification error:", err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully! We will get back to you shortly.",
      contact: {
        id: contact._id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("[Contact] Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(100);
    return res.json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("[Contact] Error fetching:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
      error: error.message,
    });
  }
});

export default router;
