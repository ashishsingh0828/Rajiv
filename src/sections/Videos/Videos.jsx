import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  X,
  Dumbbell,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Videos.css";

const videoData = [
  {
    id: 1,
    title: "Rajiv Heavy Deadlift Session — Form & Cue Breakdown",
    category: "Strength Training",
    duration: "00:48",
    thumbnail: "/images/videos/rajiv-video-1.jpg",
    videoSource: "/videos/rajiv-training-1.mp4",
    featured: true,
    description: "Watch Rajiv execute a heavy deadlift platform session at Cult.sport gym with proper hip hinge, lat engagement, and foot rooting.",
  },
  {
    id: 2,
    title: "Platform Setup, Grip & Starting Pull Position",
    category: "Lifting Technique",
    duration: "00:30",
    thumbnail: "/images/videos/rajiv-video-2.jpg",
    videoSource: "/videos/rajiv-training-2.mp4",
    featured: true,
    description: "Close-up breakdown of bar path, foot placement, and breathing techniques used in Rajiv's 1:1 in-person coaching in Bahadurgarh.",
  },
  {
    id: 3,
    title: "Progressive Overload Without Lower Back Strain",
    category: "Injury Prevention",
    duration: "00:48",
    thumbnail: "/images/transformations/rajiv-strength-before.jpg",
    videoSource: "/videos/rajiv-training-1.mp4",
    featured: false,
    description: "How to safely scale weight and volume week over week without risking joint fatigue or spine rounding.",
  },
  {
    id: 4,
    title: "Indian Diet & Macro Adjustments for Real Strength",
    category: "Nutrition Coaching",
    duration: "00:30",
    thumbnail: "/images/transformations/rajiv-deadlift-after.jpg",
    videoSource: "/videos/rajiv-training-2.mp4",
    featured: false,
    description: "Simple, sustainable nutrition guidance built around everyday North Indian home meals, curd, paneer, and balanced calories.",
  },
];

const Videos = ({ onConsultationOpen }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  const handleOpenVideo = (video) => {
    setActiveVideo(video);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section className="videos-section" id="videos">
      <div className="videos-container">
        {/* HEADER */}
        <div className="videos-header">
          <motion.div
            className="videos-kicker"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span></span>
            WATCH RAJIV IN ACTION
          </motion.div>

          <div className="videos-header-row">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              REAL TRAINING.
              <br />
              <span>REAL TECHNIQUE.</span>
            </motion.h2>

            <motion.div
              className="videos-header-side"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.08,
              }}
            >
              <p>
                Watch real gym sessions and lifting breakdowns with coach Rajiv
                Dalal in Bahadurgarh — built to help you train with purpose,
                confidence and zero guesswork.
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
        >
          <Swiper
            className="videos-swiper"
            modules={[Navigation, Pagination, A11y]}
            navigation={{
              prevEl: ".videos-prev",
              nextEl: ".videos-next",
            }}
            pagination={{ clickable: true }}
            spaceBetween={18}
            slidesPerView={1.08}
            breakpoints={{
              520: { slidesPerView: 1.5 },
              760: { slidesPerView: 2.2 },
              1100: { slidesPerView: 3.1 },
            }}
          >
            {videoData.map((video) => (
              <SwiperSlide key={video.id} className="video-slide">
                <article
                  className={`video-card ${
                    video.featured ? "video-card-featured" : ""
                  }`}
                  onClick={() => handleOpenVideo(video)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="video-thumb">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="video-overlay"></div>

                    {video.featured && (
                      <span className="video-featured">FEATURED</span>
                    )}

                    <span className="video-duration">{video.duration}</span>

                    <button
                      type="button"
                      className="video-play"
                      aria-label={`Play ${video.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenVideo(video);
                      }}
                    >
                      <Play size={21} fill="currentColor" />
                    </button>
                  </div>

                  <div className="video-content">
                    <span className="video-category">{video.category}</span>
                    <h3>{video.title}</h3>

                    <div className="video-card-bottom">
                      <span>Watch Session</span>
                      <ArrowUpRight size={17} />
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
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="videos-bottom-copy">
            <span>WANT DIRECT 1-TO-1 COACHING?</span>
            <h3>
              VIDEOS SHOW TECHNIQUE.
              <strong> COACHING TRANSFORMS YOU.</strong>
            </h3>
          </div>

          <button type="button" onClick={onConsultationOpen}>
            Book Free Consultation
            <span>
              <ArrowUpRight size={18} />
            </span>
          </button>
        </motion.div>
      </div>

      {/* VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseVideo}
          >
            <motion.div
              className="video-modal-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="video-modal-close"
                onClick={handleCloseVideo}
                aria-label="Close video player"
              >
                <X size={20} />
              </button>

              <div className="video-modal-player-wrap">
                <video
                  src={activeVideo.videoSource}
                  controls
                  autoPlay
                  playsInline
                  className="video-modal-player"
                />
              </div>

              <div className="video-modal-details">
                <div className="video-modal-meta">
                  <span className="video-modal-category">
                    <Dumbbell size={13} />
                    {activeVideo.category}
                  </span>
                  <span className="video-modal-duration">
                    {activeVideo.duration}
                  </span>
                </div>
                <h3>{activeVideo.title}</h3>
                <p>{activeVideo.description}</p>

                <div className="video-modal-cta-row">
                  <button
                    type="button"
                    className="video-modal-cta"
                    onClick={() => {
                      handleCloseVideo();
                      if (onConsultationOpen) onConsultationOpen();
                    }}
                  >
                    <span>Train Directly With Rajiv</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Videos;
