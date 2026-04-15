import { motion } from 'framer-motion';

const CeoMessage = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center"
        >

          {/* IMAGE */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-blue-100 overflow-hidden shadow-2xl">
                <img
                  src="/img/cofounder.jpg"
                  alt="Medipudi Durgaprasad - CEO of Levitica"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-500">
                          <div class="text-center p-8">
                            <div class="text-5xl md:text-6xl font-bold mb-4 text-blue-600">
                              DP
                            </div>
                            <div class="text-lg font-semibold text-blue-800">
                              Medipudi Durgaprasad
                            </div>
                            <div class="text-sm text-blue-600">
                              CEO & Founder
                            </div>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:w-3/4">
            <div className="flex items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  Message From Our CEO
                </h2>
                <div className="text-sm text-blue-600">
                  Medipudi Durgaprasad, CEO of Levitica
                </div>
              </div>
            </div>

            <div className="mb-6 text-lg leading-relaxed text-slate-700">
              <p className="mb-4 text-md">
                Welcome to Levitica Technologies. We're more than just a software company  we're your
                partner in growth. From building cutting-edge applications to training the next generation
                of tech talent through Levitica Learn, we're committed to creating lasting value.
              </p>

              <p className="mb-4 text-md">
                Our team of exceptional professionals brings together expertise in development, design,
                marketing, and strategy to deliver comprehensive solutions that drive real business
                outcomes. Whether you need a custom application, a marketing campaign, or skilled talent,
                we've got you covered.
              </p>

              <p className="mb-4 text-md">
                We believe in the power of technology to transform industries and unlock boundless
                possibilities. Our innovative mindset keeps us at the forefront of the ever-evolving tech
                landscape.
              </p>

              <p className="italic font-medium text-blue-600">
                "Your success is our success. Let's build something extraordinary together."
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CeoMessage;