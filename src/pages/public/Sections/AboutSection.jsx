import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaLightbulb,
  FaBezierCurve,
  FaLifeRing,
  FaBrain,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
  "Cost Accounting Fundamentals",
  "Corporate Cash Management",
  "SEO Optimization Services",
  "Company Brand Solutions",
];

const promoBlocks = [
  {
    icon: FaLightbulb,
    title: "Business Consulting",
    description:
      "Scale mission-critical imperatives with data-driven consulting strategies.",
  },
  {
    icon: FaBezierCurve,
    title: "Creative Design",
    description:
      "Craft visually compelling designs that elevate your brand identity.",
  },
  {
    icon: FaLifeRing,
    title: "Market Strategy",
    description:
      "Create high-impact go-to-market strategies for sustainable growth.",
  },
  {
    icon: FaBrain,
    title: "Valuable Ideas",
    description:
      "Transform innovative ideas into real-world business solutions.",
  },
];

const AboutUsSection = () => {

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
    <section className="py-16 bg-section dark:bg-darkmode flex justify-center items-center">
      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto container px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            <h2
              data-aos="fade-up"
              className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white"
            >
              From Learning to Leading We’re With You.
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-4 text-gray"
            >
              We help individuals and organizations move from foundational learning
              to leadership through innovative, scalable solutions.
            </p>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-3 text-gray"
            >
              Our approach blends strategy, technology, and creativity to unlock
              sustainable growth and long-term value.
            </p>

            {/* FEATURES */}
            <ul className="mt-8 space-y-3">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={300 + idx * 100}
                  className="flex items-center gap-3 text-midnight_text dark:text-white"
                >
                  <FaCheckCircle className="text-primary" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>

          </div>

          {/* RIGHT BLOCKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {promoBlocks.map((block, idx) => {
              const Icon = block.icon;

              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 120}
                  className="group bg-white dark:bg-semidark rounded-lg border border-lightgray p-6 shadow-property hover:shadow-deatail_shadow transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition">
                    <Icon size={22} />
                  </div>

                  <h5 className="mt-4 font-semibold text-midnight_text dark:text-white">
                    {block.title}
                  </h5>

                  <p className="mt-2 text-sm text-gray">
                    {block.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;