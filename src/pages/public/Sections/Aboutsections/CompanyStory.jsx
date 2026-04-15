import { motion } from 'framer-motion';
import { FaLightbulb, FaChartLine } from 'react-icons/fa6';
import AboutUsLottie from '@/pages/public/lottie/AboutUsLottie';

const CompanyStory = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-700 mb-6 shadow-sm">
              <FaLightbulb className="text-blue-500" />
              <span className="font-medium tracking-wide">Our Story</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              Building Technology, Building Careers
            </h2>

            <div className="space-y-5">
              <p className="text-lg leading-relaxed text-slate-700">
                Levitica Technologies was established with a focused purpose to bridge the gap
                between business needs and technical excellence. We're not just a software
                development company; we're your strategic technology partner.
              </p>

              <p className="leading-relaxed text-slate-600">
                Our services span the entire technology spectrum: from custom software development,
                mobile apps, and AI solutions to cloud transformation and data analytics. Through
                Levitica Learn, our e-learning platform, we're democratizing tech education with
                industry-aligned courses and hands-on projects.
              </p>

              <p className="leading-relaxed text-slate-600">
                We also provide comprehensive consultancy services including digital marketing,
                brand development, sales analytics, and IT staffing. Whether you need to build a
                product, grow your team, or transform your business, we have the expertise to help
                you succeed.
              </p>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="max-w-md md:max-w-lg w-full">
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <AboutUsLottie />
              </div>

              <div className="mt-6 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-slate-800">
                  <FaChartLine className="text-blue-500" />
                  <span>One Stop Technology Partner</span>
                </h4>
                <p className="text-sm leading-relaxed text-slate-600">
                  From development and training to marketing and staffing we deliver end-to-end
                  solutions that drive real business outcomes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
