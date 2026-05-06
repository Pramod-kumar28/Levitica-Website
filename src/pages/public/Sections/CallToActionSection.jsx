import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const ConsultingCTA = () => {

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
    <section className="bg-slate-100 py-12 md:py-16 flex justify-center items-center">
      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto container px-4">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* LEFT CONTENT */}
          <div
            data-aos="fade-right"
            className="max-w-xl text-center md:text-left"
          >
            <h3 className="text-xl md:text-3xl font-semibold text-slate-900">
              Consulting Services To Empower Your Business
            </h3>

            <p className="mt-2 text-slate-600 text-sm md:text-base">
              Rapidiously engage fully tested e-commerce with progressive architectures.
            </p>
          </div>

          {/* RIGHT CTA */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="flex justify-center md:justify-end w-full md:w-auto"
          >
            <Link
              to="/contact-us"
              className="btn secondary-solid-btn px-6 py-2.5 text-sm md:text-base"
            >
              Contact With Us
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ConsultingCTA;