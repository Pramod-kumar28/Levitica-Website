import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaBookOpen,
  FaVideo,
  FaCertificate,
  FaArrowRight,
} from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";

const learningServices = [
  {
    icon: FaBookOpen,
    title: "Comprehensive Tech Courses",
    desc: "Full-stack development, AI/ML, cloud computing, cybersecurity, and more.",
    gradient: "from-primary/15 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: FaVideo,
    title: "Interactive Video Lectures",
    desc: "High-quality video content with hands-on coding exercises and real-world projects.",
    gradient: "from-purple-700/5 to-purple-700/5",
    iconColor: "text-cyan",
  },
  {
    icon: FaCertificate,
    title: "Industry-Recognized Certifications",
    desc: "Earn certificates that validate your skills and boost your career prospects.",
    gradient: "from-skyBlue/20 to-skyBlue/5",
    iconColor: "text-skyBlue",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Live Mentorship Sessions",
    desc: "Learn from industry experts with personalized guidance and career coaching.",
    gradient: "from-gray/10 to-gray/10",
    iconColor: "text-primary",
  },
];

const LearningPlatform = () => {

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <section className="bg-white dark:bg-darkmode py-24">
      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">

          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan/10 text-cyan mb-4"
          >
            <FaBookOpen />
            <span className="font-medium">Levitica Academy</span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white"
          >
            Transform Your Career with
            <span className="block mt-2 text-primary">
              Industry Aligned Learning
            </span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 text-gray max-w-2xl mx-auto"
          >
            Our e-learning platform offers comprehensive tech courses designed by industry experts
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {learningServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className={`
                  group relative overflow-hidden
                  rounded-xl p-6 text-center
                  border border-lightgray
                  transition duration-300
                  hover:-translate-y-2
                  hover:shadow-deatail_shadow
                  bg-gradient-to-br ${service.gradient}
                `}
              >

                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-white/40 to-transparent"></div>

                {/* ICON */}
                <div className={`
                  relative inline-flex items-center justify-center
                  w-14 h-14 rounded-full mb-4 text-xl
                  bg-white shadow-property
                  ${service.iconColor}
                  group-hover:scale-110 transition
                `}>
                  <Icon />
                </div>

                {/* TITLE */}
                <h3 className="relative font-semibold text-lg text-midnight_text dark:text-white">
                  {service.title}
                </h3>

                {/* DESC */}
                <p className="relative mt-2 text-sm text-gray">
                  {service.desc}
                </p>

                {/* BORDER GLOW */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/20 transition"></div>

              </div>
            );
          })}

        </div>

        {/* CTA */}
        <div className="text-center mt-12">

          <Link
            to="/learn"
            data-aos="fade-up"
            className="
              inline-flex items-center px-8 py-3 rounded-lg font-semibold
              bg-primary text-white
              hover:bg-skyBlue transition
              shadow-property hover:shadow-deatail_shadow
            "
          >
            Start Learning Today
            <FaArrowRight className="ml-2" />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default LearningPlatform;