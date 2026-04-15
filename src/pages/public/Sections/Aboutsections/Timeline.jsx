import { motion } from 'framer-motion';

const milestones = [
  { year: '2013', title: 'Company Founded', description: 'Established with a vision to transform businesses through intelligent technology solutions.' },
  { year: '2023', title: 'First AI Implementation', description: 'Deployed our first machine learning model for predictive analytics in healthcare.' },
  { year: '2024', title: 'Cloud First Strategy', description: 'Transitioned to cloud native architecture, enabling 10x scalability for our clients.' },
  { year: '2025', title: 'AI Innovation Lab', description: 'Launched dedicated AI research lab focusing on generative AI and automation.' },
  { year: '2025', title: 'Levitica Learn Launch', description: 'Launched our comprehensive e-learning platform for tech professionals and students.' },
  { year: '2026', title: 'Global Expansion', description: 'Extended operations to serve enterprise clients across North America and Europe.' },
];

const Timeline = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6 text-slate-900">
            Our Journey of Innovation
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600">
            Key milestones in our evolution from startup to comprehensive technology partner
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-600 to-blue-800"></div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start`}
              >

                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white/70 border border-slate-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">

                    <div className="font-semibold text-lg md:text-xl mb-2 text-blue-600">
                      {milestone.year}
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-slate-900">
                      {milestone.title}
                    </h3>

                    <p className="leading-relaxed text-slate-600">
                      {milestone.description}
                    </p>

                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
