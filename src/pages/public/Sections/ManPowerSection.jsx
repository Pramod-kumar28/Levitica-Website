import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaCheckCircle,
  FaBolt,
  FaSyncAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";

const ManpowerSection = ({ backgroundImage }) => {
  const benefits = [
    { text: "Elite, Verified Workforce", icon: FaCheckCircle },
    { text: "Rapid Deployment", icon: FaBolt },
    { text: "Flexible Staffing Models", icon: FaSyncAlt },
    { text: "Seamless PAN-India Reach", icon: FaMapMarkedAlt },
  ];

  const isDark = Boolean(backgroundImage);

  /* ✅ AOS INIT */
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  return (
    <section
      className={`relative py-24 ${
        isDark ? "text-white" : "bg-white text-slate-900"
      } flex justify-center items-center`}
      style={
        backgroundImage
          ? {
              background: `url(${backgroundImage}) center / cover no-repeat`,
            }
          : undefined
      }
    >
      {/* Overlay */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      )}

      <div className="relative max-w-5xl mx-auto px-4 text-center">

        {/* HEADING */}
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Empowering Businesses with People Who Make an Impact
        </h2>

        {/* DESCRIPTION */}
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-4 text-lg text-white/90 md:text-xl"
        >
          Professionals who are skilled, vetted, and deployment-ready delivered
          exactly when and where your business needs them. Not just manpower,
          but momentum.
        </p>

        {/* BENEFITS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={200 + index * 120}
                className={`flex items-center gap-3 p-4 rounded-xl ${
                  isDark
                    ? "bg-white/10 backdrop-blur"
                    : "bg-slate-50"
                }`}
              >
                <Icon className="text-xl text-emerald-400" />
                <span className="font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div data-aos="fade-up" data-aos-delay="500" className="mt-12">
          <a
            href="contact-us"
            className={`btn ${
              isDark ? "outline-white-btn" : "outline-btn"
            }`}
          >
            Get Support
          </a>
        </div>

      </div>
    </section>
  );
};

export default ManpowerSection;