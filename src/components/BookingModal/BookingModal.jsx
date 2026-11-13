import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  ShieldCheck,
  Sparkles,
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    transactionId: "",
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied to clipboard: 9996889494@ybl");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info("UPI ID: 9996889494@ybl");
    }
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
        notes: formData.notes,
      };

      const res = await createBooking(payload);

      setBookingResult(res.booking);
      setStep(3);
      toast.success("Payment confirmed & booking saved! Confirmation email sent via Aurafit.");
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
            <span>Secure booking • Aurafit by Rajiv</span>
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
                  <small>Scan & verify</small>
                </div>
              </div>

              <div className="booking-step-line">
                <span className={step >= 3 ? "complete" : ""}></span>
              </div>

              <div className={`booking-step ${step >= 3 ? "active" : ""}`}>
                <span>03</span>
                <div>
                  <strong>Confirmed</strong>
                  <small>Receipt</small>
                </div>
              </div>
            </div>

            {/* =================================================
                STEP 1: DETAILS
            ================================================== */}
            {step === 1 && (
              <div className="booking-step-content">
                <div className="booking-heading">
                  <span>STEP 1 OF 2</span>
                  <h3>Tell us about yourself</h3>
                  <p>
                    Enter your details to proceed to the PhonePe scanner payment.
                  </p>
                </div>

                <form className="booking-form" onSubmit={handleDetailsSubmit}>
                  <div className="booking-field">
                    <label htmlFor="booking-name">Full Name</label>
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
                    <label htmlFor="booking-phone">Phone Number</label>
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
                    <label htmlFor="booking-email">Email Address</label>
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
                      Any specific fitness goals or health conditions (optional)
                    </label>
                    <div className="booking-input">
                      <input
                        id="booking-notes"
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="e.g. Muscle building, fat loss, shoulder issue..."
                      />
                    </div>
                  </div>

                  <div className="booking-selected-box booking-full">
                    <div>
                      <span>SELECTED PLAN</span>
                      <strong>{program.name}</strong>
                      <small>
                        {program.mode === "offline"
                          ? "Offline Coaching (Bahadurgarh)"
                          : "Online Coaching"}
                      </small>
                    </div>

                    <div className="booking-selected-price">
                      <strong>₹{finalPrice.toLocaleString("en-IN")}</strong>
                      <span>{program.billingText || "/ month"}</span>
                    </div>
                  </div>

                  <div className="booking-full">
                    <button type="submit" className="booking-continue-btn">
                      <span>Continue To PhonePe Payment</span>
                      <span>
                        <ArrowUpRight size={18} />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* =================================================
                STEP 2: PHONEPE SCANNER & PAYMENT
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
                  Edit details
                </button>

                <div className="booking-heading">
                  <span className="booking-phonepe-badge">
                    <QrCode size={13} />
                    PHONEPE UPI SCANNER
                  </span>
                  <h3>Scan & Pay via PhonePe</h3>
                  <p>
                    Scan Rajiv’s PhonePe QR code or use the direct UPI link to
                    complete the payment of ₹{finalPrice.toLocaleString("en-IN")}.
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
                        Scan with PhonePe, GPay, Paytm or any UPI app
                      </span>
                    </div>

                    {/* Payee Info & Quick Actions */}
                    <div className="phonepe-details">
                      <div className="phonepe-payee-info">
                        <span className="phonepe-label">VERIFIED PAYEE</span>
                        <h4 className="phonepe-payee-name">{PAYEE_NAME}</h4>
                        <p className="phonepe-payee-desc">
                          Certified Fitness & Nutrition Coach
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
                        <span>Open UPI App / PhonePe (Mobile)</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* INSTRUCTIONS */}
                <div className="phonepe-instructions">
                  <h5>How to complete your booking:</h5>
                  <ol>
                    <li>
                      Open <strong>PhonePe</strong>, <strong>Google Pay</strong>, or <strong>Paytm</strong> on your phone.
                    </li>
                    <li>
                      Scan the QR code above or pay directly to <code>{UPI_ID}</code> for <strong>₹{finalPrice.toLocaleString("en-IN")}</strong>.
                    </li>
                    <li>
                      After payment, copy the <strong>12-digit UTR / UPI Ref ID</strong> from your transaction receipt and enter it below.
                    </li>
                  </ol>
                </div>

                {/* CONFIRMATION FORM */}
                <form className="booking-form" onSubmit={handlePaymentSubmit}>
                  <div className="booking-field booking-full">
                    <label htmlFor="booking-utr">
                      UPI Reference / UTR Number (12 digits) *
                    </label>
                    <div className="booking-input">
                      <input
                        id="booking-utr"
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        placeholder="e.g. 432109876543 (from PhonePe receipt)"
                        required
                      />
                    </div>
                    <small className="booking-field-hint">
                      Look for "UTR" or "UPI Transaction ID" in your PhonePe / GPay screen.
                    </small>
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
                          ? "Verifying & Saving..."
                          : `Confirm Payment (₹${finalPrice.toLocaleString("en-IN")})`}
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
                    Payments are handled directly via PhonePe UPI to Rajiv Dalal.
                    Your booking is securely recorded in Aurafit database and automated Google Gmail notification is sent instantly.
                  </p>
                </div>
              </div>
            )}

            {/* =================================================
                STEP 3: SUCCESS & CONFIRMATION RECEIPT
            ================================================== */}
            {step === 3 && (
              <div className="booking-success-view">
                <div className="booking-success-badge">
                  <Sparkles size={28} />
                </div>

                <span className="booking-success-kicker">
                  PAYMENT SUBMITTED SUCCESSFULLY
                </span>

                <h3>You're All Set!</h3>

                <p className="booking-success-lead">
                  Thank you, <strong>{formData.name}</strong>. Your payment details for the <strong>{program.name}</strong> have been received and recorded.
                </p>

                {bookingResult && (
                  <div className="booking-receipt-box">
                    <div className="booking-receipt-row">
                      <span>Booking ID</span>
                      <strong className="booking-receipt-id">
                        {bookingResult.bookingId}
                      </strong>
                    </div>

                    <div className="booking-receipt-row">
                      <span>Program</span>
                      <strong>{bookingResult.programName}</strong>
                    </div>

                    <div className="booking-receipt-row">
                      <span>Amount</span>
                      <strong className="booking-receipt-price">
                        ₹{bookingResult.amount.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="booking-receipt-row">
                      <span>Transaction UTR</span>
                      <code>{bookingResult.transactionId}</code>
                    </div>

                    <div className="booking-receipt-row">
                      <span>Notification Status</span>
                      <span className="booking-status-pill">
                        Delivered to Coach on Google
                      </span>
                    </div>
                  </div>
                )}

                <div className="booking-success-info">
                  <p>
                    A confirmation receipt has been sent to <strong>{formData.email}</strong>. Rajiv Dalal has also been notified via Google / Gmail.
                    Rajiv will contact you shortly on <strong>{formData.phone}</strong> to start your transformation!
                  </p>
                </div>

                <div className="booking-success-actions">
                  <a
                    href={`https://wa.me/919996889494?text=${encodeURIComponent(
                      `Hi Rajiv! I just booked the ${program.name} plan (₹${finalPrice}) on Aurafit website. My Booking ID is ${
                        bookingResult?.bookingId || ""
                      } and my UTR is ${formData.transactionId}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking-wa-btn"
                  >
                    <MessageCircle size={18} />
                    <span>Chat with Rajiv on WhatsApp</span>
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
