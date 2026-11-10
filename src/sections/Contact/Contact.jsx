import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Loader2,
} from "lucide-react";

import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendContactMessage } from "../../services/api";

import "./Contact.css";

const Contact = ({ onConsultationOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await sendContactMessage(formData);
      toast.success("Thank you! Your message has been sent to Rajiv. We will reply shortly!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to send message. Please WhatsApp or call Rajiv directly at +91 99968 89494."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="contact-section"
      id="contact"
    >
      <div className="contact-container">

        {/* HEADER */}
        <div className="contact-header">

          <motion.div
            className="contact-kicker"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span></span>
            GET IN TOUCH
          </motion.div>

          <div className="contact-heading-row">

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              HAVE A GOAL?
              <br />
              <span>LET'S TALK.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.08,
              }}
            >
              Whether you want to start online coaching,
              train in person, or simply ask a question,
              reach out and we’ll help you understand the next step.
            </motion.p>

          </div>

        </div>


        {/* MAIN */}
        <div className="contact-grid">

          {/* LEFT INFO */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            <div className="contact-info-top">

              <span className="contact-small-label">
                DIRECT CONTACT
              </span>

              <h3>
                READY WHEN
                <br />
                <span>YOU ARE.</span>
              </h3>

              <p>
                You can contact Rajiv directly or use the form
                to send your details.
              </p>

            </div>


            <div className="contact-details">

              <a
                href="tel:+919996889494"
                className="contact-item"
              >
                <span className="contact-item-icon">
                  <Phone size={19} />
                </span>

                <div>
                  <span>Phone</span>
                  <strong>+91 99968 89494</strong>
                </div>

                <ArrowUpRight size={17} />
              </a>


              <a
                href="tel:+918899771471"
                className="contact-item"
              >
                <span className="contact-item-icon">
                  <Phone size={19} />
                </span>

                <div>
                  <span>Alternate</span>
                  <strong>+91 88997 71471</strong>
                </div>

                <ArrowUpRight size={17} />
              </a>


              <a
                href="mailto:rajeevdalal1@gmail.com"
                className="contact-item"
              >
                <span className="contact-item-icon">
                  <Mail size={19} />
                </span>

                <div>
                  <span>Email</span>
                  <strong>rajeevdalal1@gmail.com</strong>
                </div>

                <ArrowUpRight size={17} />
              </a>


              <div className="contact-item contact-location">
                <span className="contact-item-icon">
                  <MapPin size={19} />
                </span>

                <div>
                  <span>Location</span>
                  <strong>Bahadurgarh, Haryana</strong>
                </div>
              </div>

            </div>


            <button
              type="button"
              className="contact-consultation"
              onClick={onConsultationOpen}
            >
              <MessageCircle size={18} />

              <div>
                <span>Not sure where to begin?</span>
                <strong>Book a Free Consultation</strong>
              </div>

              <ArrowUpRight size={18} />
            </button>

          </motion.div>


          {/* FORM */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            <div className="contact-form-heading">
              <span>SEND A MESSAGE</span>

              <h3>
                Tell us what you need
              </h3>

              <p>
                Leave your details and a short message.
              </p>
            </div>


            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="contact-field">
                <label htmlFor="contact-name">
                  Full Name
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="contact-field">
                <label htmlFor="contact-phone">
                  Phone
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="contact-field contact-full">
                <label htmlFor="contact-email">
                  Email
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="contact-field contact-full">
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell us about your goal or question..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="contact-full">
                <button
                  type="submit"
                  className="contact-submit"
                  disabled={isSubmitting}
                  style={isSubmitting ? { opacity: 0.7, cursor: "not-allowed" } : {}}
                >
                  <span>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>

                  <span>
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </span>
                </button>
              </div>

            </form>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;