import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import HeroSection from "./HeroSection";
import HeroSlideMarketing from "./HeroSlideMarketing";
import HeroSlideAI from "./HeroSlideAI";
import HeroITServices from "./HeroITServices";

const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      className="
        tw-w-full 
        tw-min-h-[100svh] 
        lg:tw-h-[90vh]
      "
    >
      <SwiperSlide><HeroITServices /></SwiperSlide>
      <SwiperSlide><HeroSection /></SwiperSlide>
      <SwiperSlide><HeroSlideMarketing /></SwiperSlide>
      <SwiperSlide><HeroSlideAI /></SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;