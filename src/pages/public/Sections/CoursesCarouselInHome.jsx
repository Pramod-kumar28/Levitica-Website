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
    {
      id: 5,
      title: "SEO Fundamentals & Advanced Strategies",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      excerpt: "Search Engine Optimization, keyword research, and ranking strategies.",
      link: "/trainings/digital-marketing/seo-fundamentals",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % courses.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused, courses.length]);

  return (
    <section className="bg-slate-50 py-8 lg:py-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Explore Our Popular Courses
          </h2>
          <p className="mt-4 text-gray-600">
            Enhance your skills with expert-led programs
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative h-[420px] flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {courses.map((course, index) => {
            const position = getPosition(index, current, courses.length);

            return (
              <div
                key={course.id}
                className={`
                  absolute will-change-transform
                  transition-all duration-700 ease-in-out
                  ${
                    position === "center" &&
                    "z-20 scale-100 sm:scale-110 opacity-100"
                  }
                  ${
                    position === "left" &&
                    "z-10 -translate-x-[85%] sm:-translate-x-[120%] scale-95 opacity-60 blur-sm"
                  }
                  ${
                    position === "right" &&
                    "z-10 translate-x-[85%] sm:translate-x-[120%] scale-95 opacity-60 blur-sm"
                  }
                  ${
                    position === "hidden" &&
                    "opacity-0 pointer-events-none scale-75"
                  }
                `}
              >
                <div className="bg-white rounded-xl shadow-xl w-[280px] sm:w-[320px] overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {course.excerpt}
                    </p>
                    <Link
                      to={course.link}
                      className="inline-block mt-4 text-blue-600 font-medium hover:underline"
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
        <div className="text-center mt-4">
          <Link
            to="/trainings"
            className="inline-block rounded-full border border-blue-600 px-6 py-3 font-medium text-white hover:text-white bg-blue-600 hover:bg-blue-800 transition"
          >
            View All Our Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesCarouselInHome;
