import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {Link} from 'react-router-dom';

const AboutHero = () => {

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
    <section className="py-18 bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight text-center">

      <div className="relative max-w-5xl mx-auto px-4">

        {/* TITLE */}
        <h1
          data-aos="fade-up"
          className="text-3xl md:text-5xl font-extrabold text-midnight_text tracking-tight"
        >
          About Levitica Technologies
        </h1>

        {/* SUBTEXT */}
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-4 text-lg md:text-xl text-gray max-w-2xl mx-auto"
        >
          Technology, Talent & Transformation all under one roof.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-6 flex justify-center items-center gap-2 text-sm text-gray"
        >
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>

          <span>›</span>

          <span className="text-midnight_text font-medium">
            About Us  
          </span>
        </div>

      </div>
    </section>
  );
};

export default AboutHero;