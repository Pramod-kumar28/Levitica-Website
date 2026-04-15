import { memo } from "react";
import { motion } from "framer-motion";
import HeroWrapper from "./HeroWrapper";
import { Link } from "react-router-dom";

const HeroSection = memo(() => {
  return (
    <HeroWrapper bg="bg-gradient-to-br from-slate-950 via-indigo-850 to-purple-950">

      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto w-full h-full flex items-center px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 items-center w-full">

          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-3 text-white">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              People First • Enterprise Solutions
            </span>

            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight text-white">
              Expert Training. Reliable Manpower. Proven Consulting
            </h2>

            <p className="mt-6 text-lg text-blue-100 max-w-2xl">
              Holistically procrastinate mission-critical convergence with reliable
              customer service. Assertively underwhelm idea-sharing for impactful solutions.
            </p>

            <div className="mt-8">
              <Link
                to="/contact-us"
                className="inline-flex items-center bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
              >
                Get Start Now
              </Link>
            </div>

            {/* Optional stats (like AI slide) */}
            <div className="
  flex 
  justify-between 
  items-center 
  mt-8 
  text-center
  sm:gap-8
">
              <Stat value="10K+" label="Students Trained" />
              <Stat value="500+" label="Enterprise Clients" />
              <Stat value="8+" label="Years Experience" />
            </div>
          </div>

          {/* ================= RIGHT VISUAL SYSTEM ================= */}
          <div className="lg:col-span-2 relative mt-8 lg:mt-0">

            <div className="relative z-10 h-[360px] flex items-center justify-center">

              {/* Center Main Image */}
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                src={`${import.meta.env.PUBLIC_URL}/img/hero-single-img-1.svg`}
                alt="hero"
                className="w-[240px] max-w-full z-20"
              />

              {/* Floating Small Image 1 */}
              <FloatingImage
                src={`${import.meta.env.PUBLIC_URL}/img/hero-animation-01.svg`}
                top="12%"
                left="10%"
                width="100px"
              />

              {/* Floating Small Image 2 */}
              <FloatingImage
                src={`${import.meta.env.PUBLIC_URL}/img/hero-animation-01.svg`}
                bottom="14%"
                right="12%"
                width="80px"
              />

              {/* Glow effect */}
              <div className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Extra floating glows */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
          </div>

        </div>
      </div>
    </HeroWrapper>
  );
});

export default HeroSection;

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
const FloatingImage = ({ src, width, ...style }) => (
  <motion.img
    src={src}
    style={{ width, ...style }}
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="absolute opacity-80"
    alt=""
  />
);