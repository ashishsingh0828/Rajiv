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
              >
                <span>RAJIN</span>
                <i></i>
              </button>

              <p className="footer-description">
                Personalized fitness, nutrition and lifestyle coaching
                designed to help you build strength, improve performance
                and create long-lasting transformation.
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
                Sustainable training. Smart nutrition. Better habits.
                A complete approach designed around your lifestyle.
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
            © {currentYear} Rajin. All Rights Reserved.
          </p>

          <div className="footer-bottom-center">
            <span></span>
            FITNESS • PERFORMANCE • LIFESTYLE
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