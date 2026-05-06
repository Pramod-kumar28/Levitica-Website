import React, { useEffect } from "react";
import data from '@/data/data.json';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

/* ✅ AOS */
import AOS from "aos";
import "aos/dist/aos.css";

const Trainings = () => {

  /* ✅ INIT AOS */
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <>
      <div className="bg-white pt-20">

        {/* 🔥 HERO (PROPERTY STYLE ONLY LOOK CHANGE) */}
        <section className="py-12 bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight text-center">

          <div className="relative max-w-4xl mx-auto px-4 text-center">

            <h1
              data-aos="fade-up"
              className="text-4xl md:text-5xl font-bold text-midnight_text"
            >
              Our Courses
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-4 text-slate-600"
            >
              Rapidiously engage fully tested e-commerce with progressive
              architectures.
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
                Training
              </span>
            </div>

          </div>
        </section>

        {/* Trainings Section */}
        <section className="services-section bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4">

            {/* Section header */}
            <div className="flex justify-center">
              <div className="max-w-2xl text-center mb-16">

                <h2
                  data-aos="fade-up"
                  className="text-3xl md:text-4xl font-bold"
                >
                  We Provide Best Trainings
                </h2>

                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="mt-4 text-slate-600"
                >
                  Efficiently aggregate end-to-end core competencies without
                  maintainable ideas. Dynamically foster tactical solutions
                  without enabled value.
                </p>

              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Internship Card */}
              <div className="flex" data-aos="fade-up">
                <div className="bg-white text-center p-8 rounded-2xl shadow-sm hover:shadow-xl transition w-full">
                  <img
                    src="/img/internshipcard.svg"
                    alt="Internships"
                    className="w-20 mx-auto mb-6"
                  />
                  <h5 className="font-semibold text-lg">
                    Internships
                  </h5>
                  <p className="mt-3 text-slate-600">
                    Step into the world of innovation and growth. Our internships
                    offer hands-on experience and impactful projects tailored to
                    your passion.
                  </p>
                  <Link
                    to="/internships"
                    className="inline-flex items-center gap-2 mt-6 text-indigo-600 font-medium hover:text-indigo-700"
                  >
                    Get More Info
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>

              {/* Courses */}
              {data.courses.map((course, index) => (
                <div
                  className="flex"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <div className="bg-white text-center p-8 rounded-2xl shadow-sm hover:shadow-xl transition w-full">
                    <img
                      src={course.img}
                      alt={course.title}
                      className="w-20 mx-auto mb-6"
                    />
                    <h5 className="font-semibold text-lg">
                      {course.title}
                    </h5>
                    <p className="mt-3 text-slate-600">
                      {course.description}
                    </p>
                    <Link
                      to={course.path}
                      className="inline-flex items-center gap-2 mt-6 text-indigo-600 font-medium hover:text-indigo-700"
                    >
                      Get More Info
                      <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default Trainings;