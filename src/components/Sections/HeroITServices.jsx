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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
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
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const HeroITServices = memo(() => {
  return (
    <section className=" tw-relative tw-overflow-hidden tw-py-28 tw-bg-gradient-to-br tw-from-slate-950 tw-via-indigo-950 tw-to-purple-950">
      {/* Grid overlay */}
      <div className="tw-absolute tw-inset-0 tw-bg-grid-white/5 tw-bg-[size:24px_24px]" />

      {/* Glow blobs */}
      <div className="tw-absolute tw-top-[-100px] tw-left-[-100px] tw-w-[300px] tw-h-[300px] tw-bg-cyan-500/20 tw-rounded-full tw-blur-3xl" />
      <div className="tw-absolute tw-bottom-[-120px] tw-right-[-120px] tw-w-[320px] tw-h-[320px] tw-bg-purple-500/20 tw-rounded-full tw-blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="tw-relative tw-max-w-7xl tw-mx-auto tw-px-4"
      >
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-14 tw-items-center">
          {/* LEFT CONTENT */}
          <div className="tw-text-white">
            <motion.span
              variants={item}
              className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-bg-white/10 tw-backdrop-blur tw-text-sm tw-font-medium tw-mb-6"
            >
              <span className="tw-w-2 tw-h-2 tw-bg-emerald-400 tw-rounded-full tw-animate-pulse" />
              IT Services • Cloud • AI Solutions
            </motion.span>

            <motion.h1
              variants={item}
              className="tw-text-2xl md:tw-text-4xl lg:tw-text-5xl tw-font-bold tw-leading-tight tw-text-white"
            >
              Scalable{" "}
              <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-cyan-400 tw-to-emerald-400">
                IT Services & Digital
              </span>{" "}
              Solutions
            </motion.h1>

            <motion.p
              variants={item}
              className="tw-mt-6 tw-text-lg tw-text-blue-100 tw-max-w-xl"
            >
              We design, develop, and scale modern web apps, mobile platforms,
              cloud infrastructure, and AI-powered systems for growing
              businesses.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="tw-flex tw-flex-wrap tw-gap-4 tw-mt-10"
            >
              <Link
                to="/services"
                className="tw-bg-gradient-to-r tw-from-cyan-500 tw-to-emerald-500 hover:tw-from-cyan-600 hover:tw-to-emerald-600 tw-text-white tw-px-8 tw-py-3 tw-rounded-xl tw-font-semibold tw-shadow-lg hover:tw-shadow-xl tw-transition-all"
              >
                Explore Services
              </Link>

              <Link
                to="/contact"
                className="tw-bg-white/10 hover:tw-bg-white/20 tw-text-white tw-border tw-border-white/30 tw-px-8 tw-py-3 tw-rounded-xl tw-font-semibold tw-backdrop-blur tw-transition-all"
              >
                Get Free Consultation
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="tw-flex tw-gap-10 tw-mt-12"
            >
              <Stat value="120+" label="Projects Delivered" />
              <Stat value="99.9%" label="Uptime" />
              <Stat value="8+ Years" label="Experience" />
            </motion.div>
          </div>

          {/* RIGHT SERVICES */}
          <motion.div
            variants={container}
            className="tw-grid tw-grid-cols-2 tw-gap-6"
          >
            <ServiceCard
              icon={<FaCode />}
              title="Web Development"
              desc="High-performance React, Next.js & backend systems"
            />
            <ServiceCard
              icon={<FaMobileAlt />}
              title="App Development"
              desc="Scalable Android & iOS applications"
            />
            <ServiceCard
              icon={<FaCloud />}
              title="Cloud Solutions"
              desc="AWS & GCP architecture, DevOps & scaling"
            />
            <ServiceCard
              icon={<FaBrain />}
              title="Data Science & AI"
              desc="ML models, analytics & automation"
            />

            {/* Floating cloud icons */}
            <motion.div
              {...float}
              className="tw-col-span-2 tw-flex tw-justify-center tw-gap-6 tw-mt-4 tw-text-4xl tw-text-white/70"
            >
              <FaAws />
              <FaGoogle />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

export default HeroITServices;

/* ------------------ Components ------------------ */

const Stat = ({ value, label }) => (
  <div>
    <div className="tw-text-3xl tw-font-bold tw-text-cyan-300">{value}</div>
    <div className="tw-text-sm tw-text-blue-200">{label}</div>
  </div>
);

const ServiceCard = ({ icon, title, desc }) => (
  <motion.div
    variants={item}
    whileHover={{ y: -8, scale: 1.02 }}
    className="tw-bg-white/10 tw-backdrop-blur-lg tw-border tw-border-white/20 tw-rounded-2xl tw-p-6 tw-text-white tw-shadow-lg"
  >
    <div className="tw-text-3xl tw-text-white">{icon}</div>
    <h3 className="tw-mt-4 tw-text-lg tw-font-semibold tw-text-white">{title}</h3>
    <p className="tw-mt-2 tw-text-sm tw-text-blue-100">{desc}</p>
  </motion.div>
);
