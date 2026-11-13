import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import "./Footer.css";

const Footer = ({ onConsultationOpen }) => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (id) => {
    const section = document.querySelector(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="footer">

      {/* TOP CTA */}
      <div className="footer-cta">
        <div className="footer-container">

          <div className="footer-cta-label">
            <span className="footer-label-line"></span>
            READY TO BEGIN?
          </div>

          <div className="footer-cta-row">
            <h2>
              BUILD YOUR
              <span> STRONGEST SELF.</span>
            </h2>

            <button
              className="footer-main-cta"
              onClick={onConsultationOpen}
              type="button"
            >
              <span>Start Your Journey</span>

              <span className="footer-main-cta-icon">
                <ArrowUpRight size={26} strokeWidth={1.7} />
              </span>
            </button>
          </div>

        </div>
      </div>


      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="footer-container">

          <div className="footer-grid">

            {/* BRAND */}
            <div className="footer-brand">

              <button
                className="footer-logo"
                onClick={() => handleScroll("#home")}
                type="button"
                aria-label="Aurafit by Rajiv - Back to top"
              >
                <div className="footer-logo-badge">
                  <img
                    src="/images/logo.jpg"
                    alt="Aurafit by Rajiv"
                    className="footer-logo-img"
                  />
                </div>
                <div className="footer-logo-text">
                  <span className="footer-logo-main">
                    AURA<span className="footer-logo-accent">FIT</span>
                  </span>
                  <span className="footer-logo-sub">BY RAJIV</span>
                </div>
              </button>

              <p className="footer-description">
                <strong>Aurafit by Rajiv Dalal</strong> — Personalized fitness, nutrition and lifestyle coaching
                designed to help you build real strength, improve performance
                and create sustainable habits that work with your routine.
              </p>

              <div className="footer-socials">

                <a
                  href="#"
                  className="footer-social"
                  aria-label="Instagram"
                >
                  <FaInstagram size={19} />
                </a>

                <a
                  href="#"
                  className="footer-social"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={17} />
                </a>

                <a
                  href="#"
                  className="footer-social"
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </a>

              </div>

            </div>


            {/* NAVIGATION */}
            <div className="footer-column">

              <p className="footer-column-title">
                Navigation
              </p>

              <div className="footer-links">

                <button
                  type="button"
                  onClick={() => handleScroll("#home")}
                >
                  Home
                </button>

                <button
                  type="button"
                  onClick={() => handleScroll("#about")}
                >
                  About
                </button>

                <button
                  type="button"
                  onClick={() => handleScroll("#programs")}
                >
                  Programs
                </button>

                <button
                  type="button"
                  onClick={() => handleScroll("#transformations")}
                >
                  Transformations
                </button>

                <button
                  type="button"
                  onClick={() => handleScroll("#videos")}
                >
                  Videos
                </button>

                <button
                  type="button"
                  onClick={() => handleScroll("#contact")}
                >
                  Contact
                </button>

              </div>

            </div>


            {/* CONTACT */}
            <div className="footer-column footer-contact-column">

              <p className="footer-column-title">
                Contact
              </p>

              <div className="footer-contact-item">

                <span className="footer-contact-icon">
                  <MapPin size={18} strokeWidth={1.7} />
                </span>

                <div>
                  <span className="footer-contact-label">
                    Location
                  </span>

                  <p>
                    Bahadurgarh, Haryana
                  </p>
                </div>

              </div>


              <div className="footer-contact-item">

                <span className="footer-contact-icon">
                  <Phone size={18} strokeWidth={1.7} />
                </span>

                <div>
                  <span className="footer-contact-label">
                    Phone
                  </span>

                  <a href="tel:+919996889494">
                    +91 99968 89494
                  </a>

                  <a href="tel:+918899771471">
                    +91 88997 71471
                  </a>
                </div>

              </div>


              <div className="footer-contact-item">

                <span className="footer-contact-icon">
                  <Mail size={18} strokeWidth={1.7} />
                </span>

                <div>
                  <span className="footer-contact-label">
                    Email
                  </span>

                  <a href="mailto:rajeevdalal1@gmail.com">
                    rajeevdalal1@gmail.com
                  </a>
                </div>

              </div>

            </div>


            {/* PHILOSOPHY */}
            <div className="footer-column footer-message">

              <p className="footer-column-title">
                Our Approach
              </p>

              <h3>
                TRAIN
                <br />
                WITH PURPOSE.
              </h3>

              <p>
                Sustainable strength. Smart Indian nutrition. Better habits.
                A complete coaching system designed around your lifestyle by Rajiv Dalal.
              </p>

              <button
                type="button"
                onClick={onConsultationOpen}
                className="footer-text-link"
              >
                Apply for coaching
                <ArrowUpRight size={17} />
              </button>

            </div>

          </div>

        </div>
      </div>


      {/* BOTTOM BAR */}
      <div className="footer-bottom">

        <div className="footer-container footer-bottom-inner">

          <p>
            © {currentYear} Aurafit by Rajiv Dalal. All Rights Reserved.
          </p>

          <div className="footer-bottom-center">
            <span></span>
            AURAFIT • STRENGTH • PERFORMANCE
          </div>

          <button
            type="button"
            onClick={() => handleScroll("#home")}
          >
            Back to top
            <ArrowUpRight size={15} />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;