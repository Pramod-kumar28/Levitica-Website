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
    <section className="tw-py-20 tw-bg-gradient-to-b tw-from-gray-50 tw-to-white">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        {/* ================= HEADER ================= */}
        <motion.div
          className="tw-text-center tw-max-w-4xl tw-mx-auto tw-mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="tw-inline-block tw-px-4 tw-py-2 tw-bg-blue-100 tw-text-blue-600 tw-rounded-full tw-text-sm tw-font-semibold tw-mb-4">
            Our Expertise
          </span>
          <h2 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-bg-blue-900 tw-bg-clip-text tw-text-transparent">
            Comprehensive Services
          </h2>
          <p className="tw-mt-6 tw-text-lg tw-text-gray-600 tw-leading-relaxed">
            We deliver end-to-end solutions designed to help organizations scale
            faster, operate smarter, and stay ahead in today's competitive
            landscape. Each service is crafted with precision and backed by
            industry expertise.
          </p>
        </motion.div>

        <div
          className="
    tw-grid
    tw-grid-cols-1
    sm:tw-grid-cols-2
    lg:tw-grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
    tw-justify-center
    tw-gap-10
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
              className="tw-relative tw-group"
            >
              {/* Background Glow */}
              <div
                className={`tw-absolute tw-inset-0 tw-rounded-3xl tw-bg-gradient-to-br ${service.gradient} tw-opacity-0 group-hover:tw-opacity-20 tw-blur-3xl tw-transition-all tw-duration-500`}
              />

              {/* Card Container */}
              <div className="tw-relative tw-h-full tw-bg-white tw-rounded-3xl tw-shadow-xl tw-border tw-border-gray-100 tw-p-8 tw-flex tw-flex-col tw-justify-between tw-transition-all tw-duration-300 group-hover:tw-shadow-2xl group-hover:tw-border-blue-100">
                {/* Icon Header */}
                <div className="tw-flex tw-items-start tw-justify-between tw-mb-6">
                  <div className="tw-relative">
                    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-br tw-from-blue-50 tw-to-purple-50 tw-rounded-2xl tw-blur-sm"></div>
                    <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-rounded-2xl tw-bg-white tw-border tw-border-gray-100 group-hover:tw-scale-110 tw-transition-all tw-duration-300">
                      <service.icon
                        size={32}
                        className="tw-drop-shadow-sm"
                        style={{ color: service.iconColor }}
                      />
                    </div>
                  </div>
                  <div className="tw-text-right">

                    <service.secondaryIcon
                      size={20}
                      className="tw-mt-2 tw-text-gray-400 tw-ml-auto"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="tw-flex-1">
                  <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 group-hover:tw-text-blue-600 tw-transition-colors">
                    {service.title}
                  </h3>

                  <p className="tw-mt-4 tw-text-gray-600 tw-text-sm">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="tw-mt-6">
                    <h4 className="tw-text-sm tw-font-semibold tw-text-gray-900 tw-mb-3">
                      Key Features:
                    </h4>
                    <ul className="tw-space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="tw-flex tw-items-center tw-text-sm tw-text-gray-600"
                        >
                          <div className="tw-w-1.5 tw-h-1.5 tw-bg-blue-500 tw-rounded-full tw-mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="tw-mt-8 tw-pt-6 tw-border-t tw-border-gray-100">
                  <Link
                    to={service.path}
                    className="tw-group/btn tw-w-full tw-inline-flex tw-items-center tw-justify-center tw-px-4 tw-py-2 tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-800 tw-text-white tw-font-semibold tw-rounded-xl tw-border tw-border-blue-200 hover:tw-border-blue-300 hover:tw-shadow-lg tw-transition-all"
                  >
                    <span>Learn more</span>
                    <svg
                      className="tw-w-4 tw-h-4 tw-ml-2 group-hover/btn:tw-translate-x-1 tw-transition-transform"
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
          className="tw-text-center tw-mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="tw-inline-flex tw-flex-col sm:tw-flex-row tw-gap-6 tw-items-center">

            <Link
              to="/services"
              className="tw-group tw-inline-flex tw-items-center tw-px-8 tw-py-4 tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-font-semibold tw-rounded-full hover:tw-shadow-xl tw-transition-all hover:tw-scale-105"
            >
              <span> View All Services</span>
              <svg
                className="tw-w-5 tw-h-5 tw-ml-2 group-hover:tw-translate-x-1 tw-transition-transform"
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