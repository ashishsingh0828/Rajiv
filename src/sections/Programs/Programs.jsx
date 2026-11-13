import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Crown,
  Dumbbell,
  MapPin,
  Monitor,
  Star,
  Zap,
} from "lucide-react";

import { motion } from "motion/react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Programs.css";


/*
|--------------------------------------------------------------------------
| TEMPORARY PROGRAM DATA
|--------------------------------------------------------------------------
|
| Later this array will be replaced with backend/API data.
|
| Example:
|
| const { data: programs = [] } = useQuery({
|   queryKey: ["programs"],
|   queryFn: getPrograms,
| });
|
|--------------------------------------------------------------------------
*/

const programData = [
  {
    id: 1,
    slug: "online-starter",
    mode: "online",
    icon: "monitor",

    name: "Starter",
    subtitle: "Start with the right structure",

    oldPrice: 1999,
    price: 999,
    billingText: "/ month",

    badge: "Great for beginners",

    features: [
      "Personal workout plan",
      "Nutrition guidance",
      "Monthly progress review",
      "Online coach support",
    ],

    popular: false,
    locationRequired: false,
    active: true,
  },

  {
    id: 2,
    slug: "online-pro",
    mode: "online",
    icon: "zap",

    name: "Pro Coaching",
    subtitle: "Closer guidance for consistent progress",

    oldPrice: 3999,
    price: 2499,
    billingText: "/ month",

    badge: "Most Popular",

    features: [
      "Custom workout plan",
      "Personal nutrition guidance",
      "Weekly progress reviews",
      "Regular plan adjustments",
      "Priority online support",
    ],

    popular: true,
    locationRequired: false,
    active: true,
  },

  {
    id: 3,
    slug: "offline-personal",
    mode: "offline",
    icon: "dumbbell",

    name: "Personal Training",
    subtitle: "Train directly with coach Rajiv in Bahadurgarh",

    oldPrice: 6999,
    price: 4999,
    billingText: "/ month",

    badge: "In-Person",

    features: [
      "Personal training sessions",
      "Exercise form correction",
      "Direct coach supervision",
      "Nutrition guidance",
      "Progress tracking",
    ],

    popular: false,
    locationRequired: true,
    active: true,
  },

  {
    id: 4,
    slug: "offline-elite",
    mode: "offline",
    icon: "crown",

    name: "Elite Coaching",
    subtitle: "Complete one-to-one transformation support",

    oldPrice: 9999,
    price: 7499,
    billingText: "/ month",

    badge: "Premium 1-to-1",

    features: [
      "Advanced personal training",
      "Custom nutrition strategy",
      "Lifestyle guidance",
      "Frequent progress reviews",
      "Priority scheduling",
    ],

    popular: false,
    locationRequired: true,
    active: true,
  },
];


const iconMap = {
  monitor: Monitor,
  zap: Zap,
  dumbbell: Dumbbell,
  crown: Crown,
};


const Programs = ({ onBookProgram, onConsultationOpen }) => {
  const programs = programData.filter(
    (program) => program.active
  );


  const handleBook = (program) => {
    /*
    |--------------------------------------------------------------------------
    | BOOKING MODAL
    |--------------------------------------------------------------------------
    |
    | Booking modal receives complete program object:
    |
    | program.id
    | program.name
    | program.price
    | program.mode
    | program.slug
    |
    | Later Razorpay will use the selected program ID and backend-created
    | order amount — never a price typed manually in the frontend.
    |
    */

    if (onBookProgram) {
      onBookProgram(program);
    }
  };


  return (
    <section
      className="programs-section"
      id="programs"
    >
      <div className="programs-container">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="programs-header">

          <motion.div
            className="programs-eyebrow"
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <span></span>

            AURAFIT COACHING PLANS
          </motion.div>


          <div className="programs-heading-row">

            <motion.div
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
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h2>
                FIND YOUR
                <br />

                <span>
                  RIGHT PLAN.
                </span>
              </h2>
            </motion.div>


            <motion.div
              className="programs-header-right"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.08,
              }}
            >
              <p>
                Start with Aurafit online coaching from anywhere, or train with Rajiv
                in person in Bahadurgarh. Choose the tier that matches your goals.
              </p>


              <div className="programs-slider-controls">

                <button
                  type="button"
                  className="programs-slider-prev"
                  aria-label="Previous program"
                >
                  <ArrowLeft
                    size={18}
                    strokeWidth={1.7}
                  />
                </button>


                <button
                  type="button"
                  className="programs-slider-next"
                  aria-label="Next program"
                >
                  <ArrowRight
                    size={18}
                    strokeWidth={1.7}
                  />
                </button>

              </div>

            </motion.div>

          </div>

        </div>


        {/* =====================================================
            SLIDER
        ====================================================== */}

        <motion.div
          className="programs-slider-wrap"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <Swiper
            modules={[
              Navigation,
              Pagination,
              A11y,
            ]}
            className="programs-swiper"

            spaceBetween={16}

            slidesPerView={1.08}

            navigation={{
              prevEl: ".programs-slider-prev",
              nextEl: ".programs-slider-next",
            }}

            pagination={{
              clickable: true,
              dynamicBullets: false,
            }}

            watchOverflow={true}

            breakpoints={{
              520: {
                slidesPerView: 1.35,
                spaceBetween: 16,
              },

              700: {
                slidesPerView: 2,
                spaceBetween: 16,
              },

              1024: {
                slidesPerView: 2.65,
                spaceBetween: 18,
              },

              1280: {
                slidesPerView: 3.15,
                spaceBetween: 18,
              },
            }}
          >

            {programs.map((program) => {
              const Icon =
                iconMap[program.icon] || Dumbbell;

              const isOffline =
                program.mode === "offline";


              return (
                <SwiperSlide
                  key={program.id}
                  className="program-slide"
                >

                  <article
                    className={`program-card ${
                      program.popular
                        ? "program-card-popular"
                        : ""
                    }`}
                  >

                    {/* POPULAR */}
                    {program.popular && (
                      <div className="program-popular-bar">

                        <Star
                          size={11}
                          fill="currentColor"
                        />

                        MOST POPULAR

                      </div>
                    )}


                    <div className="program-card-body">

                      {/* TOP ROW */}
                      <div className="program-card-top">

                        <span className="program-card-icon">

                          <Icon
                            size={20}
                            strokeWidth={1.7}
                          />

                        </span>


                        <span
                          className={`program-mode-badge ${
                            isOffline
                              ? "offline"
                              : "online"
                          }`}
                        >

                          {isOffline && (
                            <MapPin
                              size={11}
                              strokeWidth={1.8}
                            />
                          )}

                          {isOffline
                            ? "Offline"
                            : "Online"}

                        </span>

                      </div>


                      {/* TITLE
                          Fixed-height area so every price begins
                          at exactly the same vertical position.
                      */}

                      <div className="program-card-heading">

                        <span className="program-card-label">
                          {program.badge}
                        </span>


                        <h3>
                          {program.name}
                        </h3>


                        <p>
                          {program.subtitle}
                        </p>

                      </div>


                      {/* PRICE */}

                      <div className="program-price-area">

                        <span className="program-old-price">
                          ₹
                          {program.oldPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>


                        <div className="program-price-row">

                          <strong>
                            ₹
                            {program.price.toLocaleString(
                              "en-IN"
                            )}
                          </strong>


                          <span>
                            {program.billingText}
                          </span>

                        </div>

                      </div>


                      {/* SEPARATOR */}

                      <div className="program-divider"></div>


                      {/* FEATURES
                          Same min-height across every card.
                      */}

                      <div className="program-features">

                        {program.features.map(
                          (feature) => (
                            <div
                              className="program-feature"
                              key={feature}
                            >

                              <span className="program-check">

                                <Check
                                  size={11}
                                  strokeWidth={2.4}
                                />

                              </span>


                              <span>
                                {feature}
                              </span>

                            </div>
                          )
                        )}

                      </div>


                      {/* 
                          Every card HAS this slot.

                          Online:
                          displays online note.

                          Offline:
                          displays location requirement.

                          Same height = perfect alignment.
                      */}

                      <div className="program-info-slot">

                        {isOffline ? (

                          <div className="program-location-info">

                            <MapPin
                              size={15}
                              strokeWidth={1.8}
                            />


                            <div>

                              <strong>
                                Visit required
                              </strong>

                              <p>
                                Training sessions are held
                                in Bahadurgarh, Haryana.
                              </p>

                            </div>

                          </div>

                        ) : (

                          <div className="program-online-info">

                            <Monitor
                              size={15}
                              strokeWidth={1.8}
                            />


                            <div>

                              <strong>
                                Train from anywhere
                              </strong>

                              <p>
                                Follow your plan from your
                                preferred gym or location.
                              </p>

                            </div>

                          </div>

                        )}

                      </div>


                      {/* BUTTON */}

                      <button
                        type="button"
                        className="program-book-button"
                        onClick={() =>
                          handleBook(program)
                        }
                      >

                        <span>
                          Book Program
                        </span>


                        <span className="program-book-arrow">

                          <ArrowUpRight
                            size={17}
                            strokeWidth={1.8}
                          />

                        </span>

                      </button>

                    </div>

                  </article>

                </SwiperSlide>
              );
            })}

          </Swiper>

        </motion.div>


        {/* =====================================================
            FOOTER CTA
        ====================================================== */}

        <motion.div
          className="programs-footer"
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div>

            <span>
              NEED HELP CHOOSING?
            </span>

            <p>
              Not sure which plan matches your goals and schedule?
              Book a free assessment with Rajiv.
            </p>

          </div>


          <button
            type="button"
            onClick={onConsultationOpen}
            className="programs-help-button"
          >

            Free Consultation

            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
            />

          </button>

        </motion.div>

      </div>
    </section>
  );
};


export default Programs;