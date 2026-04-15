import { motion } from 'framer-motion';
import { FaCrosshairs, FaLightbulb, FaChartLine, FaUsers, FaRobot, FaBolt, FaBookOpen } from 'react-icons/fa6';
import { FaShieldAlt } from 'react-icons/fa';

const stats = [
  { number: '500+', label: 'Projects Completed', icon: FaChartLine },
  { number: '200+', label: 'Enterprise Clients', icon: FaUsers },
  { number: '50+', label: 'AI Models Deployed', icon: FaRobot },
  { number: '99.9%', label: 'System Uptime', icon: FaShieldAlt },
  { number: '10k+', label: 'Active Learners', icon: FaBookOpen },
  { number: '24/7', label: 'Technical Support', icon: FaBolt },
];

const MissionVision = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >

            {/* MISSION */}
            <div className="bg-white/70 border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-blue-100 mr-4">
                  <FaCrosshairs className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Our Mission
                </h2>
              </div>

              <p className="text-lg leading-relaxed text-slate-600">
                To deliver high-quality, scalable, and secure technology solutions that solve real-world
                challenges, while empowering individuals through education and businesses through
                strategic consultancy.
              </p>
            </div>

            {/* VISION */}
            <div className="bg-white/70 border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-cyan-100 mr-4">
                  <FaLightbulb className="w-6 h-6 text-cyan-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Our Vision
                </h2>
              </div>

              <p className="text-lg leading-relaxed text-slate-600">
                To be the world's most trusted technology partner, empowering businesses with innovative
                solutions and creating a global community of skilled tech professionals through
                accessible, quality education.
              </p>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-semibold mb-8 text-slate-900">
              Company Statistics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="bg-white/50 border border-slate-200/50 rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>

                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                      {stat.number}
                    </div>

                    <div className="text-sm text-slate-600">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;