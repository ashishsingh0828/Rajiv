import {
  ArrowUpRight,
  Check,
  Play,
  Star,
} from "lucide-react";

import { motion } from "motion/react";

import "./Hero.css";

const Hero = ({ onConsultationOpen }) => {
  const scrollToTransformations = () => {
    const section = document.querySelector("#transformations");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero-section" id="home">

      {/* BACKGROUND IMAGE */}
      <div className="hero-background">

        <img
          src="/images/rajiv.jpg"
          alt="Rajiv fitness coach"
          className="hero-bg-image"
        />

        <div className="hero-overlay"></div>
        <div className="hero-overlay-bottom"></div>

      </div>


      {/* DECORATIVE SIDE TEXT */}
      <div className="hero-side-label">
        AURAFIT • STRENGTH • LIFESTYLE
      </div>


      <div className="hero-main-container">

        {/* =========================================
            HERO CONTENT
        ========================================== */}
        <div className="hero-copy">

          <motion.div
            className="hero-eyebrow"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
          >
            <span className="hero-eyebrow-dot"></span>
            Aurafit Personal Fitness Coaching
          </motion.div>


          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            GET STRONGER.
            <br />

            <span>
              FEEL BETTER.
            </span>

            <br />

            LIVE BETTER.
          </motion.h1>


          <motion.p
            className="hero-text"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
          >
            Personalized strength training, authentic Indian nutrition, and sustainable habits
            coached directly by Rajiv Dalal in Bahadurgarh &amp; online worldwide.
          </motion.p>


          {/* BENEFIT ROW */}
          <motion.div
            className="hero-mini-points"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.42,
            }}
          >

            <div>
              <Check size={13} />
              1-to-1 Guidance
            </div>

            <div>
              <Check size={13} />
              Flexible Plans
            </div>

            <div>
              <Check size={13} />
              Long-Term Results
            </div>

          </motion.div>


          {/* CTA */}
          <motion.div
            className="hero-buttons"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.5,
            }}
          >

            <button
              type="button"
              className="hero-main-button"
              onClick={onConsultationOpen}
            >
              <span>
                Book a Free Consultation
              </span>

              <span className="hero-button-circle">
                <ArrowUpRight size={20} />
              </span>
            </button>


            <button
              type="button"
              className="hero-watch-button"
              onClick={scrollToTransformations}
            >
              <span className="hero-watch-icon">
                <Play
                  size={14}
                  fill="currentColor"
                />
              </span>

              See Transformations
            </button>

          </motion.div>


          {/* SOCIAL PROOF */}
          <motion.div
            className="hero-proof"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.65,
            }}
          >

            <div className="hero-proof-avatars">

              <span>R</span>
              <span>A</span>
              <span>K</span>

            </div>

            <div className="hero-proof-text">

              <div className="hero-stars">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>

              <p>
                Trusted by 50+ clients working toward
                better health, fat loss and stronger bodies with Aurafit.
              </p>

            </div>

          </motion.div>

        </div>


        {/* =========================================
            RIGHT BOTTOM INFO
        ========================================== */}
        <motion.div
          className="hero-coach-card"
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.58,
          }}
        >

          <div className="hero-coach-line"></div>

          <div className="hero-coach-content">

            <div className="hero-coach-badge-row">
              <img
                src="/images/logo.jpg"
                alt="Aurafit logo"
                className="hero-coach-logo-img"
              />
              <span className="hero-coach-small">
                AURAFIT COACHING
              </span>
            </div>

            <h3>
              RAJIV
            </h3>

            <p>
              Strength. Nutrition.
              Lifestyle.
            </p>

          </div>

        </motion.div>

      </div>


      {/* BOTTOM STRIP */}
      <div className="hero-bottom-strip">

        <div className="hero-bottom-inner">

          <div>
            <span>01</span>
            Fat Loss
          </div>

          <div>
            <span>02</span>
            Muscle Building
          </div>

          <div>
            <span>03</span>
            Strength
          </div>

          <div>
            <span>04</span>
            Lifestyle
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;