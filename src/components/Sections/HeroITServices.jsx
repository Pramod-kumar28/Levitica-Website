import { Link } from "react-router-dom";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaBrain,
  FaAws,
  FaGoogle,
} from "react-icons/fa";
import HeroWrapper from "./HeroWrapper";

const HeroITServices = memo(() => {
  return (
    <HeroWrapper bg="tw-bg-gradient-to-br tw-from-slate-950 tw-via-indigo-950 tw-to-purple-950">

      {/* Background Effects */}
      <div className="tw-absolute tw-inset-0 tw-bg-grid-white/5 tw-bg-[size:20px_20px]" />
      <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-white/30 tw-to-transparent" />

      <div className="tw-relative tw-max-w-7xl tw-mx-auto tw-w-full tw-h-full tw-flex tw-items-center tw-px-4">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-5 tw-gap-8 lg:tw-gap-12 tw-items-center tw-w-full">

          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:tw-col-span-3 tw-text-white">

            <span className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-sm tw-text-sm tw-font-medium tw-mb-6">
              <span className="tw-w-2 tw-h-2 tw-bg-emerald-400 tw-rounded-full tw-animate-pulse " />
              IT Services • Cloud Solutions
            </span>

            <h1 className="tw-text-3xl sm:tw-text-3xl md:tw-text-4xl lg:tw-text-5xl tw-font-bold tw-leading-tight tw-text-white">
              Scalable{" "}
              <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-cyan-400 tw-to-emerald-400">
                IT Infrastructure
              </span>{" "}
              & Digital Systems
            </h1>

            <p className="tw-mt-6 tw-text-lg tw-text-blue-100 tw-max-w-2xl">
              We architect, develop, and scale secure enterprise solutions —
              from modern web apps to cloud-native systems and AI-powered platforms.
            </p>

            {/* CTA */}
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 sm:tw-gap-4 tw-mt-6 sm:tw-mt-8">
              <Link
                to="/services"
                className="
                tw-inline-flex
               tw-items-center
               tw-justify-center
               tw-gap-2
               tw-bg-gradient-to-r
               tw-from-cyan-500
               tw-to-emerald-500
               hover:tw-from-cyan-600
               hover:tw-to-emerald-600
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
             ">

                Explore Services
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
      tw-text-white
      hover:tw-text-white
      tw-border
      tw-border-white/30
      tw-backdrop-blur
      tw-text-sm sm:tw-text-base
      tw-px-5 sm:tw-px-8
      tw-py-2.5 sm:tw-py-3
      tw-rounded-lg sm:tw-rounded-xl
      tw-font-medium sm:tw-font-semibold
      tw-transition-all
      tw-duration-300
    "
              >
                Get Consultation
              </Link>
            </div>
            {/* Stats */}
            <div className="
            tw-flex 
            tw-justify-between 
            tw-items-center 
            tw-mt-8 
            tw-text-center
            sm:tw-gap-8">
              <Stat value="120+" label="Projects Delivered" />
              <Stat value="99.9%" label="System Uptime" />
              <Stat value="8+ Years" label="Experience" />

            </div>
          </div>

          {/* ================= RIGHT VISUAL SYSTEM ================= */}
          <div className="lg:tw-col-span-2 tw-relative tw-mt-8 lg:tw-mt-0">

            <div className="tw-relative tw-z-10 tw-h-[360px] tw-flex tw-items-center tw-justify-center">

              {/* Center Core */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="tw-relative tw-z-20 tw-w-36 tw-h-36 tw-rounded-3xl tw-bg-white/10 tw-backdrop-blur-lg tw-border tw-border-white/20 tw-flex tw-items-center tw-justify-center tw-text-cyan-300 tw-text-5xl tw-shadow-xl"
              >
                <FaCode />
              </motion.div>

              {/* Floating Icons */}
              <FloatingITIcon icon={<FaMobileAlt />} top="12%" left="10%" />
              <FloatingITIcon icon={<FaCloud />} top="20%" right="8%" />
              <FloatingITIcon icon={<FaBrain />} bottom="14%" left="12%" />
              <FloatingITIcon icon={<FaAws />} bottom="10%" right="14%" />

              {/* Glow */}
              <div className="tw-absolute tw-w-72 tw-h-72 tw-bg-cyan-500/20 tw-rounded-full tw-blur-3xl"></div>
            </div>

            {/* Extra floating accent */}
            <div className="tw-absolute tw-top-4 tw-right-4 tw-w-20 tw-h-20 tw-bg-cyan-500/20 tw-rounded-full tw-blur-xl"></div>
            <div className="tw-absolute tw-bottom-4 tw-left-4 tw-w-16 tw-h-16 tw-bg-purple-500/20 tw-rounded-full tw-blur-xl"></div>
          </div>

        </div>
      </div>
    </HeroWrapper>
  );
});

export default HeroITServices;

/* ---------------- Helpers ---------------- */

const Stat = ({ value, label }) => (
  <div className="tw-flex-1">
    <div className="tw-text-lg sm:tw-text-2xl lg:tw-text-3xl tw-font-bold tw-text-cyan-300">
      {value}
    </div>
    <div className="tw-text-xs sm:tw-text-sm tw-text-blue-200">
      {label}
    </div>
  </div>
);

const FloatingITIcon = ({ icon, ...style }) => (
  <motion.div
    style={style}
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="tw-absolute tw-w-14 tw-h-14 tw-rounded-xl tw-bg-white/10 tw-backdrop-blur tw-border tw-border-white/20 tw-flex tw-items-center tw-justify-center tw-text-cyan-300 tw-shadow-lg"
  >
    {icon}
  </motion.div>
);