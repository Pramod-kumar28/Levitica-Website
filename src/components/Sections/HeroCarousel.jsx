import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import HeroSection from "./HeroSection";
import HeroSlideMarketing from "./HeroSlideMarketing";
import HeroSlideAI from "./HeroSlideAI";
import HeroITServices from "./HeroITServices";

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}  
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      className="hero-carousel"
    >
      <SwiperSlide>
        <HeroITServices/>
      </SwiperSlide>
      <SwiperSlide>
        <HeroSection />
      </SwiperSlide>

      <SwiperSlide>
        <HeroSlideMarketing isActive={activeIndex === 1} />
      </SwiperSlide>

      <SwiperSlide>
        <HeroSlideAI isActive={activeIndex === 2} />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;
