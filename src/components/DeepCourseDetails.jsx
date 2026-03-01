import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { coursesData, allCoursesList } from '../data/coursesData';

import {
  FaCheckCircle,
  FaClock,
  FaVideo,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";


const CourseDetails = () => {
  const { courseId, } = useParams();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };





  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourseData = () => {
      try {
        // Get course data based on URL parameter
    
        const courseKey = courseId || 'java-full-stack';
        const courseData = coursesData[courseKey];

        if (courseData) {
          setCourse(courseData);
        } else {
          // Redirect to default course if not found

        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading course data:", error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, navigate]);

  const handleCourseChange = (slug) => {
    

    navigate(`/trainings/${slug}`);
  };

  if (loading) {
    return <div className="container text-center py-5">Loading course details...</div>;
  }

  if (!course) {
    return <div className="container text-center py-5">Course not found.</div>;
  }

  return (<>
    <div className="main">
      {/* Header Section */}
      <section
        className="hero-section gradient-overlay tw-pt-12 tw-relative"
        style={{
          background: "url('/img/header-bg-5.jpg') center / cover no-repeat",
        }}
      >
        <div
          className="hero-bottom-shape-two"
          style={{
            background: "url('/img/hero-bottom-shape.svg') no-repeat bottom center",
          }}
        />

        <div className="tw-relative tw-max-w-4xl tw-mx-auto tw-px-4 tw-text-center tw-py-20">
          <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white">
            {course?.title}
          </h1>
        </div>
      </section>


      <section className="tw-bg-white">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-16">
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-10">
            <div className="lg:tw-col-span-8">
              <img
                src={course.image}
                alt={course.title}
                className="tw-w-full tw-h-[350px] tw-object-cover tw-rounded-xl tw-shadow"
              />

              <div className="tw-mt-8">
                <h2 className="tw-text-2xl tw-font-semibold tw-mb-4">
                  Course Overview
                </h2>

                {course.fullDescription.map((p, i) => (
                  <p key={i} className="tw-text-slate-600 tw-mb-4">
                    {p}
                  </p>
                ))}
              </div>

              {/* Features */}
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 tw-mt-10">
                <img
                  src="/img/about-1.jpg"
                  alt=""
                  className="tw-rounded-xl"
                />

                <ul className="tw-space-y-3">
                  {course.features.map((f, i) => (
                    <li key={i} className="tw-flex tw-gap-3 tw-items-start">
                      <FaCheckCircle className="tw-text-primary tw-mt-1" />
                      <span className="tw-text-slate-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

     

          <div className="lg:tw-col-span-4 tw-space-y-8">

          
              {/* All Courses List */}
              <div className="tw-border tw-rounded-xl tw-p-6">
                <h4 className="tw-font-semibold tw-mb-4">The Best Courses</h4>

                <ul className="tw-space-y-2">
                  {allCoursesList.map((c, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleCourseChange(c.slug)}
                        className={`tw-text-left tw-w-full tw-py-2 tw-text-sm ${c.title === course?.title
                          ? "tw-text-primary tw-font-semibold"
                          : "tw-text-slate-600 hover:tw-text-primary"
                          }`}
                      >
                        {c.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>


              {/* Course Enrollment Card */}
              <div className="tw-border tw-rounded-xl tw-p-6 tw-shadow-sm">
                <h4 className="tw-font-semibold tw-mb-2">Enroll Now</h4>

                <p className="tw-text-3xl tw-font-bold tw-text-primary">
                  {course.price}
                  <span className="tw-text-sm tw-text-slate-500"> only</span>
                </p>

                <div className="tw-mt-4 tw-space-y-2 tw-text-slate-600">
                  <p className="tw-flex tw-items-center tw-gap-2">
                    <FaClock /> {course.duration}
                  </p>
                  <p className="tw-flex tw-items-center tw-gap-2">
                    <FaVideo /> {course.mode}
                  </p>
                </div>

                <Link to="/sign-up">
                  <button className="btn outline-btn tw-w-full tw-mt-4">
                    Only Live Classes
                  </button>
                </Link>

                <Link to="/sign-up">
                  <button className="btn accent-solid-btn tw-w-full tw-mt-2">
                    Enroll
                  </button>
                </Link>
              </div>

              {/* Need Help */}
              <div className="tw-border tw-rounded-xl tw-p-6">
                <h4 className="tw-font-semibold tw-mb-3">Need Help?</h4>

                <ul className="tw-space-y-3 tw-text-slate-600">
                  <li className="tw-flex tw-gap-3">
                    <FaMapMarkerAlt /> Madhapur, Hyderabad
                  </li>
                  <li className="tw-flex tw-gap-3">
                    <FaPhoneAlt /> +91 7337572543
                  </li>
                  <li className="tw-flex tw-gap-3">
                    <FaEnvelope /> hr@designcareermetrics.com
                  </li>
                </ul>
              </div>

            </div>
          </div>
          </div>

        <div className="tw-max-w-4xl tw-mx-auto tw-my-8">
          {course.faqs.map((faq, i) => (
            <div
              key={i}
              className="tw-border tw-rounded-lg tw-mb-3"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="tw-w-full tw-flex tw-justify-between tw-items-center tw-p-4"
              >
                <span className="tw-font-medium">{faq.question}</span>
                <FaChevronDown
                  className={`tw-transition ${openIndex === i ? "tw-rotate-180" : ""
                    }`}
                />
              </button>

              {openIndex === i && (
                <div className="tw-px-4 tw-pb-4 tw-text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>


       <section className="call-to-action tw-py-12">
  <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
    <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-gap-6">

      {/* Text */}
      <div className="tw-text-center md:tw-text-left md:tw-max-w-xl">
        <h3 className="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-mb-2">
          Start Your Tech Career Today
        </h3>
        <p className="tw-text-slate-600">
          Join thousands of students who have transformed their careers with our courses.
        </p>
      </div>

      {/* Button */}
      <div className="tw-flex tw-justify-center md:tw-justify-end">
        <button className="btn secondary-solid-btn">
          Explore All Courses
        </button>
      </div>

    </div>
  </div>
</section>

      </section >




    </div >

  </>
  );
};

export default CourseDetails;