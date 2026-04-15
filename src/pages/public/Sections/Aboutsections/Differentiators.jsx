import { motion } from 'framer-motion';
import { FaRocket, FaCloud, FaGraduationCap, FaShieldHeart } from 'react-icons/fa6';
import { FaSyncAlt, FaSearch } from 'react-icons/fa';

const differentiators = [
  {
    icon: FaRocket,
    title: 'Execution Focused',
    desc: 'We turn ideas into production-ready digital products.',
    bgColor: 'from-blue-50 to-indigo-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: FaCloud,
    title: 'Scalable Architecture',
    desc: 'Built to grow with your business from day one.',
    bgColor: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: FaGraduationCap,
    title: 'Talent + Technology',
    desc: 'Training, manpower, and solutions under one roof.',
    bgColor: 'from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: FaSyncAlt,
    title: 'Agile Methodology',
    desc: 'Iterative development with continuous feedback loops.',
    bgColor: 'from-amber-50 to-orange-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: FaSearch,
    title: 'Transparent Process',
    desc: 'Complete visibility into project progress and costs.',
    bgColor: 'from-rose-50 to-red-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: FaShieldHeart,
    title: 'Enterprise Security',
    desc: 'Bank-grade security protocols across all solutions.',
    bgColor: 'from-slate-50 to-gray-50',
    iconColor: 'text-gray-600',
  },
];

const Differentiators = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
            Why Choose Levitica Technologies?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600">
            Unique advantages that set us apart in the technology landscape
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group bg-gradient-to-br ${d.bgColor} border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`mb-6 text-4xl ${d.iconColor}`}>
                  <Icon />
                </div>

                <h4 className="font-semibold text-xl mb-4 text-slate-800">
                  {d.title}
                </h4>

                <p className="leading-relaxed text-slate-600">
                  {d.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;