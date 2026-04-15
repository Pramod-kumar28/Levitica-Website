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
    <HeroWrapper bg="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--gradient-stops))] from-white/5 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-7xl mx-auto w-full h-full flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center w-full">

          {/* ================= LEFT ================= */}
          <div className="lg:col-span-3 text-white">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Growth • Branding • Performance
            </motion.span>

            <motion.h1
              variants={item}
              className="text-4xl  md:text-4xl lg:text-5xl font-bold text-white "
            >
              Digital Marketing That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Scales Fast
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg text-blue-100 max-w-2xl"
            >
              SEO, paid campaigns, analytics, and growth strategies engineered
              to drive traffic, engagement, and measurable ROI.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              <Link
                to="/services"
                className="
      group
      inline-flex
      items-center
      justify-center
      gap-2
      bg-gradient-to-r
      from-cyan-500
      to-blue-500
      hover:from-cyan-600
      hover:to-blue-600
      text-white
      hover:text-white
      text-sm sm:text-base
      px-5 sm:px-8
      py-2.5 sm:py-3
      rounded-lg sm:rounded-xl
      font-medium sm:font-semibold
      shadow-md sm:shadow-lg
      hover:shadow-xl
      transition-all
      duration-300
    "
              >
                Explore Services
                <FiArrowRight className="text-base group-hover:translate-x-1 transition" />
              </Link>

              <Link
                to="/contact-us"
                className="
      inline-flex
      items-center
      justify-center
      gap-2
      bg-white/10
      hover:bg-white/20
      backdrop-blur-sm
      text-white
      hover:text-white
      border
      border-white/30
      text-sm sm:text-base
      px-5 sm:px-8
      py-2.5 sm:py-3
      rounded-lg sm:rounded-xl
      font-medium sm:font-semibold
      transition-all
      duration-300
    "
              >
                Contact Us
              </Link>
            </motion.div>

            {/* features */}
            <motion.div
              variants={item}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
            >
              <Feature icon={<FiTrendingUp />} label="SEO Growth" />
              <Feature icon={<FiShare2 />} label="Social Campaigns" />
              <Feature icon={<FiBarChart2 />} label="Analytics" />
            </motion.div>
          </div>

          {/* ================= RIGHT (ANIMATED ICON SYSTEM) ================= */}
          <motion.div
            variants={container}
            className="lg:col-span-2 relative h-[360px] flex items-center justify-center"
          >
            {/* Center core */}
            <motion.div
              variants={item}
              className="relative z-10 w-36 h-36 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-cyan-300 text-5xl shadow-xl"
            >
              <FiActivity />
            </motion.div>

            {/* Floating icons */}
            <FloatingIcon icon={<FiTarget />} top="10%" left="15%" />
            <FloatingIcon icon={<FiUsers />} top="20%" right="10%" />
            <FloatingIcon icon={<FiTrendingUp />} bottom="15%" left="12%" />
            <FloatingIcon icon={<FiBarChart2 />} bottom="10%" right="15%" />

            {/* glow */}
            <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </motion.div>
    </HeroWrapper>
  );
});

/* ================= HELPERS ================= */

const Feature = ({ icon, label }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
      {icon}
    </div>
    <span className="text-sm text-blue-200">{label}</span>
  </div>
);

const FloatingIcon = ({ icon, ...style }) => (
  <motion.div
    {...float}
    style={style}
    className="absolute w-14 h-14 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-cyan-300 shadow-lg"
  >
    {icon}
  </motion.div>
);

export default HeroSlideMarketing;
