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
    <div className="tw-bg-white tw-text-slate-800">

      {/* ================= HERO SECTION (Unchanged) ================= */}
      <section
        className="hero-section gradient-overlay tw-relative tw-py-32"
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
          <Link to="/contact-us" className="btn accent-solid-btn tw-mt-8 tw-px-8 tw-py-3 tw-text-lg tw-inline-block">
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* ================= COMPANY STORY ================= */}
      <section className="tw-py-20">
        <div className="tw-max-w-7xl tw-mx-auto tw-grid lg:tw-grid-cols-2 tw-gap-16 tw-px-4 tw-items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-bg-blue-50 tw-text-blue-600 tw-mb-6"
            >
              <FaLightbulb />
              <span className="tw-font-medium">Our Story</span>
            </motion.div>
            
            <h2 className="tw-text-4xl tw-font-bold tw-mb-6 tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-bg-clip-text tw-text-transparent">
              Pioneering Digital Excellence Since 2015
            </h2>
            
            <div className="tw-space-y-6">
              <p className="tw-text-lg tw-text-slate-700">
                DCM Technologies began with a simple vision: to bridge the gap between innovative ideas and their digital realization. Today, we stand as a comprehensive technology partner for businesses worldwide.
              </p>
              
              <div className="tw-bg-gradient-to-r tw-from-slate-50 tw-to-white tw-p-6 tw-rounded-xl tw-border tw-border-slate-200">
                <h3 className="tw-font-bold tw-text-xl tw-mb-3 tw-flex tw-items-center tw-gap-3">
                  <FaGlobe className="tw-text-blue-500" />
                  <span>Global Reach, Local Expertise</span>
                </h3>
                <p className="tw-text-slate-600">
                  With teams across three continents, we combine global best practices with deep understanding of local markets to deliver solutions that resonate with your audience.
                </p>
              </div>
              
              <div className="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mt-6">
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-p-2 tw-bg-green-100 tw-rounded-lg">
                    <FaServer className="tw-text-green-600" />
                  </div>
                  <div>
                    <h4 className="tw-font-semibold">Infrastructure First</h4>
                    <p className="tw-text-sm tw-text-slate-500">Enterprise-grade foundations</p>
                  </div>
                </div>
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-p-2 tw-bg-purple-100 tw-rounded-lg">
                    <FaUsers className="tw-text-purple-600" />
                  </div>
                  <div>
                    <h4 className="tw-font-semibold">Team Excellence</h4>
                    <p className="tw-text-sm tw-text-slate-500">Certified professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lottie Animation */}
          <div className="tw-flex tw-justify-center lg:tw-justify-end">
            <div className="tw-max-w-lg tw-w-full">
              <AboutUsLottie />
              <div className="tw-mt-8 tw-p-6 tw-bg-gradient-to-br tw-from-blue-50 tw-to-indigo-50 tw-rounded-2xl tw-border tw-border-blue-100">
                <h4 className="tw-font-bold tw-text-lg tw-mb-3 tw-flex tw-items-center tw-gap-2">
                  <FaChartLine className="tw-text-blue-500" />
                  <span>Continuous Innovation</span>
                </h4>
                <p className="tw-text-slate-600">
                  We invest 20% of our resources in R&D to stay ahead of technology curves and bring future-ready solutions to our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INDUSTRY EXPERTISE ================= */}
      <section className="tw-bg-gradient-to-b tw-from-white tw-to-slate-50 tw-py-20">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
          <div className="tw-text-center tw-max-w-3xl tw-mx-auto tw-mb-12">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-4">
              <span className="tw-bg-gradient-to-r tw-from-cyan-600 tw-to-blue-600 tw-bg-clip-text tw-text-transparent">
                Industry Expertise
              </span>
            </h2>
            <p className="tw-text-lg tw-text-slate-600">
              We've delivered transformative solutions across diverse sectors
            </p>
          </div>

          <div className="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {services.map((serviceGroup, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.1 }}
                className="tw-bg-white tw-rounded-2xl tw-p-8 tw-shadow-lg tw-border tw-border-slate-200 hover:tw-shadow-xl tw-transition-shadow"
              >
                <h3 className="tw-font-bold tw-text-xl tw-mb-6 tw-text-slate-800">
                  {serviceGroup.category}
                </h3>
                <div className="tw-space-y-4">
                  {serviceGroup.items.map((service, index) => (
                    <div
                      key={index}
                      className="tw-flex tw-items-center tw-gap-4 tw-p-3 tw-rounded-lg hover:tw-bg-slate-50 tw-transition"
                    >
                      <div className={`tw-text-2xl ${service.color}`}>
                        {service.icon}
                      </div>
                      <span className="tw-font-medium tw-text-slate-700">
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPREHENSIVE SERVICES ================= */}
      <section className="tw-py-20">
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
      <section className="tw-bg-gradient-to-br tw-from-slate-900 tw-to-slate-800 tw-text-white tw-py-20">
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
                className="tw-bg-slate-800/50 tw-backdrop-blur-sm tw-rounded-2xl tw-p-8 tw-border tw-border-slate-700 hover:tw-border-slate-600 tw-transition"
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
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-4">
              <span className="tw-bg-gradient-to-r tw-from-indigo-600 tw-to-purple-600 tw-bg-clip-text tw-text-transparent">
                Why Choose DCM Technologies
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
      <section className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-indigo-50 tw-py-24">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
          <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-6 tw-gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="tw-text-center"
              >
                <div className={`tw-text-4xl tw-mb-4 tw-flex tw-justify-center ${s.color}`}>
                  {s.icon}
                </div>
                <h3 className="tw-text-4xl tw-font-bold tw-text-slate-800 tw-mb-2">
                  {s.value}
                </h3>
                <p className="tw-text-slate-600 tw-font-medium">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES WE SERVE ================= */}
      <section className="tw-py-20">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
          <div className="tw-text-center tw-mb-16">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-4">
              <span className="tw-bg-gradient-to-r tw-from-green-600 tw-to-emerald-600 tw-bg-clip-text tw-text-transparent">
                Industries We Serve
              </span>
            </h2>
            <p className="tw-text-lg tw-text-slate-600">
              Tailored solutions for diverse business verticals
            </p>
          </div>

          <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`${industry.color} tw-px-6 tw-py-3 tw-rounded-full tw-flex tw-items-center tw-gap-2 tw-font-medium hover:tw-shadow-lg tw-transition tw-cursor-pointer`}
              >
                {industry.icon}
                <span>{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="tw-relative tw-overflow-hidden">
        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-br tw-from-blue-600 tw-via-purple-600 tw-to-pink-600 tw-opacity-90" />
        <div className="tw-relative tw-max-w-7xl tw-mx-auto tw-py-28 tw-px-4 tw-text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white tw-mb-6"
          >
            Ready to Transform Your Digital Landscape?
          </motion.h2>
          <p className="tw-text-xl tw-text-blue-100 tw-mb-10 tw-max-w-3xl tw-mx-auto">
            Join 200+ satisfied clients who've accelerated their growth with our technology solutions.
          </p>

          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center">
            <Link
              to="/contact-us"
              className="tw-bg-white tw-text-blue-600 hover:tw-bg-blue-50 tw-px-8 tw-py-4 tw-rounded-xl tw-font-bold tw-text-lg tw-transition tw-shadow-lg hover:tw-shadow-xl"
            >
              Schedule a Consultation
            </Link>
            <Link
              to="/portfolio"
              className="tw-bg-transparent tw-border-2 tw-border-white tw-text-white hover:tw-bg-white/10 tw-px-8 tw-py-4 tw-rounded-xl tw-font-bold tw-text-lg tw-transition"
            >
              View Our Work
            </Link>
          </div>

          <div className="tw-mt-12 tw-flex tw-flex-wrap tw-justify-center tw-gap-6">
            <div className="tw-text-white/80">
              <div className="tw-font-bold tw-text-2xl">24/7</div>
              <div className="tw-text-sm">Support</div>
            </div>
            <div className="tw-text-white/80">
              <div className="tw-font-bold tw-text-2xl">30-Day</div>
              <div className="tw-text-sm">Risk-Free Trial</div>
            </div>
            <div className="tw-text-white/80">
              <div className="tw-font-bold tw-text-2xl">Free</div>
              <div className="tw-text-sm">Initial Consultation</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;