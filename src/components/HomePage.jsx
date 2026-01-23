
import AboutUsSection from "./Sections/AboutSection";
import HeroSection from "./Sections/HeroSection";
import PromoSection from "./Sections/PromoSection";
import ManpowerSection from "./Sections/ManPowerSection";
import ConsultingCTA from "./Sections/CallToActionSection";
import TeamSection from "./TeamSection";
import ProductsSection from "./Sections/ProductSection";
import BlogSection from "./Sections/CoursesCarouselInHome";
import ProductsShowcase from "./Sections/ProductSection";
import ServicesSection from "./Sections/Servicesection";
import HeroCarousel from "./Sections/HeroCarousel";

const Homepage = () => {
  return <>
    <div className="main">
      {/* <HeroSection /> */}
      <HeroCarousel/>
      {/* <PromoSection /> */}
      <ServicesSection/>
      <BlogSection/>
      {/* <CommentsSection/> */}
      <ProductsShowcase/>
      
      <AboutUsSection />

      <ManpowerSection  backgroundImage={'img/cta-bg.svg'}/>
      <TeamSection/>
      <ConsultingCTA />
    </div>
    
  </>
}

export default Homepage;