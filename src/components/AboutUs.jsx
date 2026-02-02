import { motion } from "framer-motion";
import {
  FaRocket,
  FaUsers,
  FaBrain,
  FaShieldAlt,
  FaChartLine,
  FaGlobe,
  FaHandshake,
  FaCloud,
  FaGraduationCap,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AboutUsLottie from "./lottie/AboutUsLottie";

const stats = [
  { value: "200+", label: "Happy Clients", icon: <FaHandshake /> },
  { value: "500+", label: "Projects Delivered", icon: <FaChartLine /> },
  { value: "50+", label: "Expert Team", icon: <FaUsers /> },
  { value: "98%", label: "Client Satisfaction", icon: <FaShieldAlt /> },
];

const differentiators = [
  {
    icon: <FaRocket />,
    title: "Execution Focused",
    desc: "We turn ideas into production-ready digital products.",
  },
  {
    icon: <FaCloud />,
    title: "Scalable Architecture",
    desc: "Built to grow with your business from day one.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Talent + Technology",
    desc: "Training, manpower, and solutions under one roof.",
  },
];

const AboutUs = () => {
  return (
    <div className="tw-bg-white tw-text-slate-800">

      {/* ================= HERO ================= */}
      <section
        className="hero-section gradient-overlay tw-relative tw-py-24 md:tw-py-32"
        style={{
          background: "url('/img/header-bg-5.jpg') center / cover no-repeat",
        }}
      >
        {/* Decorative Shape */}
        <div
          className="hero-bottom-shape-two"
          style={{
            background: "url('/img/hero-bottom-shape.svg') no-repeat bottom center",
          }}
        />

        <div className="tw-relative tw-max-w-5xl tw-mx-auto tw-text-center tw-px-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tw-text-3xl md:tw-text-4xl tw-font-extrabold tw-text-white"
          >
            About DCM Technologies
          </motion.h1>

          <p className="tw-mt-4 tw-text-lg tw-text-slate-200">
            Technology, Talent & Transformation — all under one roof.
          </p>

          <Link to="/contact-us" className="btn accent-solid-btn tw-mt-6 inline-block">
            Contact Us
          </Link>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="tw-py-24">
        <div className="tw-max-w-6xl tw-mx-auto tw-grid lg:tw-grid-cols-2 tw-gap-16 tw-px-4 tw-items-center">

          <div>
            <h2 className="tw-text-3xl tw-font-bold tw-mb-4">
              Who We Are
            </h2>
            <p className="tw-text-slate-600">
              We are a technology-driven company delivering IT services, manpower
              solutions, enterprise software, AI platforms, and professional training.
            </p>
            <p className="tw-mt-4 tw-text-slate-600">
              From startups to enterprises, we help organizations scale faster with
              modern technology and skilled talent.
            </p>
          </div>

          {/* Lottie */}
          <div className="tw-flex tw-justify-center lg:tw-justify-end">
            <div className="tw-max-w-sm md:tw-max-w-md">
              <AboutUsLottie />
            </div>
          </div>

        </div>
      </section>

      {/* ================= DIFFERENTIATORS ================= */}
      <section className="tw-bg-slate-50 tw-py-24">
        <div className="tw-max-w-6xl tw-mx-auto tw-px-4">
          <h2 className="tw-text-center tw-text-3xl tw-font-bold tw-mb-12">
            What Makes Us Different
          </h2>

          <div className="tw-grid md:tw-grid-cols-3 tw-gap-8">
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="tw-bg-white tw-border tw-rounded-xl tw-p-8 tw-text-center hover:tw-shadow-lg tw-transition"
              >
                <div className="tw-text-3xl tw-text-indigo-600 tw-mb-4 tw-flex tw-justify-center">
                  {d.icon}
                </div>
                <h4 className="tw-font-semibold tw-mb-2">{d.title}</h4>
                <p className="tw-text-slate-600">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="tw-py-20">
        <div className="tw-max-w-6xl tw-mx-auto tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-8 tw-px-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="tw-text-center"
            >
              <div className="tw-text-3xl tw-text-blue-600 tw-mb-2 tw-flex tw-justify-center">
                {s.icon}
              </div>
              <h3 className="tw-text-3xl tw-font-bold">{s.value}</h3>
              <p className="tw-text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= NAVY CTA ================= */}
      <section className="tw-bg-[#0b1b3a] tw-text-white tw-py-24">
        <div className="tw-max-w-4xl tw-mx-auto tw-text-center tw-px-4">
          <h2 className="tw-text-3xl tw-font-bold">
            Ready to Build Something Great?
          </h2>
          <p className="tw-mt-4 tw-text-slate-300">
            Let’s transform your ideas into scalable digital solutions.
          </p>

          <div className="tw-mt-6 tw-flex tw-justify-center tw-gap-4">
            <Link to="/contact-us" className="btn accent-solid-btn">
              Contact Us
            </Link>
            <Link to="/services" className="btn outline-white-btn">
              View Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
