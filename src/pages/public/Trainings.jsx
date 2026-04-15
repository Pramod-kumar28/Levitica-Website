import React from "react";
import data from '@/data/data.json';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Trainings = () => {
  return (
    <>
      <div className=" bg-white pt-20  ">

        {/* Header Section */}
        <section
        className="hero-section ptb-100 gradient-overlay"
        style={{
          background: "url('/img/header-bg-5.jpg') center / cover no-repeat",
        }}
      >
         <div
            className="hero-bottom-shape-two"
            style={{
              background: "url('img/hero-bottom-shape.svg') no-repeat bottom center",
            }}
          ></div>
        {/* overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/70" /> */}

        <div className="relative  max-w-4xl mx-auto px-4 text-center py-5 border">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our Courses
          </h1>
        </div>
      </section>

        {/* Trainings Section */}
        <section className="services-section bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4">

            {/* Section header */}
            <div className="flex justify-center">
              <div className="max-w-2xl text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">
                  We Provide Best Trainings
                </h2>
                <p className="mt-4 text-slate-600">
                  Efficiently aggregate end-to-end core competencies without
                  maintainable ideas. Dynamically foster tactical solutions
                  without enabled value.
                </p>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Internship Card */}
              <div className="flex">
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
                <div className="flex" key={index}>
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
