import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaGraduationCap,
  FaChartLine,
  FaCogs,
  FaBullhorn,
  FaCloud,
  FaBriefcase,
  FaRocket,
  FaBrain,
  FaChartBar,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "IT Services & Solutions",
      description:
        "End-to-end IT services including software development, cloud solutions, cybersecurity, and digital transformation for modern businesses.",
      features: [
        "Custom Software Development",
        "Cloud & DevOps Solutions",
        "Cybersecurity Services",
        "IT Infrastructure Management",
        "Digital Transformation",
      ],
      icon: FaCogs,
      iconColor: "#ef4444",
      gradient: "from-[#507788] via-[#1287ad] to-[#2c5364]",
      path: "/services/it-services",
      secondaryIcon: FaCloud,
      duration: "2-6 months",
    },
    {
      id: 2,
      title: "Manpower & Staffing Solutions",
      description:
        "Complete staffing solutions with specialized professionals across IT, engineering, and business domains through flexible engagement models.",
      features: [
        "Permanent Staffing",
        "Contract Hiring",
        "Executive Search",
        "Skill Assessment",
        "Onboarding Support",
      ],
      icon: FaUsers,
      iconColor: "#2563eb",
      gradient: "from-[#505688] via-[#1243ad] to-[#2c5364]",
      path: "/services/manpower-and-staffing-solutions",
      secondaryIcon: FaBriefcase,
      duration: "2-4 weeks",
    },
    {
      id: 3,
      title: "Campus Recruitment Training (CRT)",
      description:
        "Industry-ready training programs focusing on aptitude, technical skills, and interview preparation for successful campus placements.",
      features: [
        "Aptitude & Reasoning",
        "Technical Skill Building",
        "Communication Skills",
        "Interview Preparation",
        "Corporate Readiness",
      ],
      icon: FaGraduationCap,
      iconColor: "#9333ea",
      gradient: "from-[#773c6d] via-[#ad1293] to-[#642c61]",
      path: "/services/campus-recruitment-training",
      secondaryIcon: FaBrain,
      duration: "8-12 weeks",
    },
    {
      id: 4,
      title: "Business Development & Consulting",
      description:
        "Strategic consulting to drive growth, optimize operations, and implement data-driven strategies for sustainable business success.",
      features: [
        "Market Expansion",
        "Process Optimization",
        "Growth Strategy",
        "Competitive Analysis",
        "Performance Metrics",
      ],
      icon: FaChartLine,
      iconColor: "#16a34a",
      gradient: "from-[#367d92] via-[#306074] to-[#0d46c2]",
      path: "/services/business-development-and-consulting",
      secondaryIcon: FaRocket,
      duration: "Ongoing",
    },
    {
      id: 5,
      title: "Digital Marketing Services",
      description:
        "Measurable digital marketing strategies including SEO, social media, and PPC campaigns that engage audiences and drive conversions.",
      features: [
        "SEO & Content Strategy",
        "Social Media Marketing",
        "PPC Campaigns",
        "Email Marketing",
        "Analytics & Reporting",
      ],
      icon: FaBullhorn,
      iconColor: "#f97316",
      gradient: "from-[#0ea5e9] via-[#2563eb] to-[#1e3a8a]",
      path: "/services/digital-marketing",
      secondaryIcon: FaChartBar,
      duration: "3-6 months",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-blue-900 bg-clip-text text-transparent">
            Comprehensive Services
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            We deliver end-to-end solutions designed to help organizations scale
            faster, operate smarter, and stay ahead in today's competitive
            landscape. Each service is crafted with precision and backed by
            industry expertise.
          </p>
        </motion.div>

        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
    justify-center
    gap-10
  "
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="relative group"
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-500`}
              />

              {/* Card Container */}
              <div className="relative h-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col justify-between transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-100">
                {/* Icon Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl blur-sm"></div>
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-gray-100 group-hover:scale-110 transition-all duration-300">
                      <service.icon
                        size={32}
                        className="drop-shadow-sm"
                        style={{ color: service.iconColor }}
                      />
                    </div>
                  </div>
                  <div className="text-right">

                    <service.secondaryIcon
                      size={20}
                      className="mt-2 text-gray-400 ml-auto"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-gray-600 text-sm">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link
                    to={service.path}
                    className="group/btn w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl border border-blue-200 hover:text-white hover:border-blue-300 hover:shadow-lg transition-all"
                  >
                    <span>Learn more</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>



        {/* ================= BOTTOM CTA ================= */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-6 items-center">

            <Link
              to="/services"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105"
            >
              <span> View All Services</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
};



export default ServicesSection;