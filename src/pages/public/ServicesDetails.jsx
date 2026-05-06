import React, { useEffect, useState } from "react";
import { contactInfo, servicesData } from '@/data/servicesData';
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaServer,
  FaShieldAlt,
  FaBug,
  FaBrain,
  FaCheckCircle,
  FaChevronRight,
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaLinkedinIn,
} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";
import { FaXTwitter } from "react-icons/fa6";

const iconMap = {
  Code: FaCode,
  Smartphone: FaMobileAlt,
  Cloud: FaCloud,
  ServerCog: FaServer,
  ShieldCheck: FaShieldAlt,
  Bug: FaBug,
  Brain: FaBrain,
};

const ServiceDetails = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    const serviceData = servicesData[serviceName];
    setService(serviceData || null);
    setLoading(false);
  }, [serviceName]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) return <div className="text-center py-24">Loading...</div>;
  if (!service) return <div className="text-center py-24">Service not found.</div>;

  return (
    <div className="bg-white pt-10">

      {/* HERO */}
      <section className="relative pt-40 pb-16 bg-gradient-to-b from-white to-herobg dark:from-darkmode dark:to-darklight">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 items-center">

          <div className="col-span-8" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold text-midnight_text dark:text-white">
              {service.title}
            </h1>
          </div>

          <div className="col-span-4 flex justify-start md:justify-center mt-6 md:mt-0" data-aos="fade-left">
            <img
              src={service.image}
              alt={service.title}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* MAIN */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* COVER IMAGE */}
          <div
            className="mb-16 h-[350px] overflow-hidden rounded-2xl"
            data-aos="zoom-in"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-wrap -mx-4">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-8/12 px-4">
              <div className="xl:pr-10">

                {/* DESCRIPTION */}
                <p className="text-lg text-gray mb-10" data-aos="fade-up">
                  {service.description}
                </p>

                {/* OFFERINGS */}
                <h3 className="text-2xl font-semibold mb-6" data-aos="fade-up">
                  Our Service Offerings
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {service.serviceTypes.map((type, index) => {
                    const Icon = iconMap[type.icon];
                    return (
                      <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 120}
                        className="bg-white p-6 rounded-xl shadow-property hover:shadow-deatail_shadow transition"
                      >
                        <div className="flex gap-4">
                          {Icon && <Icon className="text-primary text-2xl" />}
                          <div>
                            <h5 className="font-semibold text-midnight_text">
                              {type.name}
                            </h5>
                            <p className="text-gray">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* BENEFITS + INDUSTRIES */}
                <div className="grid md:grid-cols-2 gap-10 mt-14">

                  <div data-aos="fade-right">
                    <h4 className="font-semibold text-lg mb-4">Benefits</h4>
                    {service.benefits.map((b, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <FaCheckCircle className="text-primary mt-1" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div data-aos="fade-left">
                    <h4 className="font-semibold text-lg mb-4">Industries</h4>
                    {service.industries.map((i, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <FaChevronRight className="text-primary mt-1" />
                        <span>{i}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* FAQ */}
                <h3 className="mt-16 text-slate-900 text-xl font-semibold" data-aos="fade-up">
                  FAQs
                </h3>

                <div className="mt-6 space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={index * 80}
                      className="bg-light dark:bg-darklight rounded-lg"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center gap-3 p-4 text-left"
                      >
                        <FaQuestionCircle className="text-primary" />
                        {faq.question}
                      </button>

                      {openIndex === index && (
                        <div className="px-4 pb-4 text-gray">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* SIDEBAR */}
            <div className="w-full lg:w-4/12 px-4 mt-12 lg:mt-0">

              {/* SHARE */}
              <div data-aos="fade-left" className="bg-white p-8 rounded-xl shadow-property mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Share</h3>
                <div className="flex flex-col gap-3 text-white text-sm">
                  <div className="bg-[#526fa3] p-3 rounded-lg flex items-center"><FaFacebook size={18}/>
                    <span className="ml-1">Facebook</span>
                  </div>
                  <div className="bg-[#46C4FF] p-3 rounded-lg flex items-center"><FaXTwitter size={18}/>
                    <span className="ml-1">Twitter</span>
                  </div>
                  <div className="bg-[#3C86AD] p-3 rounded-lg flex items-center"><FaLinkedinIn size={18}/><span className="ml-1">LinkedIn</span></div>
                </div>
              </div>

              {/* NEWSLETTER */}
              <div data-aos="fade-left" data-aos-delay="150" className="bg-white p-8 rounded-xl shadow-property">
                <h3 className="text-lg text-slate-900 font-semibold mb-4">Newsletter</h3>

                <input
                  placeholder="Email address"
                  className="w-full p-3 rounded-lg bg-light dark:bg-darklight mb-3 outline-none focus:ring-2 focus:ring-primary"
                />

                <button className="w-full bg-primary py-3 text-white rounded-lg">
                  Subscribe
                </button>
              </div>

              {/* CONTACT */}
              <div data-aos="fade-left" data-aos-delay="250" className="bg-light dark:bg-darklight p-6 rounded-xl mt-8">
                <h4 className="font-semibold mb-4">Need Help?</h4>

                <div className="space-y-3 text-sm text-gray">
                  <div className="flex gap-2">
                    <FaMapMarkerAlt /> {contactInfo.address}
                  </div>
                  <div className="flex gap-2">
                    <FaPhoneAlt /> {contactInfo.phone}
                  </div>
                  <div className="flex gap-2">
                    <FaEnvelope /> {contactInfo.email}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default ServiceDetails;