import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  TrendingUp,
  MonitorCog,
} from "lucide-react";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "IT Services & Solutions",
      description:
        "Enterprise-grade IT services including software development, cloud, cybersecurity, and infrastructure management.",
      icon: <MonitorCog size={28} />,
      gradient: "from-[#507788] via-[#1287ad] to-[#2c5364]",
      path: "/services/it-services",
    },
    {
      id: 2,
      title: "Manpower & Staffing Solutions",
      description:
        "Comprehensive staffing solutions to ensure you get the right talent at the right time.",
      icon: <Users size={28} />,
      gradient: "from-[#505688] via-[#1243ad] to-[#2c5364]",
      path: "/services/manpower-and-staffing-solutions",
    },
    {
      id: 3,
      title: "Campus Recruitment Training (CRT)",
      description:
        "Industry-ready training programs focused on aptitude, technical, and soft skills.",
      icon: <GraduationCap size={28} />,
      gradient: "from-[#773c6d] via-[#ad1293] to-[#642c61]",
      path: "/services/campus-recruitment-training",
    },
    {
      id: 4,
      title: "Business Development & Consulting",
      description:
        "Strategic consulting services to accelerate growth and improve performance.",
      icon: <TrendingUp size={28} />,
      gradient: "from-[#367d92] via-[#306074] to-[#0d46c2]",
      path: "/services/business-development-and-consulting",
    },
  ];

  return (
    <>
      <section className="tw-py-16 tw-bg-slate-50">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-mb-8 md:tw-mb-12
">

          {/* Section header */}
          <motion.div
            className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold">
              Our Services
            </h2>
            <p className="tw-mt-4 tw-text-gray-600">
              Comprehensive solutions to meet your business and talent needs
            </p>
          </motion.div>

          {/* Services grid */}
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="tw-relative tw-group"
              >
                {/* Glow */}
                <div
                  className={`tw-absolute tw-inset-0 tw-rounded-2xl tw-bg-gradient-to-br ${service.gradient} tw-opacity-0 group-hover:tw-opacity-100 tw-blur-xl tw-transition`}
                />

                {/* Card */}
                <div className="tw-relative tw-h-full tw-bg-white tw-rounded-2xl tw-shadow-md tw-p-6 tw-flex tw-flex-col tw-justify-between tw-transition group-hover:tw-shadow-xl">
                  <div>
                    <div
                      className={`tw-inline-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-xl tw-bg-gradient-to-br ${service.gradient} tw-text-white`}
                    >
                      {service.icon}
                    </div>

                    <h3 className="tw-mt-6 tw-text-lg tw-font-semibold">
                      {service.title}
                    </h3>

                    <p className="tw-mt-3 tw-text-sm tw-text-gray-600">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover CTA */}
                  <div className="tw-mt-6">
                    <Link to={service.path}>
                      <button className="tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-underline">
                        Learn More →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="tw-text-center ">
          <Link to="/services" className="btn accent-outline-btn tw-rounded-full">

            View All Our Services
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}

    </>
  );
};

export default ServicesSection;
