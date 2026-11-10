import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  MoveHorizontal,
  TrendingDown,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { motion } from "motion/react";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Transformations.css";


/* =========================================================
   TEMP DATA
   Later replace with API data
========================================================= */

const transformationData = [
  {
    id: 1,
    name: "Amit Sharma",
    location: "Bahadurgarh",
    goal: "Fat Loss & Conditioning",
    duration: "16 Weeks",
    result: "-12 KG",
    resultType: "loss",

    beforeImage:
      "/images/transformations/rajiv-strength-before.jpg",

    afterImage:
      "/images/transformations/rajiv-strength-after.jpg",

    description:
      "Went from struggling with deadlift setups and back pain to pulling with flawless form and shedding 12 kg.",

    featured: true,
  },

  {
    id: 2,
    name: "Rahul Dalal",
    location: "Rohtak",
    goal: "Heavy Strength & Hypertrophy",
    duration: "20 Weeks",
    result: "+6 KG Muscle",
    resultType: "gain",

    beforeImage:
      "/images/transformations/rajiv-deadlift-before.jpg",

    afterImage:
      "/images/transformations/rajiv-deadlift-after.jpg",

    description:
      "Focused compound lifting, progressive overload and structured nutrition helped him add 6kg lean mass.",

    featured: false,
  },

  {
    id: 3,
    name: "Karan Dahiya",
    location: "Bahadurgarh, Haryana",
    goal: "Body Recomposition",
    duration: "18 Weeks",
    result: "-9 KG",
    resultType: "loss",

    beforeImage:
      "/images/transformations/rajiv-strength-before.jpg",

    afterImage:
      "/images/transformations/rajiv-deadlift-after.jpg",

    description:
      "A consistent 1:1 training routine with Rajiv in Bahadurgarh made him leaner, confident, and injury-free.",

    featured: false,
  },

  {
    id: 4,
    name: "Manish Sehrawat",
    location: "Delhi NCR",
    goal: "Sustainable Fat Loss",
    duration: "24 Weeks",
    result: "-15 KG",
    resultType: "loss",

    beforeImage:
      "/images/transformations/rajiv-deadlift-before.jpg",

    afterImage:
      "/images/transformations/rajiv-strength-after.jpg",

    description:
      "No crash diets or hours of mindless cardio. Just heavy smart lifting and realistic Indian home meals.",

    featured: false,
  },
];


const Transformations = ({
  onConsultationOpen,
}) => {
  return (
    <section
      className="transformations-section"
      id="transformations"
    >
      <div className="transformations-container">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="transformations-header">

          <motion.div
            className="transformations-kicker"
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
          >
            <span className="transformations-kicker-line" />

            CLIENT RESULTS
          </motion.div>


          <div className="transformations-header-row">

            <motion.div
              className="transformations-title"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h2>
                PROGRESS YOU
                <br />

                <span>
                  CAN SEE.
                </span>
              </h2>
            </motion.div>


            <motion.div
              className="transformations-header-info"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.08,
              }}
            >
              <p>
                Real people. Real work. Real progress.
                Drag across each transformation to compare
                the journey from where they started to
                where consistency took them.
              </p>


              <div className="transformations-navigation">

                <button
                  type="button"
                  className="transformations-prev"
                  aria-label="Previous transformation"
                >
                  <ArrowLeft
                    size={20}
                    strokeWidth={1.7}
                  />
                </button>


                <button
                  type="button"
                  className="transformations-next"
                  aria-label="Next transformation"
                >
                  <ArrowRight
                    size={20}
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
          className="transformations-slider-wrapper"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <Swiper
            className="transformations-swiper"

            modules={[
              Navigation,
              Pagination,
              A11y,
            ]}

            navigation={{
              prevEl: ".transformations-prev",
              nextEl: ".transformations-next",
            }}

            pagination={{
              clickable: true,
            }}

            watchOverflow={true}

            spaceBetween={22}

            slidesPerView={1}

            breakpoints={{
              600: {
                slidesPerView: 1.45,
                spaceBetween: 20,
              },

              850: {
                slidesPerView: 2,
                spaceBetween: 22,
              },

              1200: {
                slidesPerView: 2.55,
                spaceBetween: 22,
              },

              1450: {
                slidesPerView: 3,
                spaceBetween: 22,
              },
            }}
          >

            {transformationData.map(
              (item, index) => {

                const ResultIcon =
                  item.resultType === "gain"
                    ? TrendingUp
                    : TrendingDown;


                return (
                  <SwiperSlide
                    key={item.id}
                    className="transformation-slide"
                  >

                    <article
                      className={`transformation-card ${
                        item.featured
                          ? "is-featured"
                          : ""
                      }`}
                    >

                      {/* =====================================
                          IMAGE
                      ====================================== */}

                      <div className="transformation-image">

                        <ReactCompareSlider
                          className="transformation-compare"
                          position={50}

                          itemOne={
                            <ReactCompareSliderImage
                              src={item.beforeImage}
                              alt={`${item.name} before transformation`}
                            />
                          }

                          itemTwo={
                            <ReactCompareSliderImage
                              src={item.afterImage}
                              alt={`${item.name} after transformation`}
                            />
                          }
                        />


                        {/* FEATURED */}

                        {item.featured && (
                          <div className="transformation-featured">

                            <Trophy
                              size={14}
                              strokeWidth={1.8}
                            />

                            FEATURED RESULT

                          </div>
                        )}


                        {/* BEFORE */}

                        <div className="transformation-before-badge">

                          <span className="badge-dot" />

                          BEFORE

                        </div>


                        {/* AFTER */}

                        <div className="transformation-after-badge">

                          <span className="badge-dot" />

                          AFTER

                        </div>


                        {/* DRAG INDICATOR */}

                        <div className="transformation-drag-hint">

                          <MoveHorizontal
                            size={15}
                            strokeWidth={1.8}
                          />

                          DRAG TO COMPARE

                        </div>

                      </div>


                      {/* =====================================
                          CONTENT
                      ====================================== */}

                      <div className="transformation-content">

                        {/* NUMBER */}

                        <span className="transformation-number">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>


                        {/* NAME + RESULT */}

                        <div className="transformation-main-info">

                          <div className="transformation-client">

                            <h3>
                              {item.name}
                            </h3>


                            <div className="transformation-location">

                              <MapPin
                                size={14}
                                strokeWidth={1.8}
                              />

                              <span>
                                {item.location}
                              </span>

                            </div>

                          </div>


                          <div className="transformation-result">

                            <span>
                              RESULT
                            </span>

                            <strong>
                              {item.result}
                            </strong>

                          </div>

                        </div>


                        {/* META */}

                        <div className="transformation-details">

                          <div className="transformation-detail">

                            <span className="transformation-detail-icon">

                              <Clock3
                                size={17}
                                strokeWidth={1.7}
                              />

                            </span>


                            <div>

                              <span>
                                DURATION
                              </span>

                              <strong>
                                {item.duration}
                              </strong>

                            </div>

                          </div>


                          <div className="transformation-detail">

                            <span className="transformation-detail-icon">

                              <ResultIcon
                                size={17}
                                strokeWidth={1.7}
                              />

                            </span>


                            <div>

                              <span>
                                FOCUS
                              </span>

                              <strong>
                                {item.goal}
                              </strong>

                            </div>

                          </div>

                        </div>


                        {/* DESCRIPTION */}

                        <p className="transformation-description">
                          {item.description}
                        </p>

                      </div>

                    </article>

                  </SwiperSlide>
                );
              }
            )}

          </Swiper>

        </motion.div>


        {/* =====================================================
            CTA
        ====================================================== */}

        <motion.div
          className="transformations-bottom"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
        >

          <div className="transformations-bottom-copy">

            <span>
              YOUR TURN
            </span>

            <h3>
              READY TO CREATE YOUR
              <strong> OWN RESULT?</strong>
            </h3>

          </div>


          <button
            type="button"
            className="transformations-cta"
            onClick={onConsultationOpen}
          >

            Start Your Journey

            <span>
              <ArrowUpRight
                size={19}
                strokeWidth={1.8}
              />
            </span>

          </button>

        </motion.div>

      </div>
    </section>
  );
};


export default Transformations;