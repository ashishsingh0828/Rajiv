import { useEffect, useState } from "react";
import {
  X,
  ArrowUpRight,
  User,
  Mail,
  Phone,
  Target,
  MessageSquare,
  Check,
  MapPin,
  Dumbbell,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { createConsultation } from "../../services/api";

import "./ConsultationModal.css";

const goals = [
  "Fat Loss",
  "Muscle Gain",
  "Strength & Performance",
  "Lifestyle Transformation",
  "Nutrition Coaching",
  "General Fitness",
];

const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    goal: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setGoalOpen(false);
    }
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoalSelect = (goal) => {
    setFormData((prev) => ({
      ...prev,
      goal,
    }));

    setGoalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createConsultation(formData);
      toast.success("Free consultation request submitted! Coach Rajiv will contact you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        goal: "",
        message: "",
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Consultation form error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit consultation. Please WhatsApp Rajiv directly at +91 99968 89494."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="consultation-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="consultation-modal">

        {/* LEFT PANEL */}
        <aside className="consultation-sidebar">

          <div className="consultation-sidebar-top">

            <div className="consultation-brand">
              <div className="consultation-brand-badge">
                <img
                  src="/images/logo.jpg"
                  alt="Aurafit by Rajiv"
                  className="consultation-brand-img"
                />
              </div>
              <div className="consultation-brand-text">
                <span className="consultation-brand-name">
                  AURA<span className="consultation-brand-accent">FIT</span>
                </span>
                <span className="consultation-brand-sub">BY RAJIV</span>
              </div>
            </div>

            <div className="consultation-kicker">
              <span></span>
              PRIVATE COACHING
            </div>

          </div>


          <div className="consultation-sidebar-content">

            <h2>
              YOUR NEXT
              <br />
              LEVEL STARTS
              <br />
              <strong>HERE.</strong>
            </h2>

            <p>
              Tell us where you are today and where you want
              to be. We’ll help you understand the right
              training, nutrition and lifestyle approach.
            </p>


            <div className="consultation-points">

              <div className="consultation-point">
                <span>
                  <Check size={14} />
                </span>

                <div>
                  <strong>Goal Assessment</strong>
                  <p>
                    Understand your current level, challenges
                    and target.
                  </p>
                </div>
              </div>


              <div className="consultation-point">
                <span>
                  <Check size={14} />
                </span>

                <div>
                  <strong>Personalized Direction</strong>
                  <p>
                    No generic plans. Coaching based around
                    your lifestyle.
                  </p>
                </div>
              </div>


              <div className="consultation-point">
                <span>
                  <Check size={14} />
                </span>

                <div>
                  <strong>Expert Consultation</strong>
                  <p>
                    Get clarity on the right path before you
                    begin.
                  </p>
                </div>
              </div>

            </div>

          </div>


          <div className="consultation-sidebar-bottom">

            <div className="consultation-location">
              <MapPin size={15} />
              Bahadurgarh, Haryana
            </div>

            <span className="consultation-sidebar-line"></span>

            <p>
              AURAFIT • PERFORMANCE • STRENGTH
            </p>

          </div>

        </aside>


        {/* RIGHT PANEL */}
        <section className="consultation-form-panel">

          <button
            type="button"
            className="consultation-close"
            onClick={onClose}
            aria-label="Close consultation form"
          >
            <X size={21} />
          </button>


          <div className="consultation-form-inner">

            <div className="consultation-heading">

              <div className="consultation-heading-icon">
                <Dumbbell size={18} />
              </div>

              <span>
                FREE CONSULTATION
              </span>

              <h3>
                Start your transformation
              </h3>

              <p>
                Complete the form and coach Rajiv will contact
                you to discuss your personalized coaching roadmap.
              </p>

            </div>


            <form
              className="consultation-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}
              <div className="consultation-field">

                <label htmlFor="consultation-name">
                  Full Name
                </label>

                <div className="consultation-input">

                  <User size={17} />

                  <input
                    id="consultation-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* PHONE */}
              <div className="consultation-field">

                <label htmlFor="consultation-phone">
                  Phone Number
                </label>

                <div className="consultation-input">

                  <Phone size={17} />

                  <input
                    id="consultation-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* EMAIL */}
              <div className="consultation-field consultation-full">

                <label htmlFor="consultation-email">
                  Email Address
                </label>

                <div className="consultation-input">

                  <Mail size={17} />

                  <input
                    id="consultation-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* CUSTOM GOAL SELECT */}
              <div className="consultation-field consultation-full">

                <label>
                  Primary Goal
                </label>

                <div className="consultation-select-wrap">

                  <button
                    type="button"
                    className={`consultation-select ${
                      goalOpen ? "active" : ""
                    }`}
                    onClick={() =>
                      setGoalOpen((prev) => !prev)
                    }
                  >

                    <div className="consultation-select-left">
                      <Target size={17} />

                      <span
                        className={
                          formData.goal
                            ? "selected"
                            : ""
                        }
                      >
                        {formData.goal ||
                          "Choose your primary goal"}
                      </span>
                    </div>

                    <span className="consultation-select-arrow">
                      ↓
                    </span>

                  </button>


                  {goalOpen && (
                    <div className="consultation-options">

                      {goals.map((goal) => (
                        <button
                          type="button"
                          key={goal}
                          className={`consultation-option ${
                            formData.goal === goal
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            handleGoalSelect(goal)
                          }
                        >
                          <span>
                            {goal}
                          </span>

                          {formData.goal === goal && (
                            <Check size={16} />
                          )}
                        </button>
                      ))}

                    </div>
                  )}

                </div>

              </div>


              {/* MESSAGE */}
              <div className="consultation-field consultation-full">

                <label htmlFor="consultation-message">
                  Tell us about your goal
                </label>

                <div className="consultation-input consultation-textarea">

                  <MessageSquare size={17} />

                  <textarea
                    id="consultation-message"
                    name="message"
                    placeholder="Tell us about your current fitness level, challenges and what you want to achieve..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                  />

                </div>

              </div>


              {/* SUBMIT */}
              <div className="consultation-full">

                <button
                  type="submit"
                  className="consultation-submit"
                  disabled={isSubmitting}
                  style={isSubmitting ? { opacity: 0.7, cursor: "not-allowed" } : {}}
                >

                  <span>
                    {isSubmitting ? "Submitting..." : "Book Free Consultation"}
                  </span>

                  <span className="consultation-submit-icon">
                    {isSubmitting ? (
                      <Loader2 size={19} className="animate-spin" />
                    ) : (
                      <ArrowUpRight size={19} />
                    )}
                  </span>

                </button>


                <p className="consultation-privacy">
                  Your information is securely encrypted and will only
                  be used by Aurafit to contact you about coaching.
                </p>

              </div>

            </form>

          </div>

        </section>

      </div>
    </div>
  );
};

export default ConsultationModal;