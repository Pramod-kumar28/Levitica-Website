import { motion } from 'framer-motion';
import { FaHeart, FaChartLine, FaBuilding, FaGlobe, FaStore, FaIndustry, FaRocket } from 'react-icons/fa6';
import { FaUniversity } from 'react-icons/fa';

const industries = [
  { name: 'Healthcare', icon: FaHeart, color: 'bg-red-100 text-red-600' },
  { name: 'Education', icon: FaUniversity, color: 'bg-blue-100 text-blue-600' },
  { name: 'Finance', icon: FaChartLine, color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Retail', icon: FaStore, color: 'bg-amber-100 text-amber-600' },
  { name: 'Manufacturing', icon: FaIndustry, color: 'bg-cyan-100 text-cyan-600' },
  { name: 'Startups', icon: FaRocket, color: 'bg-purple-100 text-purple-600' },
  { name: 'Real Estate', icon: FaBuilding, color: 'bg-slate-100 text-slate-600' },
  { name: 'Logistics', icon: FaGlobe, color: 'bg-indigo-100 text-indigo-600' },
];

const IndustriesServed = () => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 text-slate-900">
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Industries We Serve
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-600">
            Focused solutions across diverse business domains
          </p>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className={`${industry.color} px-4 md:px-5 py-2 md:py-2.5 rounded-full flex items-center gap-2 text-sm md:text-base font-medium hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer`}
              >
                <span className="text-base md:text-lg">
                  <Icon />
                </span>
                <span>{industry.name}</span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default IndustriesServed;