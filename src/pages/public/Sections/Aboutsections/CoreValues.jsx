import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaHeart, FaBrain, FaLeaf } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";

const coreValues = [
  {
    icon: FaHeart,
    title: "Client-Centric Approach",
    desc: "Your success is our success. We measure our performance by your business outcomes.",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-100",
    iconColor: "text-rose-500",
  },
  {
    icon: FaBrain,
    title: "Innovation Driven",
    desc: "Constantly exploring emerging technologies to deliver cutting-edge solutions.",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100",
    iconColor: "text-indigo-500",
  },
  {
    icon: FaBalanceScale,
    title: "Integrity & Transparency",
    desc: "Honest communication and ethical practices in every engagement.",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    icon: FaLeaf,
    title: "Sustainable Solutions",
    desc: "Building technology that grows with you and stands the test of time.",
    bgColor: "bg-green-50",
    borderColor: "border-green-100",
    iconColor: "text-green-500",
  },
];

const CoreValues = () => {

  /* ✅ AOS INIT */
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900"
          >
            Our Core Values
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600"
          >
            The principles that guide every project and partnership
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {coreValues.map((value, index) => {
            const Icon = value.icon;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className={`${value.bgColor} border ${value.borderColor} rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`text-4xl mb-6 ${value.iconColor}`}>
                  <Icon />
                </div>

                <h3 className="font-semibold text-xl mb-4 text-slate-800">
                  {value.title}
                </h3>

                <p className="leading-relaxed text-slate-600">
                  {value.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default CoreValues;