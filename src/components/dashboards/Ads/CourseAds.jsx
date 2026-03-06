import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../../hooks/useCourses";

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
      <div className="tw-h-[180px] sm:tw-h-[240px] tw-flex tw-items-center tw-justify-center">
        <p className="tw-text-sm tw-text-gray-500">Loading courses...</p>
      </div>
    );

  return (
    <div className="tw-w-full tw-rounded-xl tw-overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="tw-h-[200px] sm:tw-h-[240px] md:tw-h-[300px]"
      >
        {randomCourses.map((course) => {
          const isFree = course.price === 0;
          const originalPrice = isFree ? 0 : course.price + 5000;

          return (
            <SwiperSlide key={course._id}>
              <div
                className="tw-h-full tw-w-full tw-bg-cover tw-bg-center tw-relative"
                style={{ backgroundImage: `url(${course.thumbnail})` }}
              >
                {/* Overlay */}
                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-black/80 tw-via-black/40 tw-to-black/80" />

                {/* Content */}
                <div className="tw-relative tw-h-full tw-flex tw-items-center">
                  <div className="tw-px-4 sm:tw-px-6 tw-max-w-lg">

                    {/* Category */}
                    <p className="tw-text-[11px] sm:tw-text-xs tw-text-yellow-400 tw-uppercase">
                      {course.category}
                    </p>

                    {/* Title */}
                    <h2 className="tw-text-sm sm:tw-text-lg md:tw-text-2xl tw-font-semibold tw-text-white tw-leading-snug">
                      {course.name}
                    </h2>

                    {/* Short Description */}
                    <p className=" tw-text-[11px] sm:tw-text-sm tw-text-white/90 tw-line-clamp-2">
                      {course.shortdescription}
                    </p>

                    {/* Price */}
                    <div className="tw-mt-2 tw-flex tw-items-center tw-gap-2">
                      {isFree ? (
                        <span className="tw-text-sm tw-font-semibold tw-text-green-400">
                          Free
                        </span>
                      ) : (
                        <>
                          <span className="tw-text-sm sm:tw-text-base tw-font-semibold tw-text-white">
                            ₹{course.price}
                          </span>
                          <span className="tw-line-through tw-text-white/60 tw-text-[10px] sm:tw-text-xs">
                            ₹{originalPrice}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="tw-mt-2 tw-flex tw-gap-2 tw-flex-wrap">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/course/${course._id}`)
                        }
                        className="tw-bg-white tw-text-black tw-text-[11px] sm:tw-text-xs tw-font-medium tw-px-3 tw-py-1.5 tw-rounded-md hover:tw-bg-gray-100"
                      >
                        {isFree ? "Start" : "Enroll"}
                      </button>

                      <button
                        onClick={() =>
                          navigate("/dashboard/student/browsercourses")
                        }
                        className="tw-border tw-border-white tw-text-white tw-text-[11px] sm:tw-text-xs tw-px-3 tw-py-1.5 tw-rounded-md hover:tw-bg-white/10"
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