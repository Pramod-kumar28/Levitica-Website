import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaVideo, FaCertificate, FaArrowRight } from 'react-icons/fa6';
import { FaChalkboardTeacher } from 'react-icons/fa';

const learningServices = [
  {
    icon: FaBookOpen,
    title: 'Comprehensive Tech Courses',
    desc: 'Full-stack development, AI/ML, cloud computing, cybersecurity, and more.',
    bgColor: 'from-blue-50 to-indigo-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: FaVideo,
    title: 'Interactive Video Lectures',
    desc: 'High-quality video content with hands-on coding exercises and real-world projects.',
    bgColor: 'from-purple-50 to-pink-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: FaCertificate,
    title: 'Industry-Recognized Certifications',
    desc: 'Earn certificates that validate your skills and boost your career prospects.',
    bgColor: 'from-amber-50 to-orange-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: FaChalkboardTeacher,
    title: 'Live Mentorship Sessions',
    desc: 'Learn from industry experts with personalized guidance and career coaching.',
    bgColor: 'from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-600',
  },
];

const LearningPlatform = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-cyan-50 text-cyan-600 mb-4 shadow-sm">
            <FaBookOpen className="text-cyan-500" />
            <span className="font-medium">Levitica Learn</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
            Transform Your Career with
            <span className="text-gradient-to-r from-cyan-600 to-blue-600  block mt-2">
              Industry Aligned Learning
            </span>
          </h2>

          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600">
            Our e-learning platform offers comprehensive tech courses designed by industry experts
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {learningServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`bg-gradient-to-br ${service.bgColor} border border-slate-200 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.iconColor} bg-white shadow-md mb-4 text-2xl`}>
                  <Icon />
                </div>

                <h3 className="font-semibold text-lg mb-2 text-slate-800">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/learn"
            className="inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 hover:text-white text-white shadow-lg hover:shadow-xl"
          >
            Start Learning Today
            <FaArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearningPlatform;
