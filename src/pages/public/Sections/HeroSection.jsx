import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HeroSection = () => {

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      easing: "ease-out-cubic",
      offset: 80,
      delay: 50
    });
  }, []);

  return (
    <section className="relative pt-20 md:pt-24 pb-20 bg-gradient-to-b from-white to-herobg dark:from-darkmode dark:to-darklight overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-3">

          <span
            data-aos="fade-up"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-cyan rounded-full animate-pulse"></span>
            People First • Enterprise Solutions
          </span>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-midnight_text dark:text-white"
          >
            Expert Training. Reliable Manpower. Proven Consulting
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 text-lg text-gray max-w-2xl"
          >
            Holistically procrastinate mission-critical convergence with reliable
            customer service. Assertively underwhelm idea-sharing for impactful solutions.
          </p>

          <div data-aos="fade-up" data-aos-delay="300" className="mt-8">
            <Link
              to="/contact-us"
              className="inline-flex items-center bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-property"
            >
              Get Start Now
            </Link>
          </div>

          {/* STATS */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex justify-between items-center mt-10 text-center sm:gap-8"
          >
            <Stat value="10K+" label="Students Trained" />
            <Stat value="500+" label="Enterprise Clients" />
            <Stat value="8+" label="Years Experience" />
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="lg:col-span-2 relative flex justify-start w-full"
        >
          <DotLottieReact 
            src="/lottie/Seo_isometric.lottie"
            className="w-110 h-[400px]"
            autoplay
            loop
          />

          {/* Glow Effect */}
          <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl top-10 left-1/2 -translate-x-1/2 -z-10"></div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

/* ---------------- Stats Component ---------------- */

const Stat = ({ value, label }) => {
  return (
    <div className="flex-1">
      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
        {value}
      </div>
      <div className="text-sm text-gray">
        {label}
      </div>
    </div>
  );
};