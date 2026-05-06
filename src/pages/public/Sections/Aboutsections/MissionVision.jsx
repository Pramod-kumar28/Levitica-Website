import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaCrosshairs,
  FaLightbulb,
  FaChartLine,
  FaUsers,
  FaRobot,
  FaBolt,
  FaBookOpen,
} from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";

const stats = [
  { number: "500+", label: "Projects Completed", icon: FaChartLine },
  { number: "200+", label: "Enterprise Clients", icon: FaUsers },
  { number: "50+", label: "AI Models Deployed", icon: FaRobot },
  { number: "99.9%", label: "System Uptime", icon: FaShieldAlt },
  { number: "10k+", label: "Active Learners", icon: FaBookOpen },
  { number: "24/7", label: "Technical Support", icon: FaBolt },
];

const MissionVision = () => {

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div className="space-y-8">

            {/* MISSION */}
            <div
              data-aos="fade-right"
              className="
                group relative overflow-hidden
                bg-white rounded-xl p-6
                border border-slate-200
                shadow-md hover:shadow-xl
                transition
              "
            >
              {/* subtle gradient glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-100/40 to-transparent"></div>

              <div className="flex items-center mb-5 relative">
                <div className="p-3 rounded-lg bg-blue-100 mr-4 group-hover:scale-110 transition">
                  <FaCrosshairs className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Our Mission
                </h2>
              </div>

              <p className="relative text-lg text-slate-600 leading-relaxed">
                To deliver high-quality, scalable, and secure technology solutions that solve real-world
                challenges, while empowering individuals through education and businesses through
                strategic consultancy.
              </p>
            </div>

            {/* VISION */}
            <div
              data-aos="fade-right"
              data-aos-delay="150"
              className="
                group relative overflow-hidden
                bg-white rounded-xl p-6
                border border-slate-200
                shadow-md hover:shadow-xl
                transition
              "
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-cyan-100/40 to-transparent"></div>

              <div className="flex items-center mb-5 relative">
                <div className="p-3 rounded-lg bg-purple-100 mr-4 group-hover:scale-110 transition">
                  <FaLightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Our Vision
                </h2>
              </div>

              <p className="relative text-lg text-slate-600 leading-relaxed">
                To be the world's most trusted technology partner, empowering businesses with innovative
                solutions and creating a global community of skilled tech professionals through
                accessible, quality education.
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div data-aos="fade-left">

            <h2 className="text-3xl font-semibold mb-8 text-slate-900">
              Company Statistics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={index}
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                    className="
                      group bg-white rounded-xl p-5 text-center
                      border border-slate-200
                      shadow-sm hover:shadow-lg
                      transition
                    "
                  >

                    {/* ICON */}
                    <div className="flex justify-center mb-3">
                      <div className="p-2 rounded-lg bg-blue-100 group-hover:scale-110 transition">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>

                    {/* NUMBER */}
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                      {stat.number}
                    </div>

                    {/* LABEL */}
                    <div className="text-sm text-slate-600">
                      {stat.label}
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;