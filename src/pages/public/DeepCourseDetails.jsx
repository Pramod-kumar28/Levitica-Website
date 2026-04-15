import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { coursesData, allCoursesList } from '@/data/coursesData';

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
    <div className="">
      {/* Header Section */}
      <section
        className="hero-section gradient-overlay py-14 relative"
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

        <div className="relative max-w-4xl mx-auto px-4 text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {course?.title}
          </h1>
        </div>
      </section>


      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-[350px] object-cover rounded-xl shadow"
              />

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Course Overview
                </h2>

                {course.fullDescription.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-4">
                    {p}
                  </p>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <img
                  src="/img/about-1.jpg"
                  alt=""
                  className="rounded-xl"
                />

                <ul className="space-y-3">
                  {course.features.map((f, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <FaCheckCircle className="text-primary mt-1" />
                      <span className="text-slate-700">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

     

          <div className="lg:col-span-4 space-y-8">

          
              {/* All Courses List */}
              <div className="border rounded-xl p-6">
                <h4 className="font-semibold mb-4">The Best Courses</h4>

                <ul className="space-y-2">
                  {allCoursesList.map((c, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleCourseChange(c.slug)}
                        className={`text-left w-full py-2 text-sm ${c.title === course?.title
                          ? "text-primary font-semibold"
                          : "text-slate-600 hover:text-primary"
                          }`}
                      >
                        {c.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>


              {/* Course Enrollment Card */}
              <div className="border rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold mb-2">Enroll Now</h4>

                <p className="text-3xl font-bold text-primary">
                  {course.price}
                  <span className="text-sm text-slate-500"> only</span>
                </p>

                <div className="mt-4 space-y-2 text-slate-600">
                  <p className="flex items-center gap-2">
                    <FaClock /> {course.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaVideo /> {course.mode}
                  </p>
                </div>

                <Link to="/sign-up">
                  <button className="btn outline-btn w-full mt-4">
                    Only Live Classes
                  </button>
                </Link>

                <Link to="/sign-up">
                  <button className="btn accent-solid-btn w-full mt-2">
                    Enroll
                  </button>
                </Link>
              </div>

              {/* Need Help */}
              <div className="border rounded-xl p-6">
                <h4 className="font-semibold mb-3">Need Help?</h4>

                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-3">
                    <FaMapMarkerAlt /> Madhapur, Hyderabad
                  </li>
                  <li className="flex gap-3">
                    <FaPhoneAlt /> +91 9032503559
                  </li>
                  <li className="flex gap-3">
                    <FaEnvelope /> hr@leviticatechnologies.com
                  </li>
                </ul>
              </div>

            </div>
          </div>
          </div>

        <div className="max-w-4xl mx-auto my-8">
          {course.faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-lg mb-3"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center p-4"
              >
                <span className="font-medium">{faq.question}</span>
                <FaChevronDown
                  className={`transition ${openIndex === i ? "rotate-180" : ""
                    }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-4 pb-4 text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>


       <section className="call-to-action py-12">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

      {/* Text */}
      <div className="text-center md:text-left md:max-w-xl">
        <h3 className="text-2xl md:text-3xl font-semibold mb-2">
          Start Your Tech Career Today
        </h3>
        <p className="text-slate-600">
          Join thousands of students who have transformed their careers with our courses.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-center md:justify-end">
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