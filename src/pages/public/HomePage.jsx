
import AboutUsSection from "./Sections/AboutSection";

import ManpowerSection from "./Sections/ManPowerSection";
import ConsultingCTA from "./Sections/CallToActionSection";
import TeamSection from "./TeamSection";

import ProductsShowcase from "./Sections/ProductSection";
import ServicesSection from "./Sections/Servicesection";
import HeroCarousel from "./Sections/HeroCarousel";
import CoursesCarouselInHome from "./Sections/CoursesCarouselInHome";
import HeroSection from "./Sections/HeroSection";

const Homepage = () => {
  return <>
    <div className="main">
    
      <HeroSection/>
      <ServicesSection/>
      <CoursesCarouselInHome/>
      <ProductsShowcase/>
      
      <AboutUsSection />

      <ManpowerSection  backgroundImage={'img/cta-bg.svg'}/>
      <TeamSection/>
      <ConsultingCTA />
    </div>
    
  </>
}

export default Homepage;