import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { coursesAds } from '../../../data/coursesAds';

const CourseAdsCarousel = () => {
  const calculateDiscount = (original, current) => {
    const orig = parseInt(original);
    const curr = parseInt(current);
    return `${orig - curr} rs`;
  };

  return (
    <div className="tw-w-full tw-rounded-xl tw-overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="tw-h-[380px] sm:tw-h-[420px] md:tw-h-[460px]"
      >
        {coursesAds.map(course => (
          <SwiperSlide key={course.id}>
            <div
              className="tw-h-full tw-w-full tw-flex tw-items-center"
              style={{ background: course.gradient }}
            >
              {/* Overlay for contrast */}
              <div className="tw-w-full tw-h-full tw-bg-black/30">
                <div className="tw-max-w-7xl tw-mx-auto tw-h-full tw-px-4 sm:tw-px-6 tw-flex tw-items-center">
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 md:tw-gap-10 tw-items-center tw-w-full">

                    {/* LEFT CONTENT */}
                    <div className="tw-text-white">
                      <h2 className="
                        tw-text-xl
                        sm:tw-text-2xl
                        md:tw-text-3xl
                        lg:tw-text-4xl
                        tw-font-bold
                        tw-leading-tight
                      ">
                        {course.title}
                      </h2>

                      <p className="
                        tw-mt-2
                        sm:tw-mt-3
                        tw-text-sm
                        sm:tw-text-base
                        tw-text-white/90
                        tw-max-w-xl
                      ">
                        {course.description}
                      </p>

                      {/* FEATURES */}
                      <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mt-3 sm:tw-mt-4">
                        {course.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="
                              tw-bg-white/15
                              tw-backdrop-blur
                              tw-text-xs
                              sm:tw-text-sm
                              tw-px-3
                              tw-py-1
                              tw-rounded-full
                            "
                          >
                            ✓ {feature}
                          </span>
                        ))}
                      </div>

                      {/* META */}
                      <div className="
                        tw-flex
                        tw-gap-4
                        sm:tw-gap-6
                        tw-mt-3
                        sm:tw-mt-4
                        tw-text-xs
                        sm:tw-text-sm
                        tw-text-white/80
                      ">
                        <span>⏱ {course.duration}</span>
                        <span>👥 {course.students}</span>
                      </div>

                      {/* FOOTER */}
                      <div className="
                        tw-mt-5
                        sm:tw-mt-6
                        tw-flex
                        tw-flex-col
                        sm:tw-flex-row
                        sm:tw-items-center
                        tw-gap-4
                        sm:tw-gap-6
                      ">
                        {/* PRICE */}
                        <div>
                          <span className="
                            tw-text-xl
                            sm:tw-text-2xl
                            tw-font-bold
                          ">
                            ₹{course.price}
                          </span>
                          <span className="tw-ml-2 tw-line-through tw-text-white/70 tw-text-sm">
                            ₹{course.originalPrice}
                          </span>
                          <span className="
                            tw-ml-2
                            tw-text-green-300
                            tw-text-xs
                            sm:tw-text-sm
                            tw-font-medium
                          ">
                            Save {calculateDiscount(course.originalPrice, course.price)}
                          </span>
                        </div>

                        {/* BUTTONS */}
                        <div className="tw-flex tw-gap-3">
                          <button className="
                            tw-bg-white
                            tw-text-black
                            tw-font-medium
                            tw-px-4 sm:tw-px-5
                            tw-py-2
                            tw-rounded-lg
                            tw-text-sm sm:tw-text-base
                            hover:tw-bg-gray-100
                          ">
                            Enroll Now
                          </button>
                          <button className="
                            tw-border
                            tw-border-white
                            tw-text-white
                            tw-px-4 sm:tw-px-5
                            tw-py-2
                            tw-rounded-lg
                            tw-text-sm sm:tw-text-base
                            hover:tw-bg-white/10
                          ">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT VISUAL (hidden on mobile) */}
                    <div className="tw-hidden md:tw-flex tw-justify-center">
                      <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                        {course.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="
                              tw-bg-white/15
                              tw-backdrop-blur
                              tw-text-white
                              tw-px-4
                              tw-py-3
                              tw-rounded-xl
                              tw-text-sm
                              tw-text-center
                            "
                          >
                            {feature.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CourseAdsCarousel;
