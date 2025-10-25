import React from "react";
import data from "../data/data.json";
import { Link } from "react-router-dom";
import Footer from "./Footer";


const Trainings = () => {
  return (
    <>
      <div className="main pt-100">
        {/* Header Section */}
        <section
          className="hero-section ptb-100 gradient-overlay"
          style={{
            background: "url('img/header-bg-5.jpg') no-repeat center center / cover",
          }}
        >
          <div
            className="hero-bottom-shape-two"
            style={{
              background: "url('img/hero-bottom-shape.svg') no-repeat bottom center",
            }}
          ></div>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-7">
                <div className="page-header-content text-white text-center pt-sm-5 pt-md-5 pt-lg-0">
                  <h1 className="text-white mb-0">Our Courses</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top-level Courses (Communication, Cybersecurity, etc.) */}
        <section className="services-section ptb-100 gray-light-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="section-heading text-center mb-5">
                  <h2>We Provide Best Trainings</h2>
                  <p className="lead">
                    Efficiently aggregate end-to-end core competencies without maintainable ideas. Dynamically
                    foster tactical solutions without enabled value.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6 d-flex" >
                  <div className="services-single animated-hover text-center p-5 my-md-3 my-lg-3 my-sm-0 shadow-sm white-bg rounded w-100">
                    <img src="/img/internshipcard.svg" alt="" width="80" className="mb-3" />
                    <h5>Internships</h5>
                    <p className="mb-2">Step into the world of innovation and growth. Our internships offer hands-on experience, and a chance to work on impactful projects. Whether you're exploring design, development, marketing, or research, there's a role tailored to your passion.</p>
                    <Link to="/internships" className="detail-link mt-4">
                      Get More Info <span className="ti-arrow-right"></span>
                    </Link>
                  </div>
                </div>
              {data.courses.map((course, index) => (
                <div className="col-lg-4 col-md-6 col-sm-6 d-flex" key={index}>
                  <div className="services-single animated-hover text-center p-5 my-md-3 my-lg-3 my-sm-0 shadow-sm white-bg rounded w-100">
                    <img src={course.img} alt={course.title} width="80" className="mb-3" />
                    <h5>{course.title}</h5>
                    <p className="mb-2">{course.description}</p>
                    <Link to={course.path} className="detail-link mt-4">
                      Get More Info <span className="ti-arrow-right"></span>
                    </Link>
                  </div>
                </div>
              ))} 
            </div>
          </div>
        </section>

        
      </div>

      <Footer />
    </>
  );
};

export default Trainings;
