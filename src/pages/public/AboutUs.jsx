import { motion } from 'framer-motion';
import AboutHero from './Sections/Aboutsections/AboutHero';
import CompanyStory from './Sections/Aboutsections/CompanyStory';
import ItServices from './Sections/Aboutsections/ItServices';
import LearningPlatform from './Sections/Aboutsections/LearningPlatform';
import ConsultancyMarketing from './Sections/Aboutsections/ConsultancyMarketing';
import CoreValues from './Sections/Aboutsections/CoreValues';
import Differentiators from './Sections/Aboutsections/Differentiators';
import MissionVision from './Sections/Aboutsections/MissionVision';
import CeoMessage from './Sections/Aboutsections/CeoMessage';
import Timeline from './Sections/Aboutsections/Timeline';
import IndustriesServed from './Sections/Aboutsections/IndustriesServed';
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
      {/* <Differentiators />
      
      <MissionVision /> */}
      <CeoMessage />
      {/* <IndustriesServed /> */}
    
      <ConsultingCTA />
    </motion.div>
  );
};

export default About;