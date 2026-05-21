// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import { FaHeart, FaBrain, FaLeaf } from "react-icons/fa6";
// import { FaBalanceScale } from "react-icons/fa";

// const coreValues = [
//   {
//     icon: FaHeart,
//     title: "Client-Centric Approach",
//     desc: "Your success is our success. We measure our performance by your business outcomes.",
//     bgColor: "bg-rose-50",
//     borderColor: "border-rose-100",
//     iconColor: "text-rose-500",
//   },
//   {
//     icon: FaBrain,
//     title: "Innovation Driven",
//     desc: "Constantly exploring emerging technologies to deliver cutting-edge solutions.",
//     bgColor: "bg-indigo-50",
//     borderColor: "border-indigo-100",
//     iconColor: "text-indigo-500",
//   },
//   {
//     icon: FaBalanceScale,
//     title: "Integrity & Transparency",
//     desc: "Honest communication and ethical practices in every engagement.",
//     bgColor: "bg-emerald-50",
//     borderColor: "border-emerald-100",
//     iconColor: "text-emerald-500",
//   },
//   {
//     icon: FaLeaf,
//     title: "Sustainable Solutions",
//     desc: "Building technology that grows with you and stands the test of time.",
//     bgColor: "bg-green-50",
//     borderColor: "border-green-100",
//     iconColor: "text-green-500",
//   },
// ];

// const CoreValues = () => {

//   /* ✅ AOS INIT */
//   useEffect(() => {
//     AOS.init({
//       duration: 900,
//       easing: "ease-out-cubic",
//       once: false,
//       offset: 80,
//     });
//   }, []);

//   return (
//     <section className="py-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* HEADER */}
//         <div className="text-center mb-16">
//           <h2
//             data-aos="fade-up"
//             className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900"
//           >
//             Our Core Values
//           </h2>

//           <p
//             data-aos="fade-up"
//             data-aos-delay="100"
//             className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600"
//           >
//             The principles that guide every project and partnership
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

//           {coreValues.map((value, index) => {
//             const Icon = value.icon;

//             return (
//               <div
//                 key={index}
//                 data-aos="fade-up"
//                 data-aos-delay={index * 120}
//                 className={`${value.bgColor} border ${value.borderColor} rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
//               >
//                 <div className={`text-4xl mb-6 ${value.iconColor}`}>
//                   <Icon />
//                 </div>

//                 <h3 className="font-semibold text-xl mb-4 text-slate-800">
//                   {value.title}
//                 </h3>

//                 <p className="leading-relaxed text-slate-600">
//                   {value.desc}
//                 </p>
//               </div>
//             );
//           })}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default CoreValues;




























import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaRocket,
  FaCloud,
  FaGraduationCap,
  FaSyncAlt,
  FaSearch,
  FaCrosshairs,
  FaLightbulb,
  FaPlayCircle,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { FaShieldHeart } from "react-icons/fa6";

const CoreValues = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const differentiatorsList = [
    { icon: FaRocket, title: "Execution Focused", desc: "We don't just plan - we build. Ideas become production-ready products faster." },
    { icon: FaCloud, title: "Scalable Architecture", desc: "Solutions built to grow with your business from day one, handling millions of users." },
    { icon: FaGraduationCap, title: "Talent + Technology", desc: "Training, manpower, and solutions under one roof - complete ecosystem." },
    { icon: FaSyncAlt, title: "Agile Methodology", desc: "Iterative development with continuous feedback, ensuring you're always in the loop." },
    { icon: FaSearch, title: "Transparent Process", desc: "Complete visibility into project progress, costs, and timelines - no surprises." },
    { icon: FaShieldHeart, title: "Enterprise Security", desc: "Bank-grade security protocols across all solutions, protecting your data." },
  ];

  const industries = [
    { name: "Healthcare", desc: "Digital health solutions & telemedicine platforms", stats: "15+ Clients" },
    { name: "Education", desc: "LMS platforms & online learning solutions", stats: "50+ Institutions" },
    { name: "Finance", desc: "Fintech solutions & secure payment gateways", stats: "$2B+ Processed" },
    { name: "Retail", desc: "E-commerce platforms & inventory management", stats: "100+ Stores" },
    { name: "Manufacturing", desc: "IoT solutions & production automation", stats: "30+ Factories" },
    { name: "Startups", desc: "MVP development & scaling solutions", stats: "75+ Startups" },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % differentiatorsList.length);
      }, 4000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, differentiatorsList.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(true);
  };

  const currentItem = differentiatorsList[currentSlide];
  const Icon = currentItem.icon;

  return (
    <section className="py-10 bg-white dark:bg-darkmode border-b border-lightgray dark:border-dark_border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-sm mb-4">
            <FaPlayCircle className="w-3 h-3" />
            <span>Digital Transformation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Driving Digital
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Transformation
            </span>
          </h1>
          <p className="text-base text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            We combine technology, talent, and training to help businesses scale and succeed
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/10 dark:to-indigo-950/10 p-8 rounded-2xl border border-slate-100 dark:border-dark_border/20 shadow-sm" data-aos="fade-right">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <FaCrosshairs className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-2">Our Mission</h3>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
              To deliver high-quality, scalable, and secure technology solutions that solve real-world
              challenges, while empowering individuals through education and businesses through
              strategic consultancy.
            </p>
            <div className="flex items-center gap-2 text-blue-600 dark:text-cyan text-xs font-medium">
              <span>Impact-driven approach</span>
              <FaArrowRight className="w-3 h-3" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/10 dark:to-pink-950/10 p-8 rounded-2xl border border-slate-100 dark:border-dark_border/20 shadow-sm" data-aos="fade-left">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <FaLightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-2">Our Vision</h3>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
              To be the world's most trusted technology partner, empowering businesses with innovative
              solutions and creating a global community of skilled tech professionals.
            </p>
            <div className="flex items-center gap-2 text-purple-600 dark:text-cyan text-xs font-medium">
              <span>Global excellence</span>
              <FaArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Stats Section - Removed as requested */}

        {/* Why Choose Levitica - Auto-playing Carousel */}
        <div className="mb-20" data-aos="fade-up">
          <div className="text-center mb-8">
            <p className="text-blue-600 dark:text-cyan font-semibold text-sm mb-1">What Makes Us Different</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Why Choose Levitica?</h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-3"></div>
          </div>

          <div 
            className="relative max-w-3xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Carousel Content */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-semidark dark:to-semidark border border-slate-100 dark:border-dark_border/20 rounded-2xl p-8 md:p-10 text-center shadow-sm animate-fade-in">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-blue-600 dark:text-cyan" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{currentItem.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 text-base leading-relaxed max-w-2xl mx-auto">
                {currentItem.desc}
              </p>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-5">
              {differentiatorsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === idx 
                      ? "w-6 h-1.5 bg-blue-600 dark:bg-cyan" 
                      : "w-1.5 h-1.5 bg-blue-300 dark:bg-blue-900 hover:bg-blue-400 dark:hover:bg-blue-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Industries Section */}
        <div data-aos="fade-up">
          <div className="text-center mb-6">
            <p className="text-blue-600 dark:text-cyan font-semibold text-sm mb-1">Our Expertise</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Industries We Serve</h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-3"></div>
          </div>
          
          <div className="bg-gray-50 dark:bg-semidark border border-slate-100 dark:border-dark_border/20 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {industries.map((industry, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndustry(idx)}
                  className={`px-4 py-1.5 rounded-full transition-all text-sm ${
                    activeIndustry === idx
                      ? "btn btn-primary shadow-md"
                      : "bg-white dark:bg-darkmode text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-darklight border border-slate-100 dark:border-dark_border/20"
                  }`}
                >
                  {industry.name}
                </button>
              ))}
            </div>
            
            <div className="text-center py-4">
              <div className="text-4xl mb-3">
                {activeIndustry === 0 && "🏥"}
                {activeIndustry === 1 && "📚"}
                {activeIndustry === 2 && "💰"}
                {activeIndustry === 3 && "🛍️"}
                {activeIndustry === 4 && "🏭"}
                {activeIndustry === 5 && "🚀"}
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{industries[activeIndustry]?.name}</h4>
              <p className="text-gray-600 dark:text-slate-300 text-sm mb-2">{industries[activeIndustry]?.desc}</p>
              <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-cyan rounded-full text-xs font-medium">
                {industries[activeIndustry]?.stats}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoreValues;