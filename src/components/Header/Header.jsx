import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import "./Header.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Transformations", href: "#transformations" },
  { label: "Videos", href: "#videos" },
  { label: "Contact", href: "#contact" },
];

const Header = ({ onConsultationOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavigation = (href) => {
    setMenuOpen(false);

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleConsultationOpen = () => {
    setMenuOpen(false);

    if (onConsultationOpen) {
      onConsultationOpen();
    }
  };

  return (
    <>
      <header
        className={`main-header ${
          scrolled ? "header-scrolled" : ""
        }`}
      >
        <div className="header-container">

          {/* Logo */}
          <button
            className="header-logo"
            onClick={() => handleNavigation("#home")}
            aria-label="Aurafit by Rajiv - Home"
            type="button"
          >
            <div className="header-logo-badge">
              <img
                src="/images/logo.jpg"
                alt="Aurafit by Rajiv"
                className="header-logo-img"
              />
            </div>

            <div className="header-logo-text">
              <span className="logo-main">
                AURA<span className="logo-accent">FIT</span>
              </span>
              <span className="logo-sub">BY RAJIV</span>
            </div>
          </button>


          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    className="nav-link"
                    onClick={() =>
                      handleNavigation(link.href)
                    }
                    type="button"
                  >
                    <span>
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>


          {/* Right Actions */}
          <div className="header-actions">

            {/* Consultation CTA */}
            <button
              className="header-cta"
              onClick={handleConsultationOpen}
              type="button"
            >
              <span>
                Start Your Journey
              </span>

              <span className="header-cta-icon">
                <ArrowUpRight
                  size={18}
                  strokeWidth={2}
                />
              </span>
            </button>


            {/* Mobile Toggle */}
            <button
              className={`menu-toggle ${
                menuOpen ? "active" : ""
              }`}
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={menuOpen}
              type="button"
            >
              {menuOpen ? (
                <X
                  size={26}
                  strokeWidth={1.8}
                />
              ) : (
                <Menu
                  size={27}
                  strokeWidth={1.8}
                />
              )}
            </button>

          </div>

        </div>
      </header>


      {/* Mobile Menu */}
      <AnimatePresence>

        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              clipPath:
                "inset(0 0 100% 0)",
            }}
            animate={{
              clipPath:
                "inset(0 0 0% 0)",
            }}
            exit={{
              clipPath:
                "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
          >

            <div className="mobile-menu-inner">

              {/* Mobile Navigation */}
              <nav className="mobile-nav">

                {navLinks.map(
                  (link, index) => (
                    <motion.button
                      key={link.label}
                      className="mobile-nav-link"
                      onClick={() =>
                        handleNavigation(
                          link.href
                        )
                      }
                      type="button"
                      initial={{
                        opacity: 0,
                        y: 35,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay:
                          0.12 +
                          index * 0.06,
                      }}
                    >
                      <span className="mobile-link-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="mobile-link-text">
                        {link.label}
                      </span>

                      <ArrowUpRight
                        className="mobile-link-arrow"
                        size={25}
                        strokeWidth={1.5}
                      />

                    </motion.button>
                  )
                )}

              </nav>


              {/* Mobile Bottom */}
              <motion.div
                className="mobile-menu-bottom"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.55,
                }}
              >

                <p>
                  Aurafit by Rajiv • Fitness &amp; Strength Coaching
                </p>


                <button
                  onClick={
                    handleConsultationOpen
                  }
                  className="mobile-cta"
                  type="button"
                >
                  Apply For Coaching

                  <ArrowUpRight
                    size={20}
                  />
                </button>

              </motion.div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
};

export default Header;