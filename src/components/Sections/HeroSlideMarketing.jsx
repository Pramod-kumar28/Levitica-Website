import { Link } from "react-router-dom";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiTrendingUp,
  FiShare2,
  FiBarChart2,
  FiTarget,
  FiUsers,
  FiActivity,
} from "react-icons/fi";
import HeroWrapper from "./HeroWrapper";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const float = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const HeroSlideMarketing = memo(() => {

  return (
    <HeroWrapper bg="tw-bg-gradient-to-br tw-from-slate-950 tw-via-indigo-950 tw-to-purple-950">      {/* background glow */}
      <div className="tw-absolute tw-inset-0 tw-bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] tw-from-white/5 tw-to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="tw-relative tw-max-w-7xl tw-mx-auto tw-w-full tw-h-full tw-flex tw-items-center"
      >
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-5 tw-gap-8 lg:tw-gap-12 tw-items-center tw-w-full">

          {/* ================= LEFT ================= */}
          <div className="lg:tw-col-span-3 tw-text-white">
            <motion.span
              variants={item}
              className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-bg-white/10 tw-backdrop-blur tw-text-sm tw-font-medium tw-mb-6"
            >
              <span className="tw-w-2 tw-h-2 tw-bg-cyan-400 tw-rounded-full tw-animate-pulse" />
              Growth • Branding • Performance
            </motion.span>

            <motion.h1
              variants={item}
              className="tw-text-4xl  md:tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-white "
            >
              Digital Marketing That{" "}
              <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-cyan-400 tw-to-blue-400">
                Scales Fast
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="tw-mt-6 tw-text-lg tw-text-blue-100 tw-max-w-2xl"
            >
              SEO, paid campaigns, analytics, and growth strategies engineered
              to drive traffic, engagement, and measurable ROI.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 sm:tw-gap-4 tw-mt-6 sm:tw-mt-8"
            >
              <Link
                to="/services"
                className="
      tw-group
      tw-inline-flex
      tw-items-center
      tw-justify-center
      tw-gap-2
      tw-bg-gradient-to-r
      tw-from-cyan-500
      tw-to-blue-500
      hover:tw-from-cyan-600
      hover:tw-to-blue-600
      tw-text-white
      hover:tw-text-white
      tw-text-sm sm:tw-text-base
      tw-px-5 sm:tw-px-8
      tw-py-2.5 sm:tw-py-3
      tw-rounded-lg sm:tw-rounded-xl
      tw-font-medium sm:tw-font-semibold
      tw-shadow-md sm:tw-shadow-lg
      hover:tw-shadow-xl
      tw-transition-all
      tw-duration-300
    "
              >
                Explore Services
                <FiArrowRight className="tw-text-base group-hover:tw-translate-x-1 tw-transition" />
              </Link>

              <Link
                to="/contact-us"
                className="
      tw-inline-flex
      tw-items-center
      tw-justify-center
      tw-gap-2
      tw-bg-white/10
      hover:tw-bg-white/20
      tw-backdrop-blur-sm
      tw-text-white
      hover:tw-text-white
      tw-border
      tw-border-white/30
      tw-text-sm sm:tw-text-base
      tw-px-5 sm:tw-px-8
      tw-py-2.5 sm:tw-py-3
      tw-rounded-lg sm:tw-rounded-xl
      tw-font-medium sm:tw-font-semibold
      tw-transition-all
      tw-duration-300
    "
              >
                Contact Us
              </Link>
            </motion.div>

            {/* features */}
            <motion.div
              variants={item}
              className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-mt-12"
            >
              <Feature icon={<FiTrendingUp />} label="SEO Growth" />
              <Feature icon={<FiShare2 />} label="Social Campaigns" />
              <Feature icon={<FiBarChart2 />} label="Analytics" />
            </motion.div>
          </div>

          {/* ================= RIGHT (ANIMATED ICON SYSTEM) ================= */}
          <motion.div
            variants={container}
            className="lg:tw-col-span-2 tw-relative tw-h-[360px] tw-flex tw-items-center tw-justify-center"
          >
            {/* Center core */}
            <motion.div
              variants={item}
              className="tw-relative tw-z-10 tw-w-36 tw-h-36 tw-rounded-3xl tw-bg-white/10 tw-backdrop-blur tw-border tw-border-white/20 tw-flex tw-items-center tw-justify-center tw-text-cyan-300 tw-text-5xl tw-shadow-xl"
            >
              <FiActivity />
            </motion.div>

            {/* Floating icons */}
            <FloatingIcon icon={<FiTarget />} top="10%" left="15%" />
            <FloatingIcon icon={<FiUsers />} top="20%" right="10%" />
            <FloatingIcon icon={<FiTrendingUp />} bottom="15%" left="12%" />
            <FloatingIcon icon={<FiBarChart2 />} bottom="10%" right="15%" />

            {/* glow */}
            <div className="tw-absolute tw-w-72 tw-h-72 tw-bg-cyan-500/20 tw-rounded-full tw-blur-3xl" />
          </motion.div>
        </div>
      </motion.div>
    </HeroWrapper>
  );
});

/* ================= HELPERS ================= */

const Feature = ({ icon, label }) => (
  <div className="tw-flex tw-items-center tw-gap-3">
    <div className="tw-p-2 tw-rounded-lg tw-bg-cyan-500/20 tw-text-cyan-300">
      {icon}
    </div>
    <span className="tw-text-sm tw-text-blue-200">{label}</span>
  </div>
);

const FloatingIcon = ({ icon, ...style }) => (
  <motion.div
    {...float}
    style={style}
    className="tw-absolute tw-w-14 tw-h-14 tw-rounded-xl tw-bg-white/10 tw-backdrop-blur tw-border tw-border-white/20 tw-flex tw-items-center tw-justify-center tw-text-cyan-300 tw-shadow-lg"
  >
    {icon}
  </motion.div>
);

export default HeroSlideMarketing;
