import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaCloud, FaDatabase, FaLaptopCode } from 'react-icons/fa6';
import { FaMobileAlt } from 'react-icons/fa';

const itServices = [
  {
    icon: <FaCode />,
    title: 'Custom Software Development',
    desc: 'Tailored enterprise software solutions that align perfectly with your business processes and goals.',
    bgColor: 'from-blue-50 to-indigo-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: <FaMobileAlt />,
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile applications for iOS and Android with stunning UI/UX.',
    bgColor: 'from-cyan-50 to-blue-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: <FaLaptopCode />,
    title: 'Web Development',
    desc: 'Responsive, high-performance websites and web applications using modern frameworks.',
    bgColor: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: <FaRobot />,
    title: 'AI & Machine Learning',
    desc: 'Intelligent systems that streamline operations, predict outcomes, and unlock new insights.',
    bgColor: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: <FaCloud />,
    title: 'Cloud Transformation',
    desc: 'Scalable cloud infrastructure and migration strategies for modern businesses.',
    bgColor: 'from-cyan-50 to-blue-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: <FaDatabase />,
    title: 'Data Analytics & BI',
    desc: 'Turn your data into actionable insights with advanced analytics and business intelligence.',
    bgColor: 'from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-600',
  },
];

const ItServices = () => {
  return (
    <section className=" py-8  md:py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              IT Services
            </span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600">
            Comprehensive technology solutions to power your digital transformation
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {itServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`group bg-gradient-to-br ${service.bgColor} border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className={`mb-6 text-3xl ${service.iconColor}`}>
                {service.icon}
              </div>

              <h3 className="font-semibold text-xl mb-3 text-slate-800">
                {service.title}
              </h3>

              <p className="leading-relaxed text-slate-600">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItServices;
