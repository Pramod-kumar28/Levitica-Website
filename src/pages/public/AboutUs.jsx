import { motion } from 'framer-motion';
import AboutHero from './Sections/Aboutsections/AboutHero';
import CompanyStory from './Sections/Aboutsections/CompanyStory';
import ItServices from './Sections/Aboutsections/ItServices';
import LearningPlatform from './Sections/Aboutsections/LearningPlatform';
import ConsultancyMarketing from './Sections/Aboutsections/ConsultancyMarketing';
import CoreValues from './Sections/Aboutsections/CoreValues';
import CeoMessage from './Sections/Aboutsections/CeoMessage';
import ConsultingCTA from './Sections/CallToActionSection';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white text-slate-800 pt-20"
    >
      
      <AboutHero />
      <CompanyStory />
      <ItServices />
      <LearningPlatform />
      <ConsultancyMarketing />
      <CoreValues />
      <CeoMessage />
    
      <ConsultingCTA />
    </motion.div>
  );
};

export default About;