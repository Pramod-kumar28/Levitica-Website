import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from '@/hooks/useCourses';

const getPosition = (index, current, total) => {
  if (index === current) return "center";
  if (index === (current - 1 + total) % total) return "left";
  if (index === (current + 1) % total) return "right";
  return "hidden";
};

const CourseAdsCarousel = () => {
  const navigate = useNavigate();
  const { courses = [], isLoading } = useCourses();

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const randomCourses = useMemo(() => {
    if (!courses.length) return [];
    const shuffled = [...courses].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, [courses]);

  useEffect(() => {
    if (paused || !randomCourses.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % randomCourses.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused, randomCourses.length]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray">
        Loading courses...
      </div>
    );
  }

  return (
    <div
      className="relative py-12 md:py-16 flex items-center justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full max-w-7xl h-[420px]">

        {randomCourses.map((course, index) => {
          const position = getPosition(index, current, randomCourses.length);
          const isFree = course.price === 0;

          return (
            <div
              key={course._id}
              className={`
                absolute left-1/2 top-0
                transition-all duration-700 ease-in-out
                ${position === "center" && "-translate-x-1/2 z-20 scale-105 opacity-100"}
                ${position === "left" && "-translate-x-[140%] z-10 scale-95 opacity-60 blur-sm"}
                ${position === "right" && "translate-x-[40%] z-10 scale-95 opacity-60 blur-sm"}
                ${position === "hidden" && "opacity-0 scale-90 pointer-events-none"}
              `}
            >
              {/* CARD */}
              <div className="
                bg-white dark:bg-semidark
                rounded-xl shadow-property
                border border-lightgray dark:border-dark_border
                w-[300px] md:w-[320px]
                overflow-hidden
                hover:shadow-deatail_shadow transition
              ">

                {/* IMAGE */}
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="h-44 w-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-6">

                  {/* TITLE (2 lines fixed) */}
                  <h3 className="
                    font-semibold text-lg text-midnight_text dark:text-white
                    line-clamp-2 min-h-[48px]
                  ">
                    {course.name}
                  </h3>

                  {/* DESCRIPTION (3 lines fixed) */}
                  <p className="
                    mt-2 text-sm text-gray
                    line-clamp-3 min-h-[60px]
                  ">
                    {course.shortdescription}
                  </p>

                  {/* PRICE */}
                  <div className="mt-3 text-sm font-semibold text-primary">
                    {isFree ? "Free Course" : `₹${course.price}`}
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => navigate(`/dashboard/course/${course._id}`)}
                    className="
                      mt-4 w-full py-2 rounded-lg
                      btn-primary
                    "
                  >
                    {isFree ? "Start Learning" : "Enroll Now"}
                  </button>

                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default CourseAdsCarousel;