import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLightbulb, FaChartLine } from "react-icons/fa6";
import AboutUsLottie from "@/pages/public/lottie/AboutUsLottie";

const CompanyStory = () => {

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  return (
    <section className="bg-section dark:bg-darkmode py-24">
      <div className="lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div data-aos="fade-right">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary mb-6">
              <FaLightbulb />
              <span className="font-medium">Our Story</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white leading-[1.2]">
              Building Technology, Building Careers
            </h2>

            {/* Content */}
            <div className="mt-6 space-y-4 text-gray">
              <p>
                Levitica Technologies was established with a focused purpose to bridge the gap
                between business needs and technical excellence. We're not just a software
                development company; we're your strategic technology partner.
              </p>

              <p>
                Our services span the entire technology spectrum: from custom software development,
                mobile apps, and AI solutions to cloud transformation and data analytics. Through
                Levitica Learn, our e-learning platform, we're democratizing tech education with
                industry-aligned courses and hands-on projects.
              </p>

              <p>
                We also provide comprehensive consultancy services including digital marketing,
                brand development, sales analytics, and IT staffing. Whether you need to build a
                product, grow your team, or transform your business, we have the expertise to help
                you succeed.
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end" data-aos="fade-left">

            <div className="max-w-md md:max-w-lg w-full space-y-6">

              {/* Lottie Card */}
              <div className="bg-white dark:bg-semidark rounded-lg shadow-property p-6">
                <AboutUsLottie />
              </div>

              {/* Info Card */}
              <div className="p-6 rounded-lg border border-lightgray bg-white dark:bg-semidark shadow-property hover:shadow-deatail_shadow transition">

                <h4 className="font-semibold text-lg flex items-center gap-2 text-midnight_text dark:text-white">
                  <FaChartLine className="text-primary" />
                  One Stop Technology Partner
                </h4>

                <p className="mt-2 text-sm text-gray">
                  From development and training to marketing and staffing we deliver end-to-end
                  solutions that drive real business outcomes.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CompanyStory;