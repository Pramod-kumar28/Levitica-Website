import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from '@/hooks/useCourses';
import { useTheme } from '@/context/ThemeContext';

const getPosition = (index, current, total) => {
  if (index === current) return "center";
  if (index === (current - 1 + total) % total) return "left";
  if (index === (current + 1) % total) return "right";
  return "hidden";
};

const CourseAdsCarousel = () => {
  const navigate = useNavigate();
  const { courses = [], isLoading } = useCourses();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Better randomization
  const randomCourses = useMemo(() => {
    if (!courses.length) return [];

    const shuffled = [...courses];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5);
  }, [courses]);

  useEffect(() => {
    if (paused || !randomCourses.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % randomCourses.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused, randomCourses.length]);

  if (isLoading)
    return (
      <div className="h-[220px] md:h-[300px] flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading courses...</p>
      </div>
    );

  return (
    <div
      className="relative h-[340px] sm:h-[380px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {randomCourses.map((course, index) => {
        const position = getPosition(index, current, randomCourses.length);
        const isFree = course.price === 0;
        const originalPrice = isFree ? 0 : course.price + 5000;

        return (
          <div
            key={course._id}
            className={`
              absolute will-change-transform
              transition-all duration-700 ease-in-out
              ${
                position === "center" &&
                "z-20 scale-100 sm:scale-110 opacity-100"
              }
              ${
                position === "left" &&
                "z-10 -translate-x-[400px] sm:-translate-x-[500px] scale-95 opacity-50 blur-sm"
              }
              ${
                position === "right" &&
                "z-10 translate-x-[400px] sm:translate-x-[500px] scale-95 opacity-50 blur-sm"
              }
              ${
                position === "hidden" &&
                "opacity-0 pointer-events-none scale-75"
              }
            `}
          >
            <div className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-[300px] sm:w-[340px] border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                  {course.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className={`font-bold text-base mt-1 line-clamp-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                  {course.name}
                </h3>
                <p className={`mt-2 text-xs line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  {course.shortdescription}
                </p>
                
                {/* Price */}
                <div className={`mt-4 flex items-center gap-2 pb-3 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                  {isFree ? (
                    <span className="text-sm font-bold text-green-500">
                      Free Access
                    </span>
                  ) : (
                    <>
                      <span className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                        ₹{course.price}
                      </span>
                      <span className={`line-through text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                        ₹{originalPrice}
                      </span>
                    </>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/course/${course._id}`)}
                    className={`${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white text-xs font-semibold px-3 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex-1`}
                  >
                    {isFree ? "Start" : "Enroll"}
                  </button>
                  <button
                    onClick={() => navigate("/dashboard/student/browsercourses")}
                    className={`border-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 flex-1 ${
                      isDark 
                        ? 'border-blue-500 text-blue-400 hover:bg-blue-500/10' 
                        : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => navigate("/dashboard/student/browsercourses")}
                    className="border-2 border-blue-600 text-blue-600 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 flex-1"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseAdsCarousel;