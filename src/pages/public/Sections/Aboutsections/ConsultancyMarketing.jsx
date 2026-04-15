import { motion } from 'framer-motion';
import { FaBullhorn, FaUsers, FaHandshake, FaUserTie } from 'react-icons/fa6';
import { FaPhone, FaChartPie } from 'react-icons/fa';

const consultancyServices = [
  {
    icon: FaBullhorn,
    title: 'Digital Marketing Strategy',
    desc: 'Comprehensive marketing strategies including SEO, SEM, social media, and content marketing.',
    bgColor: 'from-orange-50 to-red-50',
    iconColor: 'text-orange-600',
  },
  {
    icon: FaPhone,
    title: 'Brand Development',
    desc: 'Build a powerful brand identity that resonates with your target audience.',
    bgColor: 'from-pink-50 to-rose-50',
    iconColor: 'text-pink-600',
  },
  {
    icon: FaChartPie,
    title: 'Sales Analytics & CRM',
    desc: 'Optimize your sales process with data-driven insights and CRM implementation.',
    bgColor: 'from-green-50 to-emerald-50',
    iconColor: 'text-green-600',
  },
  {
    icon: FaUsers,
    title: 'Lead Generation',
    desc: 'Targeted lead generation campaigns to grow your customer base and increase revenue.',
    bgColor: 'from-blue-50 to-indigo-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: FaHandshake,
    title: 'IT Consultancy',
    desc: 'Strategic IT advisory services to align technology with your business goals.',
    bgColor: 'from-purple-50 to-indigo-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: FaUserTie,
    title: 'Staffing Solutions',
    desc: 'Access to pre-vetted technical talent for your projects and permanent roles.',
    bgColor: 'from-amber-50 to-yellow-50',
    iconColor: 'text-amber-600',
  },
];

const ConsultancyMarketing = () => {
  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-orange-50 text-orange-600 mb-4 shadow-sm">
            <FaBullhorn className="text-orange-500" />
            <span className="font-medium">Consultancy & Marketing</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
            Drive Growth with
            <span className="text-gradient-to-r from-orange-600 to-red-600  block my-2">
              Strategic Business Solutions
            </span>
          </h2>

          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600">
            From marketing strategy to IT staffing, we help businesses scale and succeed
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {consultancyServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group bg-gradient-to-br ${service.bgColor} border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`mb-6 text-3xl ${service.iconColor}`}>
                  <Icon />
                </div>

                <h3 className="font-semibold text-xl mb-3 text-slate-800">
                  {service.title}
                </h3>

                <p className="leading-relaxed text-slate-600">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConsultancyMarketing;
