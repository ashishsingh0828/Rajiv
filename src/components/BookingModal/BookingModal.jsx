import { useEffect, useMemo, useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  HelpCircle,
  Image as ImageIcon,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  QrCode,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { createBooking } from "../../services/api";

import "./BookingModal.css";

const UPI_ID = "9996889494@ybl";
const PAYEE_NAME = "Rajiv Dalal";
const COACH_PHONE = "+919996889494";

const BookingModal = ({ isOpen, onClose, program }) => {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [showUtrHelp, setShowUtrHelp] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    transactionId: "",
    screenshot: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setBookingResult(null);
      setCopied(false);
      setShowUtrHelp(false);
    }
  }, [isOpen]);

  const finalPrice = useMemo(() => {
    return program?.price || 0;
  }, [program]);

  // Deep link for mobile UPI apps (PhonePe, GPay, Paytm)
  const upiDeepLink = useMemo(() => {
    const note = encodeURIComponent(`Aurafit by Rajiv - ${program?.name || "Coaching"}`);
    const name = encodeURIComponent(PAYEE_NAME);
    return `upi://pay?pa=${UPI_ID}&pn=${name}&am=${finalPrice}&cu=INR&tn=${note}`;
  }, [finalPrice, program]);

  // Clean UTR check
  const isUtrValid = useMemo(() => {
    const clean = formData.transactionId.replace(/\D/g, "");
    return clean.length === 12;
  }, [formData.transactionId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Auto-clean UTR if pasted with spaces or letters
    if (name === "transactionId") {
      const match12 = value.match(/\b\d{12}\b/);
      if (match12 && value.length > 12) {
        setFormData((prev) => ({ ...prev, transactionId: match12[0] }));
        return;
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied: 9996889494@ybl");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info("UPI ID: 9996889494@ybl");
    }
  };

  const handlePasteUtr = async () => {
    try {
      if (!navigator.clipboard?.readText) {
        toast.info("Please paste using Ctrl+V or long-press.");
        return;
      }
      const text = await navigator.clipboard.readText();
      if (text) {
        const match = text.match(/\b\d{12}\b/);
        const clean = match ? match[0] : text.trim();
        setFormData((prev) => ({ ...prev, transactionId: clean }));
        toast.success(`Pasted UTR: ${clean}`);
      } else {
        toast.info("Clipboard is empty.");
      }
    } catch {
      toast.info("Please paste using Ctrl+V or long-press.");
    }
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please upload an image under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, screenshot: reader.result }));
      toast.success("Payment receipt screenshot attached!");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setFormData((prev) => ({ ...prev, screenshot: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDetailsSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in your name, email and phone number.");
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!formData.transactionId || formData.transactionId.trim().length < 6) {
      toast.error("Please enter a valid UPI Transaction ID / UTR (from your PhonePe receipt).");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        programId: program?.id,
        programName: program?.name,
        programSubtitle: program?.subtitle,
        mode: program?.mode,
        amount: finalPrice,
        billingText: program?.billingText,
        transactionId: formData.transactionId,
        paymentScreenshot: formData.screenshot,
        notes: formData.notes,
      };

      const res = await createBooking(payload);

      setBookingResult(res.booking);
      setStep(3);
      toast.success("Payment confirmed & enrollment receipt generated!");
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Could not complete booking submission. Please message Rajiv on WhatsApp directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleCopyReceipt = async () => {
    const text = `=========================================
AURAFIT BY RAJIV - OFFICIAL ENROLLMENT RECEIPT
Tagline: Build Strength. Own Your Aura.
=========================================
Booking Reference : ${bookingResult?.bookingId || "RJV-" + Date.now().toString(36).toUpperCase()}
Date & Time       : ${new Date(bookingResult?.createdAt || Date.now()).toLocaleString("en-IN")}
Status            : PAYMENT VERIFIED & ENROLLED

CLIENT DETAILS
Name              : ${bookingResult?.name || formData.name}
Phone             : ${bookingResult?.phone || formData.phone}
Email             : ${bookingResult?.email || formData.email}

COACHING PLAN
Plan              : ${bookingResult?.programName || program?.name}
Type              : ${(bookingResult?.mode || program?.mode) === "offline" ? "In-Person (Bahadurgarh)" : "Online Coaching"}
Amount Paid       : ₹${(bookingResult?.amount || finalPrice).toLocaleString("en-IN")}
Payment Method    : PhonePe UPI (${UPI_ID})
Payee             : Rajiv Dalal
UPI Reference/UTR : ${bookingResult?.transactionId || formData.transactionId}

HEAD COACH
Coach Rajiv Dalal (+91 99968 89494)
Bahadurgarh, Haryana & Online Worldwide
=========================================`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Receipt details copied to clipboard!");
    } catch {
      toast.info("Receipt ready.");
    }
  };

  if (!isOpen || !program) {
    return null;
  }

  const isOffline = program.mode === "offline";

  return (
    <div
      className="booking-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="booking-modal">
        {/* =====================================================
            LEFT PROGRAM SUMMARY
        ====================================================== */}
        <aside className="booking-summary">
          <div className="booking-brand">
            <div className="booking-brand-badge">
              <img
                src="/images/logo.jpg"
                alt="Aurafit by Rajiv"
                className="booking-brand-img"
              />
            </div>
            <div className="booking-brand-text">
              <span className="booking-brand-name">
                AURA<span className="booking-brand-accent">FIT</span>
              </span>
              <span className="booking-brand-sub">BY RAJIV</span>
            </div>
          </div>

          <div className="booking-summary-main">
            <span className="booking-summary-kicker">SELECTED PROGRAM</span>

            <h2>{program.name}</h2>
            <p>{program.subtitle}</p>

            <div className="booking-price">
              {program.oldPrice && (
                <span>₹{program.oldPrice.toLocaleString("en-IN")}</span>
              )}

              <div>
                <strong>₹{finalPrice.toLocaleString("en-IN")}</strong>
                <small>{program.billingText || "/ month"}</small>
              </div>
            </div>

            <div className="booking-summary-features">
              {program.features?.slice(0, 5).map((feature) => (
                <div key={feature}>
                  <span>
                    <Check size={11} />
                  </span>
                  {feature}
                </div>
              ))}
            </div>

            {isOffline && (
              <div className="booking-location">
                <MapPin size={17} />
                <div>
                  <strong>Offline Training</strong>
                  <p>
                    Training sessions are conducted in Bahadurgarh, Haryana.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="booking-summary-bottom">
            <ShieldCheck size={16} />
            <span>Build Strength. Own Your Aura.</span>
          </div>
        </aside>

        {/* =====================================================
            RIGHT CONTENT
        ====================================================== */}
        <section className="booking-content">
          <button
            type="button"
            className="booking-close"
            onClick={onClose}
            aria-label="Close booking"
          >
            <X size={20} />
          </button>

          <div className="booking-content-inner">
            {/* =================================================
                STEP INDICATOR
            ================================================== */}
            <div className="booking-steps">
              <div className={`booking-step ${step >= 1 ? "active" : ""}`}>
                <span>01</span>
                <div>
                  <strong>Your Details</strong>
                  <small>Basic info</small>
                </div>
              </div>

              <div className="booking-step-line">
                <span className={step >= 2 ? "complete" : ""}></span>
              </div>

              <div className={`booking-step ${step >= 2 ? "active" : ""}`}>
                <span>02</span>
                <div>
                  <strong>PhonePe Pay</strong>
                  <small>Scan & Paste UTR</small>
                </div>
              </div>

              <div className="booking-step-line">
                <span className={step >= 3 ? "complete" : ""}></span>
              </div>

              <div className={`booking-step ${step >= 3 ? "active" : ""}`}>
                <span>03</span>
                <div>
                  <strong>Receipt</strong>
                  <small>Download/Print</small>
                </div>
              </div>
            </div>

            {/* =================================================
                STEP 1: DETAILS
            ================================================== */}
            {step === 1 && (
              <div className="booking-step-content">
                <div className="booking-heading">
                  <span>STEP 1 OF 3 • YOUR DETAILS</span>
                  <h3>Tell us about yourself</h3>
                  <p>
                    Enter your contact information to begin coaching enrollment.
                  </p>
                </div>

                <form className="booking-form" onSubmit={handleDetailsSubmit}>
                  <div className="booking-field">
                    <label htmlFor="booking-name">Full Name *</label>
                    <div className="booking-input">
                      <User size={17} />
                      <input
                        id="booking-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-field">
                    <label htmlFor="booking-phone">Phone / WhatsApp *</label>
                    <div className="booking-input">
                      <Phone size={17} />
                      <input
                        id="booking-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-field booking-full">
                    <label htmlFor="booking-email">Email Address (For Receipt) *</label>
                    <div className="booking-input">
                      <Mail size={17} />
                      <input
                        id="booking-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="booking-field booking-full">
                    <label htmlFor="booking-notes">
                      Current fitness goals or injuries (Optional)
                    </label>
                    <div className="booking-input">
                      <input
                        id="booking-notes"
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="e.g. Fat loss, deadlift form, shoulder mobility..."
                      />
                    </div>
                  </div>

                  <div className="booking-selected-box booking-full">
                    <div>
                      <span>SELECTED PLAN</span>
                      <strong>{program.name}</strong>
                      <small>
                        {program.mode === "offline"
                          ? "Offline Coaching (Bahadurgarh Hub)"
                          : "Online Coaching (Global 1-on-1)"}
                      </small>
                    </div>

                    <div className="booking-selected-price">
                      <strong>₹{finalPrice.toLocaleString("en-IN")}</strong>
                      <span>{program.billingText || "/ month"}</span>
                    </div>
                  </div>

                  <div className="booking-full">
                    <button type="submit" className="booking-continue-btn">
                      <span>Proceed To PhonePe Scanner</span>
                      <span>
                        <ArrowUpRight size={18} />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* =================================================
                STEP 2: PHONEPE SCANNER & PAYMENT VERIFICATION
            ================================================== */}
            {step === 2 && (
              <div className="booking-step-content">
                <button
                  type="button"
                  className="booking-back"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={15} />
                  Back to details
                </button>

                <div className="booking-heading">
                  <span className="booking-phonepe-badge">
                    <QrCode size={13} />
                    STEP 2 OF 3 • SCAN &amp; PASTE UTR
                  </span>
                  <h3>Scan PhonePe &amp; Confirm</h3>
                  <p>
                    Pay <strong>₹{finalPrice.toLocaleString("en-IN")}</strong> via PhonePe QR, copy the 12-digit UTR from the receipt, and paste it below.
                  </p>
                </div>

                {/* PHONEPE SCANNER CARD */}
                <div className="phonepe-card">
                  <div className="phonepe-card-header">
                    <div className="phonepe-brand-badge">
                      <span className="phonepe-icon-dot">पे</span>
                      <strong>PhonePe ACCEPTED HERE</strong>
                    </div>
                    <span className="phonepe-amount-pill">
                      Pay ₹{finalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="phonepe-scanner-layout">
                    {/* Official PhonePe QR Image */}
                    <div className="phonepe-qr-wrap">
                      <img
                        src="/images/phonepe-qr.png"
                        alt="Rajiv Dalal PhonePe Scanner QR"
                        className="phonepe-qr-image"
                      />
                      <span className="phonepe-qr-caption">
                        Scan with PhonePe, GPay, Paytm or any UPI App
                      </span>
                    </div>

                    {/* Payee Info & Quick Actions */}
                    <div className="phonepe-details">
                      <div className="phonepe-payee-info">
                        <span className="phonepe-label">VERIFIED PAYEE</span>
                        <h4 className="phonepe-payee-name">{PAYEE_NAME}</h4>
                        <p className="phonepe-payee-desc">
                          Aurafit Head Coach &amp; Founder
                        </p>
                      </div>

                      <div className="phonepe-upi-box">
                        <span className="phonepe-label">UPI ID</span>
                        <div className="phonepe-upi-row">
                          <code className="phonepe-upi-text">{UPI_ID}</code>
                          <button
                            type="button"
                            className="phonepe-copy-btn"
                            onClick={handleCopyUpi}
                            title="Copy UPI ID"
                          >
                            {copied ? (
                              <>
                                <Check size={14} /> Copied
                              </>
                            ) : (
                              <>
                                <Copy size={14} /> Copy
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Mobile Deep Link Button */}
                      <a
                        href={upiDeepLink}
                        className="phonepe-mobile-pay-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} />
                        <span>Open UPI App Directly (Mobile)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* STEP-BY-STEP PAYMENT GUIDE */}
                <div className="phonepe-guide-box">
                  <div className="phonepe-guide-step">
                    <span className="phonepe-guide-num">1</span>
                    <p>Open PhonePe / GPay &amp; scan the QR above or pay to <code>{UPI_ID}</code></p>
                  </div>
                  <div className="phonepe-guide-step">
                    <span className="phonepe-guide-num">2</span>
                    <p>After payment, tap "View Details" to see the <strong>12-digit UTR / UPI Ref ID</strong></p>
                  </div>
                  <div className="phonepe-guide-step">
                    <span className="phonepe-guide-num">3</span>
                    <p>Click <strong>"Paste from Clipboard"</strong> or paste the UTR number below</p>
                  </div>
                </div>

                {/* CONFIRMATION FORM */}
                <form className="booking-form" onSubmit={handlePaymentSubmit}>
                  <div className="booking-field booking-full">
                    <div className="booking-field-top-row">
                      <label htmlFor="booking-utr">
                        UPI Reference / UTR Number (12 Digits) *
                      </label>
                      <button
                        type="button"
                        className="booking-utr-help-btn"
                        onClick={() => setShowUtrHelp((prev) => !prev)}
                      >
                        <HelpCircle size={13} />
                        Where is my UTR?
                      </button>
                    </div>

                    <div className="booking-input-with-action">
                      <div className="booking-input">
                        <input
                          id="booking-utr"
                          type="text"
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleChange}
                          placeholder="e.g. 432109876543 (12-digit UTR)"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="booking-paste-btn"
                        onClick={handlePasteUtr}
                        title="Paste UTR from clipboard"
                      >
                        <Copy size={14} />
                        <span>Paste</span>
                      </button>
                    </div>

                    {isUtrValid && (
                      <span className="booking-utr-valid-badge">
                        <CheckCircle2 size={13} /> 12-digit UTR valid
                      </span>
                    )}

                    {showUtrHelp && (
                      <div className="booking-utr-help-card">
                        <strong>Finding your UTR / UPI Reference Number:</strong>
                        <ul>
                          <li><strong>PhonePe:</strong> Open transaction history ➔ Tap payment ➔ Look for <strong>"UTR: 432109876543"</strong>.</li>
                          <li><strong>Google Pay:</strong> Tap payment ➔ Look for <strong>"UPI transaction ID"</strong> (12 digits).</li>
                          <li><strong>Paytm:</strong> Tap order ➔ Look for <strong>"UPI Ref No"</strong>.</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* OPTIONAL SCREENSHOT ATTACHMENT */}
                  <div className="booking-field booking-full">
                    <label>Payment Screenshot (Optional)</label>
                    <div className="booking-screenshot-area">
                      {formData.screenshot ? (
                        <div className="booking-screenshot-preview">
                          <img src={formData.screenshot} alt="Payment Receipt Screenshot" />
                          <button
                            type="button"
                            className="booking-remove-screenshot"
                            onClick={handleRemoveScreenshot}
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="booking-upload-screenshot-btn"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <ImageIcon size={16} />
                          <span>Attach PhonePe Screenshot (Optional)</span>
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleScreenshotChange}
                      />
                    </div>
                  </div>

                  <div className="booking-full">
                    <button
                      type="submit"
                      className="booking-pay-btn"
                      disabled={isSubmitting}
                      style={
                        isSubmitting
                          ? { opacity: 0.7, cursor: "not-allowed" }
                          : {}
                      }
                    >
                      <span>
                        {isSubmitting
                          ? "Verifying & Generating Receipt..."
                          : `Confirm & Generate Receipt (₹${finalPrice.toLocaleString("en-IN")})`}
                      </span>

                      <span>
                        {isSubmitting ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </span>
                    </button>
                  </div>
                </form>

                <div className="booking-security">
                  <ShieldCheck size={14} />
                  <p>
                    Payments are transferred directly via PhonePe UPI to coach Rajiv Dalal.
                    Your booking is recorded in the Aurafit database and an automated Google email notification is dispatched.
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                STEP 3: OFFICIAL TAX & ENROLLMENT RECEIPT (PRINTABLE)
            ================================================== */}
            {step === 3 && (
              <div className="booking-success-view">
                <div className="booking-success-badge">
                  <Sparkles size={28} />
                </div>

                <span className="booking-success-kicker">
                  ENROLLMENT &amp; PAYMENT VERIFIED
                </span>

                <h3>Official Enrollment Receipt</h3>

                <p className="booking-success-lead">
                  Thank you, <strong>{formData.name}</strong>! Your payment has been recorded. Here is your official coaching enrollment receipt.
                </p>

                {/* OFFICIAL PRINTABLE RECEIPT CARD */}
                <div className="official-receipt-card" id="printable-receipt">
                  <div className="receipt-header">
                    <div className="receipt-brand-row">
                      <div className="receipt-logo-wrap">
                        <img src="/images/logo.jpg" alt="Aurafit" />
                      </div>
                      <div>
                        <h4>AURAFIT BY RAJIV</h4>
                        <span className="receipt-tagline">Build Strength. Own Your Aura.</span>
                      </div>
                    </div>
                    <div className="receipt-badge-pill">
                      <span>OFFICIAL RECEIPT</span>
                    </div>
                  </div>

                  <div className="receipt-divider"></div>

                  <div className="receipt-grid">
                    <div className="receipt-cell">
                      <span className="receipt-lbl">Receipt / Booking ID</span>
                      <strong className="receipt-val receipt-code">
                        {bookingResult?.bookingId || "RJV-" + Date.now().toString(36).toUpperCase()}
                      </strong>
                    </div>
                    <div className="receipt-cell">
                      <span className="receipt-lbl">Date &amp; Time</span>
                      <strong className="receipt-val">
                        {new Date(bookingResult?.createdAt || Date.now()).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>
                    </div>
                  </div>

                  <div className="receipt-grid">
                    <div className="receipt-cell">
                      <span className="receipt-lbl">Enrolled Client</span>
                      <strong className="receipt-val">{bookingResult?.name || formData.name}</strong>
                      <small className="receipt-subval">{bookingResult?.phone || formData.phone}</small>
                    </div>
                    <div className="receipt-cell">
                      <span className="receipt-lbl">Client Email</span>
                      <strong className="receipt-val">{bookingResult?.email || formData.email}</strong>
                    </div>
                  </div>

                  <div className="receipt-divider"></div>

                  <div className="receipt-table">
                    <div className="receipt-table-header">
                      <span>Item / Coaching Plan</span>
                      <span>Type</span>
                      <span style={{ textAlign: "right" }}>Amount</span>
                    </div>
                    <div className="receipt-table-row">
                      <div>
                        <strong>{bookingResult?.programName || program?.name}</strong>
                        <p>{program?.subtitle}</p>
                      </div>
                      <div>
                        <span className="receipt-mode-pill">
                          {(bookingResult?.mode || program?.mode) === "offline" ? "Bahadurgarh Hub" : "Online 1-to-1"}
                        </span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <strong className="receipt-amount-highlight">
                          ₹{(bookingResult?.amount || finalPrice).toLocaleString("en-IN")}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="receipt-divider"></div>

                  <div className="receipt-grid">
                    <div className="receipt-cell">
                      <span className="receipt-lbl">Payment Mode</span>
                      <span className="receipt-val">PhonePe UPI ({UPI_ID})</span>
                    </div>
                    <div className="receipt-cell">
                      <span className="receipt-lbl">UTR / Transaction Ref</span>
                      <code className="receipt-utr-code">
                        {bookingResult?.transactionId || formData.transactionId}
                      </code>
                    </div>
                  </div>

                  <div className="receipt-footer">
                    <div className="receipt-coach-stamp">
                      <CheckCircle2 size={16} className="receipt-verified-icon" />
                      <div>
                        <strong>Verified by Rajiv Dalal</strong>
                        <small>Founder &amp; Head Coach • +91 99968 89494</small>
                      </div>
                    </div>
                    <div className="receipt-status-confirmed">
                      <span>PAID &amp; CONFIRMED</span>
                    </div>
                  </div>
                </div>

                <div className="booking-success-info">
                  <p>
                    <Check size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                    An automated copy of this receipt has been emailed to <strong>{formData.email}</strong>. Coach Rajiv Dalal will reach out to you directly at <strong>{formData.phone}</strong>.
                  </p>
                </div>

                {/* ACTION BUTTONS: PRINT, COPY, WHATSAPP */}
                <div className="receipt-action-buttons">
                  <button
                    type="button"
                    className="receipt-btn-print"
                    onClick={handlePrintReceipt}
                  >
                    <Printer size={16} />
                    <span>Download / Print Receipt</span>
                  </button>

                  <button
                    type="button"
                    className="receipt-btn-copy"
                    onClick={handleCopyReceipt}
                  >
                    <Copy size={16} />
                    <span>Copy Receipt Details</span>
                  </button>
                </div>

                <div className="booking-success-actions">
                  <a
                    href={`https://wa.me/919996889494?text=${encodeURIComponent(
                      `Hi Rajiv! I just enrolled in the ${program.name} plan (₹${finalPrice}) on Aurafit website. My Booking ID is ${
                        bookingResult?.bookingId || ""
                      } and my UTR is ${formData.transactionId}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking-wa-btn"
                  >
                    <MessageCircle size={18} />
                    <span>Send Receipt To Rajiv on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="booking-done-btn"
                  >
                    Done / Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingModal;
