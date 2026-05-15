import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaUsers,
  FaGraduationCap,
  FaChartLine,
  FaCogs,
  FaBullhorn,
} from "react-icons/fa";

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
      path: "/services/it-services",
    },
    {
      id: 2,
      title: "Manpower & Staffing Solutions",
      description:
        "Complete staffing solutions with specialized professionals across IT, engineering, and business domains.",
      features: [
        "Permanent Staffing",
        "Contract Hiring",
        "Executive Search",
        "Skill Assessment",
        "Onboarding Support",
      ],
      icon: FaUsers,
      path: "/services/manpower-and-staffing-solutions",
    },
    {
      id: 3,
      title: "Campus Recruitment Training (CRT)",
      description:
        "Industry-ready training programs focusing on aptitude, technical skills, and interview preparation.",
      features: [
        "Aptitude & Reasoning",
        "Technical Skills",
        "Communication",
        "Interview Prep",
        "Corporate Readiness",
      ],
      icon: FaGraduationCap,
      path: "/services/campus-recruitment-training",
    },
    {
      id: 4,
      title: "Business Development & Consulting",
      description:
        "Strategic consulting to drive growth, optimize operations, and implement data-driven strategies.",
      features: [
        "Market Expansion",
        "Process Optimization",
        "Growth Strategy",
        "Analysis",
      ],
      icon: FaChartLine,
      path: "/services/business-development-and-consulting",
    },
    {
      id: 5,
      title: "Digital Marketing Services",
      description:
        "SEO, social media, and PPC campaigns that engage audiences and drive conversions.",
      features: [
        "SEO",
        "Social Media",
        "PPC",
        "Email Marketing",
      ],
      icon: FaBullhorn,
      path: "/services/digital-marketing",
    },
  ];

  /* ✅ AOS INIT (same as property feel) */
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      easing: "ease-out-cubic",
      offset: 80,
      delay: 50,
    });
  }, []);

  return (
    <section className="py-24 bg-section dark:bg-darkmode flex justify-center items-center">
      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto container px-4">

        {/* HEADER */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
          data-aos="fade-up"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Expertise
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white">
            Comprehensive Services
          </h2>

          <p className="mt-4 text-gray">
            We deliver end-to-end solutions designed to help organizations scale,
            operate smarter, and grow faster.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              <div className="bg-white dark:bg-semidark rounded-xl shadow-property p-6 border border-lightgray hover:shadow-lg transition flex flex-col h-full">

                {/* ICON */}
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-primary/10 mb-5">
                  <service.icon className="text-primary text-xl" />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-midnight_text dark:text-white">
                  {service.title}
                </h3>

                {/* DESC */}
                <p className="mt-3 text-sm text-gray">
                  {service.description}
                </p>

                {/* FEATURES */}
                <ul className="mt-4 space-y-2">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-gray">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* PUSH CTA DOWN */}
                <div className="flex-grow"></div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    to={service.path}
                    className="text-primary font-medium hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 btn btn-primary transition"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;