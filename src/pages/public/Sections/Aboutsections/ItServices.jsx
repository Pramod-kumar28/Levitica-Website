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
import { FaMobileAlt, FaArrowRight, FaStar, FaChartLine } from "react-icons/fa";
import { useTheme } from '@/context/ThemeContext';

const itServices = [
  {
    icon: <FaCode />,
    title: "Custom Software Development",
    desc: "Tailored enterprise software solutions that align perfectly with your business processes and goals.",
    gradient: "from-primary/20 via-primary/10 to-transparent",
    iconColor: "text-primary",
    bgGradient: "from-primary/5 to-transparent",
    features: ["Enterprise Solutions", "API Integration", "Scalable Architecture"],
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications for iOS and Android with stunning UI/UX.",
    gradient: "from-cyan/20 via-cyan/10 to-transparent",
    iconColor: "text-cyan",
    bgGradient: "from-cyan/5 to-transparent",
    features: ["iOS & Android", "Cross-Platform", "App Store Optimization"],
  },
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    desc: "Responsive, high-performance websites and web applications using modern frameworks.",
    gradient: "from-skyBlue/20 via-skyBlue/10 to-transparent",
    iconColor: "text-skyBlue",
    bgGradient: "from-skyBlue/5 to-transparent",
    features: ["React & Next.js", "Progressive Web Apps", "SEO Optimized"],
  },
  {
    icon: <FaRobot />,
    title: "AI & Machine Learning",
    desc: "Intelligent systems that streamline operations, predict outcomes, and unlock new insights.",
    gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
    iconColor: "text-purple-500",
    bgGradient: "from-purple-500/5 to-transparent",
    features: ["Predictive Analytics", "NLP Solutions", "Computer Vision"],
  },
  {
    icon: <FaCloud />,
    title: "Cloud Transformation",
    desc: "Scalable cloud infrastructure and migration strategies for modern businesses.",
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
    iconColor: "text-emerald-500",
    bgGradient: "from-emerald-500/5 to-transparent",
    features: ["AWS/Azure/GCP", "DevOps & CI/CD", "Cloud Security"],
  },
  {
    icon: <FaDatabase />,
    title: "Data Analytics & BI",
    desc: "Turn your data into actionable insights with advanced analytics and business intelligence.",
    gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
    iconColor: "text-orange-500",
    bgGradient: "from-orange-500/5 to-transparent",
    features: ["Real-time Dashboards", "Data Warehousing", "Predictive Models"],
  },
];

const ItServices = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <section className={`py-24 ${isDark ? 'bg-darkmode' : 'bg-section'} relative overflow-hidden`}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4 relative z-10">

        {/* HEADER WITH AOS */}
        <div className="text-center mb-16">
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <FaStar className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">What We Offer</span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white"
          >
            Our IT Services
          </h2>

          <div
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
            className="mt-4"
          >
            <p className="mt-4 text-gray max-w-2xl mx-auto">
              Comprehensive technology solutions to power your digital transformation journey
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {itServices.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay={index * 100}
              className={`
                group relative overflow-hidden
                rounded-2xl p-6
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-deatail_shadow
                border
                ${isDark 
                  ? 'bg-semidark border-dark_border' 
                  : 'bg-white border-border'
                }
              `}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon Container */}
              <div className="relative mb-5">
                <div className={`
                  w-14 h-14 rounded-2xl
                  flex items-center justify-center
                  transition-all duration-300
                  group-hover:scale-110
                  ${isDark ? 'bg-darklight' : 'bg-light'}
                  group-hover:border-primary
                `}>
                  <div className={`text-3xl ${service.iconColor} transition duration-300 group-hover:scale-105`}>
                    {service.icon}
                  </div>
                </div>
                {/* Decorative Pulse */}
                <div className={`absolute -inset-1 rounded-2xl ${service.iconColor}/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`} />
              </div>

              {/* Title */}
              <h3 className={`relative font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-midnight_text'} group-hover:text-primary transition-colors duration-300`}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative text-gray text-sm leading-relaxed mb-4">
                {service.desc}
              </p>

              {/* Features List */}
              <div className="relative mb-5">
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        isDark 
                          ? 'bg-darklight text-gray border border-dark_border'
                          : 'bg-light text-gray border border-border'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Gradient Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ItServices;