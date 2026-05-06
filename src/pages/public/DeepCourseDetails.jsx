import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesData } from '@/data/coursesData';

import {
  FaCheckCircle,
  FaChevronRight,
  FaQuestionCircle,
  FaClock,
  FaVideo,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    const data = coursesData[courseId || "java-full-stack"];
    setCourse(data || null);
    setLoading(false);
  }, [courseId]);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  if (loading) return <div className="text-center py-24">Loading...</div>;
  if (!course) return <div className="text-center py-24">Course not found.</div>;

  return (
    <div className="bg-white pt-10">

      {/* ===== HERO (EXACT SAME AS SERVICE) ===== */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-white to-herobg">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 items-center">

          <div className="col-span-8" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold text-midnight_text">
              {course.title}
            </h1>
          </div>

          <div className="col-span-4 flex justify-start md:justify-center mt-6 md:mt-0" data-aos="fade-left">
            <img
              src={course.image}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* ===== MAIN ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* COVER IMAGE */}
          <div data-aos="zoom-in" className="mb-16 h-[350px] overflow-hidden rounded-2xl">
            <img src={course.image} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap -mx-4">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-8/12 px-4">
              <div className="xl:pr-10">

                {/* DESCRIPTION */}
                <p className="text-lg text-gray mb-10" data-aos="fade-up">
                  {course.fullDescription?.[0]}
                </p>

                {/* FEATURES → SAME AS SERVICE CARDS */}
                <h3 className="text-2xl text-slate-900 font-semibold mb-6" data-aos="fade-up">
                  Course Features
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {course.features.map((f, i) => (
                    <div
                      key={i}
                      data-aos="fade-up"
                      data-aos-delay={i * 120}
                      className="bg-white p-6 rounded-xl shadow-property hover:shadow-deatail_shadow transition"
                    >
                      <div className="flex gap-3">
                        <FaCheckCircle className="text-primary mt-1" />
                        <span>{f}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BENEFITS STYLE (reuse structure) */}
                <div className="grid md:grid-cols-2 gap-10 mt-14">

                  <div data-aos="fade-right">
                    <h4 className="font-semibold text-lg mb-4">Duration</h4>
                    <div className="flex gap-2">
                      <FaClock className="text-primary mt-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div data-aos="fade-left">
                    <h4 className="font-semibold text-lg mb-4">Mode</h4>
                    <div className="flex gap-2">
                      <FaVideo className="text-primary mt-1" />
                      <span>{course.mode}</span>
                    </div>
                  </div>

                </div>

                {/* FAQ SAME STYLE */}
                <h3 className="mt-16 text-slate-900 text-xl font-semibold" data-aos="fade-up">
                  FAQs
                </h3>

                <div className="mt-6 space-y-4">
                  {course.faqs.map((faq, i) => (
                    <div
                      key={i}
                      data-aos="fade-up"
                      className="bg-light rounded-lg"
                    >
                      <button
                        onClick={() => toggleFAQ(i)}
                        className="w-full flex items-center gap-3 p-4 text-left"
                      >
                        <FaQuestionCircle className="text-primary" />
                        {faq.question}
                      </button>

                      {openIndex === i && (
                        <div className="px-4 pb-4 text-gray">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* ===== SIDEBAR (COPY OF SERVICE) ===== */}
            <div className="w-full lg:w-4/12 px-4 mt-12 lg:mt-0">

              <div data-aos="fade-left" className="bg-white p-8 rounded-xl shadow-property mb-8">
                <h3 className="text-lg text-slate-900 font-semibold mb-4">Enroll</h3>

                <p className="text-3xl font-bold text-primary">
                  {course.price}
                </p>

                <button className="btn accent-solid-btn w-full mt-4">
                  Enroll Now
                </button>
              </div>

              <div data-aos="fade-left" data-aos-delay="150" className="bg-white p-8 rounded-xl shadow-property">
                <h3 className="text-lg text-slate-900 font-semibold mb-4">Newsletter</h3>

                <input className="w-full p-3 rounded-lg bg-light mb-3" />
                <button className="w-full bg-primary py-3 text-white rounded-lg">
                  Subscribe
                </button>
              </div>

              <div data-aos="fade-left" data-aos-delay="250" className="bg-light p-6 rounded-xl mt-8">
                <h4 className="font-semibold mb-4">Need Help?</h4>

                <div className="space-y-3 text-sm text-gray">
                  <div className="flex gap-2"><FaMapMarkerAlt /> Hyderabad</div>
                  <div className="flex gap-2"><FaPhoneAlt /> +91 9032503559</div>
                  <div className="flex gap-2"><FaEnvelope /> hr@levitica.com</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default CourseDetails;