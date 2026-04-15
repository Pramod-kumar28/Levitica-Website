import React, { useEffect, useState } from "react";
import { allServices, contactInfo, servicesData } from '@/data/servicesData';
import { Link, useNavigate, useParams } from "react-router-dom";
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
} from "react-icons/fa";

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
    const serviceData = servicesData[serviceName];
    setService(serviceData || null);
    setLoading(false);
  }, [serviceName]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleServiceChange = (title) => {
    const slug = title
      .toLowerCase()
      .replace(/\([^)]*\)/g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    navigate(`/services/${slug}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-slate-600">
        Loading service details…
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-24 text-slate-600">
        Service not found.
      </div>
    );
  }

  return (
    <div className="bg-white pt-20">

      {/* HERO */}
      <section
        className="hero-section gradient-overlay   ptb-100"
        style={{
          background:
            "url('/img/header-bg-5.jpg') no-repeat top center / cover",
        }}
      >
        <div
          className="hero-bottom-shape-two"
          style={{
            background:
              "url('/img/hero-bottom-shape.svg') no-repeat bottom center",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* MAIN */}
          <div className="lg:col-span-2">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[350px] object-cover rounded-xl shadow"
            />

            <div className="mt-8">
              <h4 className="text-2xl font-semibold">
                {service.title}
              </h4>
              <p className="mt-3 text-lg text-slate-600">
                {service.description}
              </p>

              {/* Offerings */}
              <h5 className="mt-12 text-xl font-semibold">
                Our Service Offerings
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {service.serviceTypes.map((type, index) => {
                  const Icon = iconMap[type.icon];
                  return (
                    <div
                      key={index}
                      className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex gap-4">
                        {Icon && (
                          <Icon className="text-indigo-600 text-2xl" />
                        )}
                        <div>
                          <h6 className="font-semibold text-indigo-600">
                            {type.name}
                          </h6>
                          <p className="text-slate-600">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Benefits & Industries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                <div>
                  <h5 className="font-semibold text-lg">Benefits</h5>
                  <ul className="mt-4 space-y-2">
                    {service.benefits.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <FaCheckCircle className="text-emerald-500 mt-1" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-lg">
                    Industries We Serve
                  </h5>
                  <ul className="mt-4 space-y-2">
                    {service.industries.map((i, idx) => (
                      <li key={idx} className="flex gap-2">
                        <FaChevronRight className="text-indigo-500 mt-1" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQ */}
              <h5 className="mt-16 text-xl font-semibold">
                Frequently Asked Questions
              </h5>

              <div className="mt-6 space-y-4">
                {service.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center gap-3 p-4 font-medium text-left hover:bg-slate-50"
                    >
                      <FaQuestionCircle className="text-indigo-600" />
                      {faq.question}
                    </button>

                    {openIndex === index && (
                      <div className="p-4 text-slate-600 bg-slate-50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-10">

            <div>
              <h5 className="font-semibold text-lg">All Services</h5>
              <ul className="mt-4 space-y-2">
                {allServices.map((title, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleServiceChange(title)}
                      className={`text-left w-full hover:text-indigo-600 ${
                        title === service.title
                          ? "font-semibold text-indigo-600"
                          : ""
                      }`}
                    >
                      {title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h5 className="font-semibold">Need Help?</h5>
              <p className="mt-2 text-slate-600">
                Available {contactInfo.supportHours}
              </p>

              <ul className="mt-4 space-y-3">
                <li className="flex gap-3">
                  <FaMapMarkerAlt className="text-indigo-600" />
                  {contactInfo.address}
                </li>
                <li className="flex gap-3">
                  <FaPhoneAlt className="text-indigo-600" />
                  {contactInfo.phone}
                </li>
                <li className="flex gap-3">
                  <FaEnvelope className="text-indigo-600" />
                  {contactInfo.email}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-semibold">
              Looking for Quality Solutions?
            </h3>
            <p className="text-slate-600">
              Connect with us to find the right solution.
            </p>
          </div>
          <Link to="/contact-us" className="btn secondary-solid-btn">
            Request a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
