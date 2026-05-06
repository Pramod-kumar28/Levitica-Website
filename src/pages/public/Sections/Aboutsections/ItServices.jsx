import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaCode,
  FaRobot,
  FaCloud,
  FaDatabase,
  FaLaptopCode,
} from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";

const itServices = [
  {
    icon: <FaCode />,
    title: "Custom Software Development",
    desc: "Tailored enterprise software solutions that align perfectly with your business processes and goals.",
    gradient: "from-primary/15 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android with stunning UI/UX.",
    gradient: "from-gray/20 to-gray/5",
    iconColor: "text-cyan",
  },
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    desc: "Responsive, high-performance websites and web applications using modern frameworks.",
    gradient: "from-skyBlue/20 to-skyBlue/5",
    iconColor: "text-skyBlue",
  },
  {
    icon: <FaRobot />,
    title: "AI & Machine Learning",
    desc: "Intelligent systems that streamline operations, predict outcomes, and unlock new insights.",
    gradient: "from-purple-200/40 to-purple-100/20",
    iconColor: "text-purple-600",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Transformation",
    desc: "Scalable cloud infrastructure and migration strategies for modern businesses.",
    gradient: "from-cyan/10 to-primary/10",
    iconColor: "text-cyan",
  },
  {
    icon: <FaDatabase />,
    title: "Data Analytics & BI",
    desc: "Turn your data into actionable insights with advanced analytics and business intelligence.",
    gradient: "from-emerald-200/40 to-emerald-100/20",
    iconColor: "text-emerald-600",
  },
];

const ItServices = () => {

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <section className="bg-section dark:bg-darkmode py-24">
      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white"
          >
            IT Services
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-4 text-gray max-w-2xl mx-auto"
          >
            Comprehensive technology solutions to power your digital transformation
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {itServices.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 120}
              className={`
                group relative overflow-hidden
                rounded-xl p-6
                border border-lightgray
                transition duration-300
                hover:-translate-y-2
                hover:shadow-deatail_shadow
                bg-gradient-to-br ${service.gradient}
              `}
            >

              {/* GLOW EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-white/40 to-transparent"></div>

              {/* ICON */}
              <div className={`relative mb-5 text-3xl ${service.iconColor} transition duration-300 group-hover:scale-105 group-hover:rotate-3`}>
                {service.icon}
              </div>

              {/* TITLE */}
              <h3 className="relative font-semibold text-lg text-midnight_text dark:text-white">
                {service.title}
              </h3>

              {/* DESC */}
              <p className="relative mt-3 text-gray">
                {service.desc}
              </p>

              {/* BORDER GLOW */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/20 transition"></div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ItServices;