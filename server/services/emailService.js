import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.EMAIL_USER || "iemarbletraders@gmail.com";
  const pass = (process.env.EMAIL_PASS || "lqjjlvgywogbtbxc").replace(/\s/g, "");

  if (!user || !pass) {
    console.warn("[Email] EMAIL_USER or EMAIL_PASS not configured. Skipping email sending.");
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });
}

const getMailFrom = () => {
  return process.env.MAIL_FROM || "Rajiv Fitness Coaching <iemarbletraders@gmail.com>";
};

const getAdminRecipients = () => {
  const recipients = [
    process.env.NOTIFICATION_EMAIL || "rajeevdalal1@gmail.com",
    process.env.ADMIN_EMAIL || "ashishsingh0828@gmail.com",
  ].filter(Boolean);

  // Return unique emails joined by comma
  return Array.from(new Set(recipients)).join(", ");
};

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/**
 * Send Booking & Payment confirmation to Rajiv/Admin and Customer
 */
export async function sendBookingNotifications(booking) {
  const transporter = getTransporter();
  if (!transporter) return;

  const adminTo = getAdminRecipients();
  const cleanPhone = String(booking.phone).replace(/\D/g, "");
  const waLink = `https://wa.me/91${cleanPhone.length === 10 ? cleanPhone : cleanPhone.slice(-10)}`;

  // 1. Notification to Rajiv Dalal & Ashish (Google / Gmail)
  const adminHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0d0e; color: #f2f3f5; border: 1px solid #23272e; border-radius: 12px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #101216 0%, #1e222b 100%); padding: 24px 28px; border-bottom: 2px solid #5f259f;">
      <span style="display: inline-block; background: #5f259f; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; letter-spacing: 1px; text-transform: uppercase;">PhonePe Payment Verified</span>
      <h2 style="margin: 12px 0 4px 0; color: #ffffff; font-size: 22px;">New Coaching Booking Received!</h2>
      <p style="margin: 0; color: #a1a6b4; font-size: 13px;">Booking Reference: <strong style="color: #fff;">${esc(booking.bookingId)}</strong></p>
    </div>

    <div style="padding: 24px 28px;">
      <div style="background: #14171d; border: 1px solid #282d37; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; color: #9499a8; letter-spacing: 0.5px;">Program Details</h3>
        <p style="margin: 4px 0; font-size: 18px; font-weight: bold; color: #fff;">${esc(booking.programName)}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #9da3b4;">Type: <span style="color: #e2e4ea; font-weight: 600; text-transform: capitalize;">${esc(booking.mode)} Coaching</span></p>
        <p style="margin: 8px 0 0 0; font-size: 24px; font-weight: bold; color: #00d084;">₹${booking.amount.toLocaleString("en-IN")}</p>
      </div>

      <div style="background: #14171d; border: 1px solid #282d37; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; color: #9499a8; letter-spacing: 0.5px;">Client Information</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #8c92a2; width: 120px;">Name:</td>
            <td style="padding: 6px 0; color: #fff; font-weight: 600;">${esc(booking.name)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8c92a2;">Phone:</td>
            <td style="padding: 6px 0;">
              <a href="tel:${esc(booking.phone)}" style="color: #00bcd4; text-decoration: none; font-weight: 600;">${esc(booking.phone)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8c92a2;">Email:</td>
            <td style="padding: 6px 0;">
              <a href="mailto:${esc(booking.email)}" style="color: #00bcd4; text-decoration: none;">${esc(booking.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8c92a2;">Payment Method:</td>
            <td style="padding: 6px 0; color: #fff;">PhonePe Scanner / UPI (9996889494@ybl)</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #8c92a2;">Transaction ID:</td>
            <td style="padding: 6px 0; color: #ffd166; font-family: monospace; font-size: 14px; font-weight: bold;">${esc(booking.transactionId || "Not provided")}</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${waLink}" style="display: inline-block; background: #25d366; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">Message Client on WhatsApp</a>
        <a href="tel:${esc(booking.phone)}" style="display: inline-block; background: #2a2e39; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Call Client</a>
      </div>
    </div>

    <div style="background: #090a0c; padding: 16px 28px; text-align: center; border-top: 1px solid #1c1f26; font-size: 12px; color: #697082;">
      Rajiv Fitness Coaching • Bahadurgarh, Haryana • +91 99968 89494
    </div>
  </div>
  `;

  // 2. Receipt email to customer
  const customerHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1f2937; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
    <div style="background: #0d1117; padding: 26px 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">RAJIV DALAL</h1>
      <p style="color: #9ca3af; margin: 6px 0 0 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Fitness • Strength • Lifestyle</p>
    </div>

    <div style="padding: 30px;">
      <h2 style="color: #111827; margin: 0 0 10px 0; font-size: 20px;">Thank you for your booking, ${esc(booking.name)}!</h2>
      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
        We have received your payment details for <strong>${esc(booking.programName)}</strong>. Rajiv will personally review your details and reach out to you within a few hours to begin your customized coaching.
      </p>

      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 14px 0; font-size: 14px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.5px;">Booking Summary</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Booking ID:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #111827;">${esc(booking.bookingId)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Selected Plan:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #111827;">${esc(booking.programName)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Amount Paid:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #059669; font-size: 16px;">₹${booking.amount.toLocaleString("en-IN")}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Payment Method:</td>
            <td style="padding: 6px 0; color: #111827;">PhonePe UPI (${esc(booking.upiId)})</td>
          </tr>
          ${booking.transactionId ? `
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Reference / UTR:</td>
            <td style="padding: 6px 0; font-family: monospace; color: #111827;">${esc(booking.transactionId)}</td>
          </tr>
          ` : ""}
        </table>
      </div>

      <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 18px; border-radius: 4px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 6px 0; color: #1e40af; font-size: 14px;">What happens next?</h4>
        <p style="margin: 0; color: #1e3a8a; font-size: 13px; line-height: 1.5;">
          Rajiv will contact you via WhatsApp / Phone at <strong>${esc(booking.phone)}</strong> to gather your health metrics, daily routine, and diet preferences to create your personalized training roadmap.
        </p>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="https://wa.me/919996889494?text=Hi%20Rajiv,%20I%20have%20completed%20the%20payment%20for%20${encodeURIComponent(booking.programName)}.%20My%20Booking%20ID%20is%20${encodeURIComponent(booking.bookingId)}" style="display: inline-block; background: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Connect With Rajiv On WhatsApp</a>
      </div>
    </div>

    <div style="background: #f3f4f6; padding: 16px 30px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
      Questions? Call Rajiv directly at <a href="tel:+919996889494" style="color: #2563eb; text-decoration: none;">+91 99968 89494</a> or email <a href="mailto:rajeevdalal1@gmail.com" style="color: #2563eb; text-decoration: none;">rajeevdalal1@gmail.com</a>
    </div>
  </div>
  `;

  try {
    // Send to Rajiv Dalal & Ashish
    await transporter.sendMail({
      from: getMailFrom(),
      to: adminTo,
      replyTo: booking.email,
      subject: `⚡ New PhonePe Booking: ${booking.programName} - ${booking.name} (₹${booking.amount})`,
      html: adminHtml,
      text: `New Booking: ${booking.programName}\nClient: ${booking.name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nAmount: ₹${booking.amount}\nUTR: ${booking.transactionId}\nBooking ID: ${booking.bookingId}`,
    });
    console.log(`[Email] Booking notification sent to admin: ${adminTo}`);

    // Send confirmation to client
    if (booking.email) {
      await transporter.sendMail({
        from: getMailFrom(),
        to: booking.email,
        subject: `Booking Confirmed: ${booking.programName} | Rajiv Fitness Coaching`,
        html: customerHtml,
        text: `Hi ${booking.name},\nThank you for booking ${booking.programName} with Rajiv Fitness Coaching. Your Booking ID is ${booking.bookingId}. Rajiv will contact you shortly on ${booking.phone}.`,
      });
      console.log(`[Email] Customer confirmation sent to: ${booking.email}`);
    }
  } catch (error) {
    console.error("[Email] Failed to send booking notification email:", error.message);
  }
}

/**
 * Send Consultation notification to Admin & Customer
 */
export async function sendConsultationNotification(consultation) {
  const transporter = getTransporter();
  if (!transporter) return;

  const adminTo = getAdminRecipients();
  const cleanPhone = String(consultation.phone).replace(/\D/g, "");
  const waLink = `https://wa.me/91${cleanPhone.length === 10 ? cleanPhone : cleanPhone.slice(-10)}`;

  const adminHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0d0e; color: #f2f3f5; border: 1px solid #23272e; border-radius: 12px; overflow: hidden;">
    <div style="background: #151821; padding: 20px 24px; border-bottom: 2px solid #3b82f6;">
      <span style="display: inline-block; background: #1d4ed8; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; letter-spacing: 1px;">FREE CONSULTATION REQUEST</span>
      <h2 style="margin: 10px 0 0 0; color: #ffffff; font-size: 20px;">New Consultation Request from ${esc(consultation.name)}</h2>
    </div>

    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #8c92a2; width: 100px;">Name:</td>
          <td style="padding: 8px 0; color: #fff; font-weight: 600;">${esc(consultation.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8c92a2;">Phone:</td>
          <td style="padding: 8px 0;"><a href="tel:${esc(consultation.phone)}" style="color: #00bcd4; text-decoration: none; font-weight: 600;">${esc(consultation.phone)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8c92a2;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${esc(consultation.email)}" style="color: #00bcd4; text-decoration: none;">${esc(consultation.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8c92a2;">Goal:</td>
          <td style="padding: 8px 0; color: #ffd166; font-weight: 600;">${esc(consultation.goal || "General Fitness")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8c92a2; vertical-align: top;">Message:</td>
          <td style="padding: 8px 0; color: #e2e4ea; line-height: 1.5;">${esc(consultation.message || "No specific message provided.")}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 16px;">
        <a href="${waLink}" style="display: inline-block; background: #25d366; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">Chat on WhatsApp</a>
        <a href="tel:${esc(consultation.phone)}" style="display: inline-block; background: #2a2e39; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Call Now</a>
      </div>
    </div>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: getMailFrom(),
      to: adminTo,
      replyTo: consultation.email,
      subject: `🎯 New Consultation Request: ${consultation.name} (${consultation.goal})`,
      html: adminHtml,
      text: `New Consultation:\nName: ${consultation.name}\nPhone: ${consultation.phone}\nEmail: ${consultation.email}\nGoal: ${consultation.goal}\nMessage: ${consultation.message}`,
    });
    console.log(`[Email] Consultation notification sent to admin: ${adminTo}`);
  } catch (error) {
    console.error("[Email] Failed to send consultation notification:", error.message);
  }
}

/**
 * Send Contact form notification to Admin
 */
export async function sendContactNotification(contact) {
  const transporter = getTransporter();
  if (!transporter) return;

  const adminTo = getAdminRecipients();
  const cleanPhone = String(contact.phone).replace(/\D/g, "");
  const waLink = `https://wa.me/91${cleanPhone.length === 10 ? cleanPhone : cleanPhone.slice(-10)}`;

  const adminHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0d0e; color: #f2f3f5; border: 1px solid #23272e; border-radius: 12px; overflow: hidden;">
    <div style="background: #151821; padding: 20px 24px; border-bottom: 2px solid #10b981;">
      <span style="display: inline-block; background: #059669; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; letter-spacing: 1px;">WEBSITE CONTACT MESSAGE</span>
      <h2 style="margin: 10px 0 0 0; color: #ffffff; font-size: 20px;">New Message from ${esc(contact.name)}</h2>
    </div>

    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #8c92a2; width: 100px;">Name:</td>
          <td style="padding: 8px 0; color: #fff; font-weight: 600;">${esc(contact.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8c92a2;">Phone:</td>
          <td style="padding: 8px 0;"><a href="tel:${esc(contact.phone)}" style="color: #00bcd4; text-decoration: none; font-weight: 600;">${esc(contact.phone)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8c92a2;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${esc(contact.email)}" style="color: #00bcd4; text-decoration: none;">${esc(contact.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #8c92a2; vertical-align: top;">Message:</td>
          <td style="padding: 8px 0; color: #e2e4ea; line-height: 1.5; white-space: pre-line;">${esc(contact.message)}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 16px;">
        <a href="${waLink}" style="display: inline-block; background: #25d366; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">Reply on WhatsApp</a>
        <a href="mailto:${esc(contact.email)}" style="display: inline-block; background: #2a2e39; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply via Email</a>
      </div>
    </div>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: getMailFrom(),
      to: adminTo,
      replyTo: contact.email,
      subject: `💬 New Message on Rajiv Website from ${contact.name}`,
      html: adminHtml,
      text: `New Contact Message:\nName: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}\nMessage: ${contact.message}`,
    });
    console.log(`[Email] Contact notification sent to admin: ${adminTo}`);
  } catch (error) {
    console.error("[Email] Failed to send contact notification:", error.message);
  }
}
