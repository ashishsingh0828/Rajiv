import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Video,
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

import "./Videos.css";


/*
|--------------------------------------------------------------------------
| TEMP DATA
|--------------------------------------------------------------------------
| Later:
| GET /api/videos
|--------------------------------------------------------------------------
*/

const videoData = [
  {
    id: 1,
    title: "Stop Training Without A Plan",
    category: "Training",
    duration: "00:42",
    thumbnail:
      "/assets/images/videos/video-1.jpg",
    videoUrl: "#",
    featured: true,
  },

  {
    id: 2,
    title: "Simple Nutrition That Actually Works",
    category: "Nutrition",
    duration: "00:36",
    thumbnail:
      "/assets/images/videos/video-2.jpg",
    videoUrl: "#",
    featured: false,
  },

  {
    id: 3,
    title: "Why Progress Feels Slow",
    category: "Mindset",
    duration: "00:51",
    thumbnail:
      "/assets/images/videos/video-3.jpg",
    videoUrl: "#",
    featured: false,
  },

  {
    id: 4,
    title: "3 Mistakes Holding Back Your Results",
    category: "Fitness",
    duration: "00:47",
    thumbnail:
      "/assets/images/videos/video-4.jpg",
    videoUrl: "#",
    featured: false,
  },
];


const Videos = ({
  onConsultationOpen,
}) => {
  return (
    <section
      className="videos-section"
      id="videos"
    >
      <div className="videos-container">

        {/* HEADER */}
        <div className="videos-header">

          <motion.div
            className="videos-kicker"
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
            <span></span>
            WATCH & LEARN
          </motion.div>


          <div className="videos-header-row">

            <motion.h2
              initial={{
                opacity: 0,
                y: 28,
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
              TRAIN SMARTER.
              <br />

              <span>
                LEARN BETTER.
              </span>
            </motion.h2>


            <motion.div
              className="videos-header-side"
              initial={{
                opacity: 0,
                y: 18,
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
                Quick training, nutrition and lifestyle
                insights from Rajiv — built to help you
                make better decisions inside and outside
                the gym.
              </p>


              <div className="videos-nav">

                <button
                  type="button"
                  className="videos-prev"
                  aria-label="Previous video"
                >
                  <ArrowLeft size={19} />
                </button>

                <button
                  type="button"
                  className="videos-next"
                  aria-label="Next video"
                >
                  <ArrowRight size={19} />
                </button>

              </div>

            </motion.div>

          </div>

        </div>


        {/* SLIDER */}
        <motion.div
          className="videos-slider-wrap"
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
            amount: 0.1,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <Swiper
            className="videos-swiper"
            modules={[
              Navigation,
              Pagination,
              A11y,
            ]}
            navigation={{
              prevEl: ".videos-prev",
              nextEl: ".videos-next",
            }}
            pagination={{
              clickable: true,
            }}
            spaceBetween={18}
            slidesPerView={1.08}
            breakpoints={{
              520: {
                slidesPerView: 1.5,
              },

              760: {
                slidesPerView: 2.2,
              },

              1100: {
                slidesPerView: 3.1,
              },
            }}
          >

            {videoData.map((video) => (
              <SwiperSlide
                key={video.id}
                className="video-slide"
              >
                <article
                  className={`video-card ${
                    video.featured
                      ? "video-card-featured"
                      : ""
                  }`}
                >

                  <div className="video-thumb">

                    <img
                      src={video.thumbnail}
                      alt={video.title}
                    />

                    <div className="video-overlay"></div>


                    {video.featured && (
                      <span className="video-featured">
                        FEATURED
                      </span>
                    )}


                    <span className="video-duration">
                      {video.duration}
                    </span>


                    <a
                      href={video.videoUrl}
                      className="video-play"
                      aria-label={`Play ${video.title}`}
                    >
                      <Play
                        size={21}
                        fill="currentColor"
                      />
                    </a>

                  </div>


                  <div className="video-content">

                    <span className="video-category">
                      {video.category}
                    </span>

                    <h3>
                      {video.title}
                    </h3>

                    <div className="video-card-bottom">

                      <span>
                        Watch Video
                      </span>

                      <ArrowUpRight
                        size={17}
                      />

                    </div>

                  </div>

                </article>
              </SwiperSlide>
            ))}

          </Swiper>

        </motion.div>


        {/* BOTTOM CTA */}
        <motion.div
          className="videos-bottom"
          initial={{
            opacity: 0,
            y: 18,
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

          <div className="videos-bottom-copy">

            <span>
              WANT PERSONAL GUIDANCE?
            </span>

            <h3>
              CONTENT HELPS.
              <strong> COACHING CHANGES THINGS.</strong>
            </h3>

          </div>


          <button
            type="button"
            onClick={onConsultationOpen}
          >
            Book Consultation

            <span>
              <ArrowUpRight size={18} />
            </span>
          </button>

        </motion.div>

      </div>
    </section>
  );
};


export default Videos;