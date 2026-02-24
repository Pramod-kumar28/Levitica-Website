import { Link } from "react-router-dom";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiDatabase,
  FiActivity,
  FiCloud,
  FiTrendingUp,
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

const HeroSlideAI = memo(() => {
  return (
    <HeroWrapper bg="tw-bg-gradient-to-br tw-from-slate-950 tw-via-indigo-950 tw-to-purple-950">

      {/* Background glow */}
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
              <span className="tw-w-2 tw-h-2 tw-bg-emerald-400 tw-rounded-full tw-animate-pulse" />
              AI • Data • Automation
            </motion.span>

            <motion.h1
              variants={item}
              className="tw-text-4xl  md:tw-text-4xl lg:tw-text-5xl tw-font-bold tw-text-white"
            >
              Build{" "}
              <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-cyan-400 tw-to-emerald-400">
                Intelligent
              </span>{" "}
              Systems
            </motion.h1>

            <motion.p
              variants={item}
              className="tw-mt-6 tw-text-lg tw-text-blue-100 tw-max-w-2xl"
            >
              Transform your business with machine learning, analytics, and automation.
              We build AI solutions that drive smarter decisions and accelerate growth.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 sm:tw-gap-4 tw-mt-6 sm:tw-mt-8"
            >
              <Link
                to="/training"
                className="
                  tw-inline-flex
                  tw-items-center
                  tw-justify-center
                  tw-bg-gradient-to-r
                  tw-from-cyan-500
                  tw-to-emerald-500
                  hover:tw-from-cyan-600
                  hover:tw-to-emerald-600
                  tw-text-white
                  tw-text-sm sm:tw-text-base
                  tw-px-5 sm:tw-px-8
                  tw-py-2.5 sm:tw-py-3
                  tw-rounded-lg sm:tw-rounded-xl
                  tw-font-medium sm:tw-font-semibold
                  tw-shadow-md sm:tw-shadow-lg
                  hover:tw-shadow-xl
                  tw-transition-all
                "
              >
                Start Learning AI
              </Link>

              <Link
                to="/contact"
                className="
                  tw-inline-flex
                  tw-items-center
                  tw-justify-center
                  tw-bg-white/10
                  hover:tw-bg-white/20
                  tw-text-white
                  tw-border
                  tw-border-white/30
                  tw-text-sm sm:tw-text-base
                  tw-px-5 sm:tw-px-8
                  tw-py-2.5 sm:tw-py-3
                  tw-rounded-lg sm:tw-rounded-xl
                  tw-font-medium sm:tw-font-semibold
                  tw-transition-all
                "
              >
                Book Consultation
              </Link>
            </motion.div>

            {/* Stats (same layout style as marketing features grid) */}
            <motion.div
              variants={item}
              className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-mt-12"
            >
              <Stat value="98%" label="Accuracy Rate" />
              <Stat value="50+" label="AI Projects" />
              <Stat value="24/7" label="Model Monitoring" />
            </motion.div>

          </div>

          {/* ================= RIGHT ================= */}
          <motion.div
            variants={container}
            className="lg:tw-col-span-2 tw-relative tw-h-[360px] tw-flex tw-items-center tw-justify-center"
          >
            {/* Center core */}
            <motion.div
              variants={item}
              className="tw-relative tw-z-10 tw-w-36 tw-h-36 tw-rounded-3xl tw-bg-white/10 tw-backdrop-blur tw-border tw-border-white/20 tw-flex tw-items-center tw-justify-center tw-text-cyan-300 tw-text-5xl tw-shadow-xl"
            >
              <FiCpu />
            </motion.div>

            {/* Floating icons */}
            <FloatingIcon icon={<FiDatabase />} top="10%" left="15%" />
            <FloatingIcon icon={<FiCloud />} top="20%" right="10%" />
            <FloatingIcon icon={<FiTrendingUp />} bottom="15%" left="12%" />
            <FloatingIcon icon={<FiActivity />} bottom="10%" right="15%" />

            {/* Glow */}
            <div className="tw-absolute tw-w-72 tw-h-72 tw-bg-cyan-500/20 tw-rounded-full tw-blur-3xl" />
          </motion.div>

        </div>
      </motion.div>
    </HeroWrapper>
  );
});

/* Helpers */

const Stat = ({ value, label }) => (
  <div>
    <div className="tw-text-2xl tw-font-bold tw-text-cyan-300">{value}</div>
    <div className="tw-text-sm tw-text-blue-200">{label}</div>
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

export default HeroSlideAI;