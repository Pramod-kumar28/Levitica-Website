import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CeoMessage = () => {

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* IMAGE */}
          <div
            data-aos="fade-right"
            className="lg:w-2/5 flex justify-center"
          >
            <div className="relative group">

              {/* glow */}
              <div className="absolute inset-0 rounded-full bg-blue-200/20 blur-2xl opacity-0 group-hover:opacity-100 transition"></div>

              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-blue-100 overflow-hidden shadow-xl relative">
                <img
                  src="/img/cofounder.jpg"
                  alt="Medipudi Durgaprasad - CEO of Levitica"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
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
          <div
            data-aos="fade-left"
            className="md:w-3/4"
          >

            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                Message From Our CEO
              </h2>

              <div className="text-sm text-blue-600 mt-1">
                Medipudi Durgaprasad, CEO of Levitica
              </div>
            </div>

            <div className="text-lg leading-relaxed text-slate-700 space-y-4">

              <p>
                Welcome to Levitica Technologies. We're more than just a software company — we're your
                partner in growth. From building cutting-edge applications to training the next generation
                of tech talent through Levitica Learn, we're committed to creating lasting value.
              </p>

              <p>
                Our team of exceptional professionals brings together expertise in development, design,
                marketing, and strategy to deliver comprehensive solutions that drive real business
                outcomes. Whether you need a custom application, a marketing campaign, or skilled talent,
                we've got you covered.
              </p>

              <p>
                We believe in the power of technology to transform industries and unlock boundless
                possibilities. Our innovative mindset keeps us at the forefront of the ever-evolving tech
                landscape.
              </p>

              {/* Quote highlight */}
              <p className="italic font-medium text-blue-600 border-l-4 border-blue-500 pl-4">
                "Your success is our success. Let's build something extraordinary together."
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CeoMessage;