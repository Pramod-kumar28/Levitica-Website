import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

// import { coursesAds } from "../../../data/coursesAds";
const coursesAds = [
  {
    id: 1,
    title: "Java Full Stack Development",
    subtitle: "Become job-ready in 6 months",
    image: "/img/java-svgrepo-com.svg",
    price: "9999",
    originalPrice: "14999",
  }
]


const CourseAdsCarousel = () => {
  const navigate = useNavigate();

  return (
   <div className="tw-py-10">
     <div className="tw-w-full tw-rounded-2xl tw-overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="tw-h-[220px] sm:tw-h-[280px] md:tw-h-[340px]"
      >
        {coursesAds.map((course) => (
          <SwiperSlide key={course.id}>
            <div
              className="tw-h-full tw-w-full tw-bg-cover tw-bg-center tw-relative"
              style={{ backgroundImage: `url(${course.image})` }}
            >
              {/* Overlay */}
              <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-black/70 tw-via-black/30 tw-to-black/70" />

              {/* Content */}
              <div className="tw-relative tw-h-full tw-flex tw-items-center">
                <div className="tw-px-5 sm:tw-px-8 md:tw-px-12 tw-max-w-xl">
                  <h2 className="tw-text-xl sm:tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-white">
                    {course.title}
                  </h2>

                  <p className="tw-mt-2 tw-text-sm sm:tw-text-base tw-text-white/90">
                    {course.subtitle}
                  </p>

                  {/* Price */}
                  <div className="tw-mt-3 tw-flex tw-items-center tw-gap-3">
                    <span className="tw-text-lg sm:tw-text-xl tw-font-bold tw-text-white">
                      ₹{course.price}
                    </span>
                    <span className="tw-line-through tw-text-white/60 tw-text-sm">
                      ₹{course.originalPrice}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="tw-mt-4 tw-flex tw-gap-3">
                    <button
                      onClick={() => navigate("/dashboard/student/allcourses")}
                      className="tw-bg-white tw-text-black tw-font-medium tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm hover:tw-bg-gray-100"
                    >
                      Enroll Now
                    </button>

                    <button
                      onClick={() => navigate("/dashboard/student/browsercourses")}
                      className="tw-border tw-border-white tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm hover:tw-bg-white/10"
                    >
                      Browse Courses
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
   </div>
  );
};

export default CourseAdsCarousel;
