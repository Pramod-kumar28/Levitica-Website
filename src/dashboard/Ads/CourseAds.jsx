import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useCourses } from '@/hooks/useCourses';

const CourseAdsCarousel = () => {
  const navigate = useNavigate();
  const { courses = [], isLoading } = useCourses();

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

  if (isLoading)
    return (
      <div className="h-[180px] sm:h-[240px] flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading courses...</p>
      </div>
    );

  return (
    <div className="w-full rounded-xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="h-[200px] sm:h-[240px] md:h-[300px]"
      >
        {randomCourses.map((course) => {
          const isFree = course.price === 0;
          const originalPrice = isFree ? 0 : course.price + 5000;

          return (
            <SwiperSlide key={course._id}>
              <div
                className="h-full w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${course.thumbnail})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="px-4 sm:px-6 max-w-lg">

                    {/* Category */}
                    <p className="text-[11px] sm:text-xs text-yellow-400 uppercase">
                      {course.category}
                    </p>

                    {/* Title */}
                    <h2 className="text-sm sm:text-lg md:text-2xl font-semibold text-white leading-snug">
                      {course.name}
                    </h2>

                    {/* Short Description */}
                    <p className=" text-[11px] sm:text-sm text-white/90 line-clamp-2">
                      {course.shortdescription}
                    </p>

                    {/* Price */}
                    <div className="mt-2 flex items-center gap-2">
                      {isFree ? (
                        <span className="text-sm font-semibold text-green-400">
                          Free
                        </span>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base font-semibold text-white">
                            ₹{course.price}
                          </span>
                          <span className="line-through text-white/60 text-[10px] sm:text-xs">
                            ₹{originalPrice}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/course/${course._id}`)
                        }
                        className="bg-white text-black text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-md hover:bg-gray-100"
                      >
                        {isFree ? "Start" : "Enroll"}
                      </button>

                      <button
                        onClick={() =>
                          navigate("/dashboard/student/browsercourses")
                        }
                        className="border border-white text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-md hover:bg-white/10"
                      >
                        Browse
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CourseAdsCarousel;