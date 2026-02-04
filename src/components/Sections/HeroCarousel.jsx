import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

import HeroSection from "./HeroSection";
import HeroSlideMarketing from "./HeroSlideMarketing";
import HeroSlideAI from "./HeroSlideAI";

const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      className="hero-carousel"
    >
      <SwiperSlide>
        <HeroSection />
      </SwiperSlide>

      <SwiperSlide>
        <HeroSlideMarketing />
      </SwiperSlide>

      <SwiperSlide>
        <HeroSlideAI />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;
