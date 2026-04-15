import { motion } from 'framer-motion';


const AboutHero = () => {
  return (
    
   <section
        className="hero-section gradient-overlay relative ptb-100"
        style={{
          background: "url('/img/header-bg-5.jpg') center / cover no-repeat",
        }}
      >
        <div
          className="hero-bottom-shape-two"
          style={{
            background: "url('/img/hero-bottom-shape.svg') no-repeat bottom center",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            About Levitica Technologies
          </motion.h1>
          <p className="mt-4 text-xl text-slate-200 max-w-2xl mx-auto">
            Technology, Talent & Transformation all under one roof.
          </p>

        </div>
      </section>    
  );
};

export default AboutHero;