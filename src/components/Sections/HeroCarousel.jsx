import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import HeroSection from "./HeroSection";
import HeroSlideIT from "./HeroSlideIT";

const HeroCarousel = () => {
  return (
<Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: 4000, disableOnInteraction: false }}
  loop={true}
  pagination={{ clickable: true }}
  className="hero-carousel"
>

      <SwiperSlide>
        <HeroSection />
      </SwiperSlide>

      <SwiperSlide>
        <HeroSlideIT/>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;
