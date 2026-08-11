import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import "./BookingModal.css";

const BookingModal = ({
  isOpen,
  onClose,
  program,
}) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  const finalPrice = useMemo(() => {
    return program?.price || 0;
  }, [program]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDetailsSubmit = (event) => {
    event.preventDefault();

    setStep(2);
  };

  const handlePayment = () => {
    /*
    |--------------------------------------------------------------------------
    | RAZORPAY WILL GO HERE LATER
    |--------------------------------------------------------------------------
    |
    | Correct flow later:
    |
    | 1. Send selected program ID to backend.
    | 2. Backend verifies price.
    | 3. Backend creates Razorpay order.
    | 4. Frontend opens Razorpay checkout.
    | 5. Backend verifies payment signature.
    | 6. Booking becomes paid/confirmed.
    |
    | Do NOT trust only the frontend program.price.
    |
    */

    console.log("Ready for payment", {
      customer: formData,
      program,
    });
  };

  if (!isOpen || !program) {
    return null;
  }

  const isOffline =
    program.mode === "offline";

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
            <span>
              RAJIV
            </span>

            <i></i>
          </div>


          <div className="booking-summary-main">

            <span className="booking-summary-kicker">
              SELECTED PROGRAM
            </span>

            <h2>
              {program.name}
            </h2>

            <p>
              {program.subtitle}
            </p>


            <div className="booking-price">

              {program.oldPrice && (
                <span>
                  ₹
                  {program.oldPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}

              <div>
                <strong>
                  ₹
                  {finalPrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <small>
                  {program.billingText ||
                    "/ month"}
                </small>
              </div>

            </div>


            <div className="booking-summary-features">

              {program.features
                ?.slice(0, 5)
                .map((feature) => (
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
                  <strong>
                    Offline Training
                  </strong>

                  <p>
                    You will need to visit the
                    training location in
                    Bahadurgarh, Haryana.
                  </p>
                </div>

              </div>
            )}

          </div>


          <div className="booking-summary-bottom">

            <ShieldCheck size={16} />

            <span>
              Secure booking process
            </span>

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

              <div
                className={`booking-step ${
                  step >= 1 ? "active" : ""
                }`}
              >
                <span>01</span>

                <div>
                  <strong>
                    Your Details
                  </strong>

                  <small>
                    Basic information
                  </small>
                </div>
              </div>


              <div className="booking-step-line">

                <span
                  className={
                    step >= 2
                      ? "complete"
                      : ""
                  }
                ></span>

              </div>


              <div
                className={`booking-step ${
                  step >= 2 ? "active" : ""
                }`}
              >
                <span>02</span>

                <div>
                  <strong>
                    Payment
                  </strong>

                  <small>
                    Review & pay
                  </small>
                </div>
              </div>

            </div>


            {/* =================================================
                STEP 1
            ================================================== */}

            {step === 1 && (
              <div className="booking-step-content">

                <div className="booking-heading">

                  <span>
                    COMPLETE YOUR BOOKING
                  </span>

                  <h3>
                    Tell us about yourself
                  </h3>

                  <p>
                    Enter your contact details to
                    continue to payment.
                  </p>

                </div>


                <form
                  className="booking-form"
                  onSubmit={
                    handleDetailsSubmit
                  }
                >

                  <div className="booking-field">

                    <label
                      htmlFor="booking-name"
                    >
                      Full Name
                    </label>

                    <div className="booking-input">

                      <User size={17} />

                      <input
                        id="booking-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />

                    </div>

                  </div>


                  <div className="booking-field">

                    <label
                      htmlFor="booking-phone"
                    >
                      Phone Number
                    </label>

                    <div className="booking-input">

                      <Phone size={17} />

                      <input
                        id="booking-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />

                    </div>

                  </div>


                  <div className="booking-field booking-full">

                    <label
                      htmlFor="booking-email"
                    >
                      Email Address
                    </label>

                    <div className="booking-input">

                      <Mail size={17} />

                      <input
                        id="booking-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                      />

                    </div>

                  </div>


                  <div className="booking-selected-box booking-full">

                    <div>
                      <span>
                        SELECTED PLAN
                      </span>

                      <strong>
                        {program.name}
                      </strong>

                      <small>
                        {program.mode ===
                        "offline"
                          ? "Offline Coaching"
                          : "Online Coaching"}
                      </small>
                    </div>


                    <div className="booking-selected-price">

                      <strong>
                        ₹
                        {finalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <span>
                        {program.billingText ||
                          "/ month"}
                      </span>

                    </div>

                  </div>


                  <div className="booking-full">

                    <button
                      type="submit"
                      className="booking-continue-btn"
                    >

                      <span>
                        Continue To Payment
                      </span>

                      <span>
                        <ArrowUpRight
                          size={18}
                        />
                      </span>

                    </button>

                  </div>

                </form>

              </div>
            )}


            {/* =================================================
                STEP 2
            ================================================== */}

            {step === 2 && (
              <div className="booking-step-content">

                <button
                  type="button"
                  className="booking-back"
                  onClick={() =>
                    setStep(1)
                  }
                >
                  <ArrowLeft size={15} />
                  Edit details
                </button>


                <div className="booking-heading">

                  <span>
                    PAYMENT
                  </span>

                  <h3>
                    Review your booking
                  </h3>

                  <p>
                    Check the details below before
                    continuing to secure payment.
                  </p>

                </div>


                <div className="booking-review">

                  <div className="booking-review-row">

                    <span>
                      Name
                    </span>

                    <strong>
                      {formData.name}
                    </strong>

                  </div>


                  <div className="booking-review-row">

                    <span>
                      Phone
                    </span>

                    <strong>
                      {formData.phone}
                    </strong>

                  </div>


                  <div className="booking-review-row">

                    <span>
                      Email
                    </span>

                    <strong>
                      {formData.email}
                    </strong>

                  </div>


                  <div className="booking-review-row">

                    <span>
                      Program
                    </span>

                    <strong>
                      {program.name}
                    </strong>

                  </div>


                  <div className="booking-review-row">

                    <span>
                      Coaching
                    </span>

                    <strong>
                      {program.mode ===
                      "offline"
                        ? "Offline"
                        : "Online"}
                    </strong>

                  </div>

                </div>


                <div className="booking-payment-summary">

                  <div>
                    <span>
                      Program Price
                    </span>

                    <strong>
                      ₹
                      {finalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Processing
                    </span>

                    <strong>
                      ₹0
                    </strong>
                  </div>


                  <div className="booking-total">

                    <span>
                      Total Payable
                    </span>

                    <strong>
                      ₹
                      {finalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                </div>


                <div className="booking-payment-provider">

                  <div className="booking-payment-icon">
                    <CreditCard size={19} />
                  </div>

                  <div>
                    <span>
                      SECURE PAYMENT
                    </span>

                    <strong>
                      Razorpay
                    </strong>

                    <p>
                      UPI, cards, net banking and
                      supported payment methods.
                    </p>
                  </div>

                </div>


                <button
                  type="button"
                  className="booking-pay-btn"
                  onClick={handlePayment}
                >

                  <span>
                    Pay ₹
                    {finalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span>
                    <ArrowUpRight
                      size={18}
                    />
                  </span>

                </button>


                <div className="booking-security">

                  <ShieldCheck size={14} />

                  <p>
                    Payment will be processed securely
                    through Razorpay once payment
                    integration is connected.
                  </p>

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