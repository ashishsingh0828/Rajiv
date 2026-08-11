import {
  ArrowUpRight,
  Check,
  Dumbbell,
  HeartPulse,
  Salad,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

import { motion } from "motion/react";

import "./About.css";

const About = ({ onConsultationOpen }) => {
  const pillars = [
    {
      icon: Dumbbell,
      title: "Training",
      text: "Smart, structured workouts that match your current level, schedule and long-term goal.",
    },
    {
      icon: Salad,
      title: "Nutrition",
      text: "Simple nutrition guidance you can actually follow without turning your life upside down.",
    },
    {
      icon: HeartPulse,
      title: "Lifestyle",
      text: "Better recovery, sleep, movement and habits that support consistent progress.",
    },
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-shell">

        {/* INTRO */}
        <div className="about-intro">

          <motion.div
            className="about-kicker"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <span></span>
            MEET RAJIV
          </motion.div>

          <div className="about-intro-grid">

            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              COACHING THAT
              <br />
              WORKS WITH
              <span> REAL LIFE.</span>
            </motion.h2>

            <motion.div
              className="about-intro-copy"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.08,
              }}
            >
              <p>
                You do not need another extreme plan that works for two weeks
                and disappears from your routine.
              </p>

              <p>
                Rajiv focuses on helping people train better, eat smarter and
                build habits they can actually maintain — without making
                fitness feel like a full-time job.
              </p>
            </motion.div>

          </div>

        </div>


        {/* EDITORIAL MAIN AREA */}
        <div className="about-editorial">

          {/* VISUAL */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="about-main-image">
              <img
                src="/images/rajiv.jpg"
                alt="Rajiv fitness coach"
              />

              <div className="about-main-image-overlay"></div>

              <div className="about-image-badge">
                <BadgeCheck size={17} />

                <div>
                  <span>PERSONAL COACHING</span>
                  <strong>Built Around You</strong>
                </div>
              </div>
            </div>


            <motion.div
              className="about-secondary-image"
              initial={{ opacity: 0, y: 35, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.18,
              }}
            >
              <img
                src="/assets/images/about/rajiv-training.jpg"
                alt="Rajiv training"
              />

              <div className="about-secondary-caption">
                <span>CONSISTENCY</span>
                <strong>OVER EXTREMES</strong>
              </div>
            </motion.div>


            <div className="about-visual-word">
              RAJIV
            </div>

          </motion.div>


          {/* CONTENT */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.85,
              delay: 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            <div className="about-mini-heading">
              <Sparkles size={16} />
              RAJIV'S APPROACH
            </div>

            <h3>
              NO CRASH DIETS.
              <br />
              NO RANDOM WORKOUTS.
              <br />
              <span>JUST A BETTER SYSTEM.</span>
            </h3>

            <p className="about-lead">
              The aim is simple: help you become stronger, healthier and more
              confident while still being able to enjoy your normal life.
            </p>

            <div className="about-checks">

              <div>
                <span>
                  <Check size={14} />
                </span>
                Plans adjusted to your ability, routine and progress
              </div>

              <div>
                <span>
                  <Check size={14} />
                </span>
                Practical nutrition instead of unrealistic restrictions
              </div>

              <div>
                <span>
                  <Check size={14} />
                </span>
                Regular review and changes when your body needs them
              </div>

              <div>
                <span>
                  <Check size={14} />
                </span>
                Focus on consistency, recovery and sustainable habits
              </div>

            </div>


            <div className="about-quote">
              <span className="about-quote-mark">
                “
              </span>

              <p>
                The best fitness plan is the one you can keep following when
                life gets busy.
              </p>

              <span className="about-quote-author">
                — Rajiv
              </span>
            </div>


            <button
              type="button"
              className="about-cta"
              onClick={onConsultationOpen}
            >
              <span>Talk To Rajiv</span>

              <span className="about-cta-icon">
                <ArrowUpRight size={18} />
              </span>
            </button>

          </motion.div>

        </div>


        {/* CREDIBILITY BAND */}
        <motion.div
          className="about-credibility"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="about-credibility-item">
            <strong>1:1</strong>
            <span>Personal Guidance</span>
          </div>

          <div className="about-credibility-item">
            <strong>360°</strong>
            <span>Training + Nutrition + Lifestyle</span>
          </div>

          <div className="about-credibility-item">
            <strong>100%</strong>
            <span>Individual Approach</span>
          </div>

          <div className="about-credibility-item">
            <strong>Online</strong>
            <span>Coaching Available</span>
          </div>
        </motion.div>


        {/* THREE PILLARS */}
        <div className="about-pillars">

          {pillars.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className="about-pillar"
                initial={{
                  opacity: 0,
                  y: 28,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
              >
                <div className="about-pillar-top">

                  <span className="about-pillar-number">
                    0{index + 1}
                  </span>

                  <span className="about-pillar-icon">
                    <Icon size={19} />
                  </span>

                </div>

                <h4>
                  {item.title}
                </h4>

                <p>
                  {item.text}
                </p>

              </motion.article>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default About;