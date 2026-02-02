import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const getPosition = (index, current, total) => {
  if (index === current) return "center";
  if (index === (current - 1 + total) % total) return "left";
  if (index === (current + 1) % total) return "right";
  return "hidden";
};

const CoursesCarouselInHome = () => {
  const courses = [
    {
      id: 1,
      title: "MERN Stack Development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
      excerpt: "Master MongoDB, Express, React, and Node.js.",
      link: "/trainings/web-development/mern-stack-development",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      excerpt: "Supervised, unsupervised learning & neural networks.",
      link: "/trainings/data-science/machine-learning",
    },
    {
      id: 3,
      title: "Advanced AI & Deep Learning",
      image: "/img/ai-cloud-with-robot-head.jpg",
      excerpt: "NLP, Computer Vision, Deep Learning.",
      link: "/trainings/data-science/artificial-intelligence",
    },
    {
      id: 4,
      title: "Java Full Stack Mastery",
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b",
      excerpt: "Spring Boot, Hibernate, REST APIs.",
      link: "/trainings/web-development/java-full-stack",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % courses.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="tw-bg-slate-50 tw-py-12 tw-overflow-x-hidden">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
        {/* Header */}
        <div className="tw-text-center tw-mb-8">
          <h2 className="tw-text-3xl sm:tw-text-4xl md:tw-text-5xl tw-font-bold">
            Explore Our Popular Courses
          </h2>
          <p className="tw-mt-4 tw-text-gray-600">
            Enhance your skills with expert-led programs
          </p>
        </div>

        {/* Carousel */}
        <div className="tw-relative tw-h-[420px] tw-flex tw-items-center tw-justify-center tw-overflow-x-hidden">
          {courses.map((course, index) => {
            const position = getPosition(index, current, courses.length);

            return (
              <div
                key={course.id}
                className={`
                  tw-absolute tw-transition-all tw-duration-700 tw-ease-in-out
                  ${
                    position === "center" &&
                    "tw-z-20 tw-scale-100 sm:tw-scale-110 tw-opacity-100"
                  }
                  ${
                    position === "left" &&
                    "tw-z-10 -tw-translate-x-[90%] sm:-tw-translate-x-[120%] tw-scale-95 sm:tw-scale-90 tw-opacity-60 tw-blur-sm"
                  }
                  ${
                    position === "right" &&
                    "tw-z-10 tw-translate-x-[90%] sm:tw-translate-x-[120%] tw-scale-95 sm:tw-scale-90 tw-opacity-60 tw-blur-sm"
                  }
                  ${
                    position === "hidden" &&
                    "tw-opacity-0 tw-pointer-events-none"
                  }
                `}
              >
                <div
                  className="
                    tw-bg-white tw-rounded-xl tw-shadow-xl
                    tw-w-[280px] sm:tw-w-[320px]
                    tw-overflow-hidden
                  "
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="tw-h-44 tw-w-full tw-object-cover"
                  />
                  <div className="tw-p-6">
                    <h3 className="tw-font-semibold tw-text-lg">
                      {course.title}
                    </h3>
                    <p className="tw-mt-2 tw-text-sm tw-text-gray-600">
                      {course.excerpt}
                    </p>
                    <Link
                      to={course.link}
                      className="tw-inline-block tw-mt-4 tw-text-blue-600 tw-font-medium hover:tw-underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="tw-text-center tw-mt-16">
          <Link
            to="/trainings"
            className="tw-inline-block tw-rounded-full tw-border tw-border-blue-600 tw-px-6 tw-py-3 tw-font-medium tw-text-blue-600 hover:tw-bg-blue-600 hover:tw-text-white tw-transition"
          >
            View All Our Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesCarouselInHome;
