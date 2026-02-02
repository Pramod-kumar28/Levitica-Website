import React from "react";
import data from "../data/data.json";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Trainings = () => {
  return (
    <>
      <div className="main tw-pt-24">

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
        {/* <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-slate-900/80 tw-to-slate-800/70" /> */}

        <div className="tw-relative  tw-max-w-4xl tw-mx-auto tw-px-4 tw-text-center tw-py-5 tw-border">
          <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white">
            Our Courses
          </h1>
        </div>
      </section>

        {/* Trainings Section */}
        <section className="services-section tw-bg-slate-50 tw-py-24">
          <div className="tw-max-w-7xl tw-mx-auto tw-px-4">

            {/* Section header */}
            <div className="tw-flex tw-justify-center">
              <div className="tw-max-w-2xl tw-text-center tw-mb-16">
                <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold">
                  We Provide Best Trainings
                </h2>
                <p className="tw-mt-4 tw-text-slate-600">
                  Efficiently aggregate end-to-end core competencies without
                  maintainable ideas. Dynamically foster tactical solutions
                  without enabled value.
                </p>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">

              {/* Internship Card */}
              <div className="tw-flex">
                <div className="tw-bg-white tw-text-center tw-p-8 tw-rounded-2xl tw-shadow-sm hover:tw-shadow-xl tw-transition tw-w-full">
                  <img
                    src="/img/internshipcard.svg"
                    alt="Internships"
                    className="tw-w-20 tw-mx-auto tw-mb-6"
                  />
                  <h5 className="tw-font-semibold tw-text-lg">
                    Internships
                  </h5>
                  <p className="tw-mt-3 tw-text-slate-600">
                    Step into the world of innovation and growth. Our internships
                    offer hands-on experience and impactful projects tailored to
                    your passion.
                  </p>
                  <Link
                    to="/internships"
                    className="tw-inline-flex tw-items-center tw-gap-2 tw-mt-6 tw-text-indigo-600 tw-font-medium hover:tw-text-indigo-700"
                  >
                    Get More Info
                    <FaArrowRight className="tw-text-sm" />
                  </Link>
                </div>
              </div>

              {/* Courses */}
              {data.courses.map((course, index) => (
                <div className="tw-flex" key={index}>
                  <div className="tw-bg-white tw-text-center tw-p-8 tw-rounded-2xl tw-shadow-sm hover:tw-shadow-xl tw-transition tw-w-full">
                    <img
                      src={course.img}
                      alt={course.title}
                      className="tw-w-20 tw-mx-auto tw-mb-6"
                    />
                    <h5 className="tw-font-semibold tw-text-lg">
                      {course.title}
                    </h5>
                    <p className="tw-mt-3 tw-text-slate-600">
                      {course.description}
                    </p>
                    <Link
                      to={course.path}
                      className="tw-inline-flex tw-items-center tw-gap-2 tw-mt-6 tw-text-indigo-600 tw-font-medium hover:tw-text-indigo-700"
                    >
                      Get More Info
                      <FaArrowRight className="tw-text-sm" />
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
