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
  FaLightbulb,
  FaCode,
  FaServer,
  FaMobileAlt,
  FaPaintBrush,
  FaRobot,
  FaNetworkWired,
  FaChalkboardTeacher,
  FaUserTie,
  FaAward,
  FaHeart,
  FaRegClock,
  FaSyncAlt,
  FaSearch,
  FaShieldAlt as FaShieldCheck, // Using FaShieldAlt as alternative
  FaIndustry,
  FaUniversity,
  FaStore,
  FaLeaf,
  FaBalanceScale,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AboutUsLottie from "./lottie/AboutUsLottie";
import ConsultingCTA from "./Sections/CallToActionSection";

const stats = [
  { value: "200+", label: "Happy Clients", icon: <FaHandshake />, color: "tw-text-emerald-500" },
  { value: "500+", label: "Projects Delivered", icon: <FaChartLine />, color: "tw-text-blue-500" },
  { value: "50+", label: "Expert Team", icon: <FaUsers />, color: "tw-text-purple-500" },
  { value: "98%", label: "Client Satisfaction", icon: <FaShieldAlt />, color: "tw-text-amber-500" },
  { value: "24/7", label: "Support", icon: <FaRegClock />, color: "tw-text-red-500" },
  { value: "15+", label: "Industries Served", icon: <FaIndustry />, color: "tw-text-cyan-500" },
];

const differentiators = [
  {
    icon: <FaRocket />,
    title: "Execution Focused",
    desc: "We turn ideas into production-ready digital products.",
    bgColor: "tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50",
    iconColor: "tw-text-blue-600",
  },
  {
    icon: <FaCloud />,
    title: "Scalable Architecture",
    desc: "Built to grow with your business from day one.",
    bgColor: "tw-bg-gradient-to-br tw-from-purple-50 tw-to-pink-50",
    iconColor: "tw-text-purple-600",
  },
  {
    icon: <FaGraduationCap />,
    title: "Talent + Technology",
    desc: "Training, manpower, and solutions under one roof.",
    bgColor: "tw-bg-gradient-to-br tw-from-emerald-50 tw-to-teal-50",
    iconColor: "tw-text-emerald-600",
  },
  {
    icon: <FaSyncAlt />,
    title: "Agile Methodology",
    desc: "Iterative development with continuous feedback loops.",
    bgColor: "tw-bg-gradient-to-br tw-from-amber-50 tw-to-orange-50",
    iconColor: "tw-text-amber-600",
  },
  {
    icon: <FaSearch />,
    title: "Transparent Process",
    desc: "Complete visibility into project progress and costs.",
    bgColor: "tw-bg-gradient-to-br tw-from-rose-50 tw-to-red-50",
    iconColor: "tw-text-rose-600",
  },
  {
    icon: <FaShieldCheck />,
    title: "Enterprise Security",
    desc: "Bank-grade security protocols across all solutions.",
    bgColor: "tw-bg-gradient-to-br tw-from-slate-50 tw-to-gray-50",
    iconColor: "tw-text-gray-600",
  },
];

const coreValues = [
  {
    icon: <FaHeart className="tw-text-rose-500" />,
    title: "Client-Centric Approach",
    desc: "Your success is our success. We measure our performance by your business outcomes.",
    color: "tw-border-rose-100 tw-bg-rose-50",
  },
  {
    icon: <FaBrain className="tw-text-indigo-500" />,
    title: "Innovation Driven",
    desc: "Constantly exploring emerging technologies to deliver cutting-edge solutions.",
    color: "tw-border-indigo-100 tw-bg-indigo-50",
  },
  {
    icon: <FaBalanceScale className="tw-text-emerald-500" />,
    title: "Integrity & Transparency",
    desc: "Honest communication and ethical practices in every engagement.",
    color: "tw-border-emerald-100 tw-bg-emerald-50",
  },
  {
    icon: <FaLeaf className="tw-text-green-500" />,
    title: "Sustainable Solutions",
    desc: "Building technology that grows with you and stands the test of time.",
    color: "tw-border-green-100 tw-bg-green-50",
  },
];

const industries = [
  { name: "Healthcare", icon: <FaHeart />, color: "tw-bg-red-100 tw-text-red-600" },
  { name: "Education", icon: <FaUniversity />, color: "tw-bg-blue-100 tw-text-blue-600" },
  { name: "Finance", icon: <FaChartLine />, color: "tw-bg-emerald-100 tw-text-emerald-600" },
  { name: "Retail", icon: <FaStore />, color: "tw-bg-amber-100 tw-text-amber-600" },
  { name: "Manufacturing", icon: <FaIndustry />, color: "tw-bg-cyan-100 tw-text-cyan-600" },
  { name: "Startups", icon: <FaRocket />, color: "tw-bg-purple-100 tw-text-purple-600" },
];

const services = [
  {
    category: "Development",
    items: [
      { name: "Web Development", icon: <FaCode />, color: "tw-text-blue-500" },
      { name: "Mobile Apps", icon: <FaMobileAlt />, color: "tw-text-purple-500" },
      { name: "UI/UX Design", icon: <FaPaintBrush />, color: "tw-text-pink-500" },
    ],
  },
  {
    category: "Technology",
    items: [
      { name: "AI & ML Solutions", icon: <FaRobot />, color: "tw-text-amber-500" },
      { name: "Cloud Services", icon: <FaCloud />, color: "tw-text-cyan-500" },
      { name: "DevOps", icon: <FaNetworkWired />, color: "tw-text-emerald-500" },
    ],
  },
  {
    category: "Business Solutions",
    items: [
      { name: "IT Training", icon: <FaChalkboardTeacher />, color: "tw-text-red-500" },
      { name: "Staffing", icon: <FaUserTie />, color: "tw-text-indigo-500" },
      { name: "Consulting", icon: <FaAward />, color: "tw-text-orange-500" },
    ],
  },
];

const AboutUs = () => {
  return (
    <div className="tw-bg-white tw-text-slate-800 tw-pt-20">

      {/* ================= HERO SECTION (Unchanged) ================= */}
      <section
        className="hero-section gradient-overlay tw-relative ptb-100"
        style={{
          background: "url('/img/header-bg-5.jpg') center / cover no-repeat",
        }}
      >
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
            className="tw-text-3xl md:tw-text-5xl tw-font-extrabold tw-text-white tw-tracking-tight"
          >
            About DCM Technologies
          </motion.h1>
          <p className="tw-mt-4 tw-text-xl tw-text-slate-200 tw-max-w-2xl tw-mx-auto">
            Technology, Talent & Transformation — all under one roof.
          </p>

        </div>
      </section>

      {/* ================= COMPANY STORY ================= */}
      <section className="tw-py-16">
        <div className="tw-max-w-6xl tw-mx-auto tw-grid lg:tw-grid-cols-2 tw-gap-12  tw-px-5 md:tw-gap-16 tw-items-center">

          {/* LEFT CONTENT */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="tw-inline-flex tw-items-center tw-gap-2 
                   tw-px-3 tw-py-1.5 tw-rounded-full 
                   tw-bg-blue-50 tw-text-blue-600 tw-mb-5 tw-text-sm"
            >
              <FaLightbulb />
              <span className="tw-font-medium">Our Journey</span>
            </motion.div>

            <h2 className="tw-text-2xl md:tw-text-3xl lg:tw-text-4xl 
                     tw-font-semibold tw-mb-5 tw-text-slate-900">
              Building Careers Through Practical Learning
            </h2>

            <div className="tw-space-y-5">
              <p className="tw-text-base md:tw-text-lg tw-text-slate-700 tw-leading-relaxed">
                Design Career Metrics was established with a focused purpose — to bridge
                the gap between academic education and industry expectations. We believe
                meaningful career growth begins when learning becomes practical, measurable,
                and guided by real-world insight.
              </p>

              <p className="tw-text-slate-600 tw-leading-relaxed">
                Our programs are structured around hands-on internships, guided projects,
                and continuous mentorship. Instead of theoretical exposure alone, we emphasize
                execution, accountability, and confidence-building.
              </p>

              <p className="tw-text-slate-600 tw-leading-relaxed">
                Every learning path is designed to help students develop clarity in their
                goals, strengthen technical foundations, and build portfolios that reflect
                real capability. Growth at Design Career Metrics is intentional, structured,
                and outcome-driven.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="tw-flex tw-justify-center lg:tw-justify-end">
            <div className="tw-max-w-md md:tw-max-w-lg tw-w-full">

              <AboutUsLottie />

              <div className="tw-mt-6 tw-p-5 
                        tw-bg-slate-50 
                        tw-rounded-xl 
                        tw-border tw-border-slate-200">

                <h4 className="tw-font-semibold tw-text-base tw-mb-2 
                         tw-flex tw-items-center tw-gap-2">
                  <FaChartLine className="tw-text-blue-500" />
                  <span>Focused Progress</span>
                </h4>

                <p className="tw-text-sm tw-text-slate-600 tw-leading-relaxed">
                  We continuously refine our programs based on evolving industry needs,
                  ensuring that every learner remains aligned with current tools, workflows,
                  and expectations.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ================= COMPREHENSIVE SERVICES ================= */}
      <section className="tw-pb-12">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-4">
              <span className="tw-bg-gradient-to-r tw-from-purple-600 tw-to-pink-600 tw-bg-clip-text tw-text-transparent">
                Our Comprehensive Ecosystem
              </span>
            </h2>
            <p className="tw-text-lg tw-text-slate-600 tw-max-w-3xl tw-mx-auto">
              End-to-end digital transformation services designed to accelerate your business growth
            </p>
          </div>

          <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {[
              {
                icon: <FaCode className="tw-text-3xl" />,
                title: "Custom Software Development",
                desc: "Tailored solutions that align perfectly with your business processes and goals.",
                gradient: "tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50",
                border: "tw-border-blue-200",
              },
              {
                icon: <FaRobot className="tw-text-3xl" />,
                title: "AI & Automation",
                desc: "Intelligent systems that streamline operations and unlock new insights.",
                gradient: "tw-bg-gradient-to-br tw-from-purple-50 tw-to-pink-50",
                border: "tw-border-purple-200",
              },
              {
                icon: <FaCloud className="tw-text-3xl" />,
                title: "Cloud Transformation",
                desc: "Scalable cloud infrastructure and migration strategies for modern businesses.",
                gradient: "tw-bg-gradient-to-br tw-from-cyan-50 tw-to-blue-50",
                border: "tw-border-cyan-200",
              },
              {
                icon: <FaChalkboardTeacher className="tw-text-3xl" />,
                title: "Technology Training",
                desc: "Upskilling programs to build in-house technical capabilities.",
                gradient: "tw-bg-gradient-to-br tw-from-emerald-50 tw-to-teal-50",
                border: "tw-border-emerald-200",
              },
              {
                icon: <FaUserTie className="tw-text-3xl" />,
                title: "IT Staffing Solutions",
                desc: "Access to pre-vetted technical talent for your projects.",
                gradient: "tw-bg-gradient-to-br tw-from-amber-50 tw-to-orange-50",
                border: "tw-border-amber-200",
              },
              {
                icon: <FaShieldAlt className="tw-text-3xl" />,
                title: "Cybersecurity Services",
                desc: "Protect your digital assets with enterprise-grade security solutions.",
                gradient: "tw-bg-gradient-to-br tw-from-red-50 tw-to-rose-50",
                border: "tw-border-red-200",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${service.gradient} tw-rounded-2xl tw-p-8 tw-border ${service.border} hover:tw-shadow-xl tw-transition-all tw-duration-300 hover:tw-translate-y-[-4px]`}
              >
                <div className="tw-mb-6">
                  {service.icon}
                </div>
                <h3 className="tw-font-bold tw-text-xl tw-mb-3 tw-text-slate-800">
                  {service.title}
                </h3>
                <p className="tw-text-slate-600">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="secondary-bg tw-text-white tw-py-20">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-4 tw-text-white">
              Our Core Values
            </h2>
            <p className="tw-text-xl tw-text-slate-300">
              The principles that guide every project and partnership
            </p>
          </div>

          <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="primary-bg tw-backdrop-blur-sm tw-rounded-2xl tw-p-8 tw-border tw-border-slate-700 hover:tw-border-slate-600 tw-transition"
              >
                <div className="tw-text-4xl tw-mb-6">
                  {value.icon}
                </div>
                <h3 className="tw-font-bold tw-text-xl tw-mb-4 tw-text-white">
                  {value.title}
                </h3>
                <p className="tw-text-slate-300">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DIFFERENTIATORS ================= */}
      <section className="tw-py-20">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
          <div className="tw-text-center tw-mb-8">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-4">
              <span >
                Why Choose Design Career Metrics ?
              </span>
            </h2>
            <p className="tw-text-lg tw-text-slate-600">
              Unique advantages that set us apart in the technology landscape
            </p>
          </div>

          <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${d.bgColor} tw-rounded-2xl tw-p-8 tw-border tw-border-slate-200 hover:tw-shadow-xl tw-transition-all tw-duration-300 hover:tw-translate-y-[-4px]`}
              >
                <div className="tw-mb-6">
                  <div className={`tw-text-4xl ${d.iconColor}`}>
                    {d.icon}
                  </div>
                </div>
                <h4 className="tw-font-bold tw-text-xl tw-mb-4 tw-text-slate-800">
                  {d.title}
                </h4>
                <p className="tw-text-slate-600">
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-indigo-50 tw-py-16 md:tw-py-20">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
          <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-6 tw-gap-8">

            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="tw-text-center"
              >
                <div className={`tw-text-2xl md:tw-text-3xl tw-mb-3 tw-flex tw-justify-center ${s.color}`}>
                  {s.icon}
                </div>

                <h3 className="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-text-slate-800 tw-mb-1">
                  {s.value}
                </h3>

                <p className="tw-text-sm md:tw-text-base tw-text-slate-600">
                  {s.label}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES WE SERVE ================= */}
      <section className="tw-py-10">
        <div className="tw-max-w-6xl tw-mx-auto tw-px-4">

          <div className="tw-text-center tw-mb-12">
            <h2 className="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-mb-3">
              <span className="tw-bg-gradient-to-r tw-from-green-600 tw-to-emerald-600 tw-bg-clip-text tw-text-transparent">
                Industries We Serve
              </span>
            </h2>

            <p className="tw-text-sm md:tw-text-base tw-text-slate-600">
              Focused solutions across evolving professional domains
            </p>
          </div>

          <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-3 md:tw-gap-4">

            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={`
            ${industry.color}
            tw-px-4 md:tw-px-5 
            tw-py-2 md:tw-py-2.5
            tw-rounded-full
            tw-flex tw-items-center tw-gap-2
            tw-text-sm md:tw-text-base
            tw-font-medium
            hover:tw-shadow-md
            tw-transition-all
            tw-duration-300
            tw-cursor-pointer
          `}
              >
                <span className="tw-text-base md:tw-text-lg">
                  {industry.icon}
                </span>
                <span>{industry.name}</span>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

   <ConsultingCTA/>

    </div>
  );
};

export default AboutUs;