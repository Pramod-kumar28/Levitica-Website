import { Link } from "react-router-dom";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaBrain,
  FaAws,
 
} from "react-icons/fa";
import HeroWrapper from "./HeroWrapper";

const HeroITServices = memo(() => {
  return (
    <HeroWrapper bg="bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto w-full h-full flex items-center px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center w-full">

          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-3 text-white">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse " />
              IT Services • Cloud Solutions
            </span>

            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Scalable{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                IT Infrastructure
              </span>{" "}
              & Digital Systems
            </h1>

            <p className="mt-6 text-lg text-blue-100 max-w-2xl">
              We architect, develop, and scale secure enterprise solutions
              from modern web apps to cloud-native systems and AI-powered platforms.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Link
                to="/services"
                className="
                inline-flex
               items-center
               justify-center
               gap-2
               bg-gradient-to-r
               from-cyan-500
               to-emerald-500
               hover:from-cyan-600
               hover:to-emerald-600
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
             ">

                Explore Services
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
      text-white
      hover:text-white
      border
      border-white/30
      backdrop-blur
      text-sm sm:text-base
      px-5 sm:px-8
      py-2.5 sm:py-3
      rounded-lg sm:rounded-xl
      font-medium sm:font-semibold
      transition-all
      duration-300
    "
              >
                Get Consultation
              </Link>
            </div>
            {/* Stats */}
            <div className="
            flex 
            justify-between 
            items-center 
            mt-8 
            text-center
            sm:gap-8">
              <Stat value="120+" label="Projects Delivered" />
              <Stat value="99.9%" label="System Uptime" />
              <Stat value="8+ Years" label="Experience" />

            </div>
          </div>

          {/* ================= RIGHT VISUAL SYSTEM ================= */}
          <div className="lg:col-span-2 relative mt-8 lg:mt-0">

            <div className="relative z-10 h-[360px] flex items-center justify-center">

              {/* Center Core */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-20 w-36 h-36 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-cyan-300 text-5xl shadow-xl"
              >
                <FaCode />
              </motion.div>

              {/* Floating Icons */}
              <FloatingITIcon icon={<FaMobileAlt />} top="12%" left="10%" />
              <FloatingITIcon icon={<FaCloud />} top="20%" right="8%" />
              <FloatingITIcon icon={<FaBrain />} bottom="14%" left="12%" />
              <FloatingITIcon icon={<FaAws />} bottom="10%" right="14%" />

              {/* Glow */}
              <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Extra floating accent */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
          </div>

        </div>
      </div>
    </HeroWrapper>
  );
});

export default HeroITServices;

/* ---------------- Helpers ---------------- */

const Stat = ({ value, label }) => (
  <div className="flex-1">
    <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-cyan-300">
      {value}
    </div>
    <div className="text-xs sm:text-sm text-blue-200">
      {label}
    </div>
  </div>
);

const FloatingITIcon = ({ icon, ...style }) => (
  <motion.div
    style={style}
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="absolute w-14 h-14 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-cyan-300 shadow-lg"
  >
    {icon}
  </motion.div>
);