import { memo } from "react";
import { motion } from "framer-motion";
import HeroWrapper from "./HeroWrapper";
import { Link } from "react-router-dom";

const HeroSection = memo(() => {
  return (
    <HeroWrapper bg="tw-bg-gradient-to-br tw-from-slate-950 tw-via-indigo-850 tw-to-purple-950">

      {/* Background effects */}
      <div className="tw-absolute tw-inset-0 tw-bg-grid-white/5 tw-bg-[size:20px_20px]" />
      <div className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-h-px tw-bg-gradient-to-r tw-from-transparent tw-via-white/30 tw-to-transparent" />

      <div className="tw-relative tw-max-w-7xl tw-mx-auto tw-w-full tw-h-full tw-flex tw-items-center tw-px-4">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-5 tw-gap-8 lg:tw-gap-14 tw-items-center tw-w-full">

          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:tw-col-span-3 tw-text-white">

            <span className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-sm tw-text-sm tw-font-medium tw-mb-6">
              <span className="tw-w-2 tw-h-2 tw-bg-emerald-400 tw-rounded-full tw-animate-pulse" />
              People First • Enterprise Solutions
            </span>

            <h2 className="tw-text-3xl sm:tw-text-3xl md:tw-text-4xl lg:tw-text-4xl tw-font-bold tw-leading-tight tw-text-white">
              Expert Training. Reliable Manpower. Proven Consulting
            </h2>

            <p className="tw-mt-6 tw-text-lg tw-text-blue-100 tw-max-w-2xl">
              Holistically procrastinate mission-critical convergence with reliable
              customer service. Assertively underwhelm idea-sharing for impactful solutions.
            </p>

            <div className="tw-mt-8">
              <Link
                to="/contact-us"
                className="tw-inline-flex tw-items-center tw-bg-gradient-to-r tw-from-pink-500 tw-to-rose-500 hover:tw-from-pink-600 hover:tw-to-rose-600 tw-text-white tw-px-8 tw-py-3 tw-rounded-xl tw-font-semibold tw-shadow-lg hover:tw-shadow-xl tw-transition"
              >
                Get Start Now
              </Link>
            </div>

            {/* Optional stats (like AI slide) */}
          <div className="
  tw-flex 
  tw-justify-between 
  tw-items-center 
  tw-mt-8 
  tw-text-center
  sm:tw-gap-8
">
  <Stat value="10K+" label="Students Trained" />
  <Stat value="500+" label="Enterprise Clients" />
  <Stat value="8+" label="Years Experience" />
</div>
          </div>

          {/* ================= RIGHT VISUAL SYSTEM ================= */}
          <div className="lg:tw-col-span-2 tw-relative tw-mt-8 lg:tw-mt-0">

            <div className="tw-relative tw-z-10 tw-h-[360px] tw-flex tw-items-center tw-justify-center">

              {/* Center Main Image */}
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                src={`${process.env.PUBLIC_URL}/img/hero-single-img-1.svg`}
                alt="hero"
                className="tw-w-[240px] tw-max-w-full tw-z-20"
              />

              {/* Floating Small Image 1 */}
              <FloatingImage
                src={`${process.env.PUBLIC_URL}/img/hero-animation-01.svg`}
                top="12%"
                left="10%"
                width="100px"
              />

              {/* Floating Small Image 2 */}
              <FloatingImage
                src={`${process.env.PUBLIC_URL}/img/hero-animation-01.svg`}
                bottom="14%"
                right="12%"
                width="80px"
              />

              {/* Glow effect */}
              <div className="tw-absolute tw-w-72 tw-h-72 tw-bg-pink-500/20 tw-rounded-full tw-blur-3xl"></div>
            </div>

            {/* Extra floating glows */}
            <div className="tw-absolute tw-top-4 tw-right-4 tw-w-20 tw-h-20 tw-bg-cyan-500/20 tw-rounded-full tw-blur-xl"></div>
            <div className="tw-absolute tw-bottom-4 tw-left-4 tw-w-16 tw-h-16 tw-bg-purple-500/20 tw-rounded-full tw-blur-xl"></div>
          </div>

        </div>
      </div>
    </HeroWrapper>
  );
});

export default HeroSection;

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
const FloatingImage = ({ src, width, ...style }) => (
  <motion.img
    src={src}
    style={{ width, ...style }}
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className="tw-absolute tw-opacity-80"
    alt=""
  />
);