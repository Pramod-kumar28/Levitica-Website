import React, { useEffect, useState } from "react";
import { allServices, contactInfo, servicesData } from "../data/servicesData";
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
      <div className="tw-text-center tw-py-24 tw-text-slate-600">
        Loading service details…
      </div>
    );
  }

  if (!service) {
    return (
      <div className="tw-text-center tw-py-24 tw-text-slate-600">
        Service not found.
      </div>
    );
  }

  return (
    <div className="tw-bg-white tw-py-20">

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
        <div className="tw-relative tw-max-w-4xl tw-mx-auto tw-px-4 tw-text-center">
          <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="tw-py-24">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-12">

          {/* MAIN */}
          <div className="lg:tw-col-span-2">
            <img
              src={service.image}
              alt={service.title}
              className="tw-w-full tw-h-[350px] tw-object-cover tw-rounded-xl tw-shadow"
            />

            <div className="tw-mt-8">
              <h4 className="tw-text-2xl tw-font-semibold">
                {service.title}
              </h4>
              <p className="tw-mt-3 tw-text-lg tw-text-slate-600">
                {service.description}
              </p>

              {/* Offerings */}
              <h5 className="tw-mt-12 tw-text-xl tw-font-semibold">
                Our Service Offerings
              </h5>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-mt-6">
                {service.serviceTypes.map((type, index) => {
                  const Icon = iconMap[type.icon];
                  return (
                    <div
                      key={index}
                      className="tw-bg-white tw-border tw-rounded-xl tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition"
                    >
                      <div className="tw-flex tw-gap-4">
                        {Icon && (
                          <Icon className="tw-text-indigo-600 tw-text-2xl" />
                        )}
                        <div>
                          <h6 className="tw-font-semibold tw-text-indigo-600">
                            {type.name}
                          </h6>
                          <p className="tw-text-slate-600">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Benefits & Industries */}
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-10 tw-mt-12">
                <div>
                  <h5 className="tw-font-semibold tw-text-lg">Benefits</h5>
                  <ul className="tw-mt-4 tw-space-y-2">
                    {service.benefits.map((b, i) => (
                      <li key={i} className="tw-flex tw-gap-2">
                        <FaCheckCircle className="tw-text-emerald-500 tw-mt-1" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="tw-font-semibold tw-text-lg">
                    Industries We Serve
                  </h5>
                  <ul className="tw-mt-4 tw-space-y-2">
                    {service.industries.map((i, idx) => (
                      <li key={idx} className="tw-flex tw-gap-2">
                        <FaChevronRight className="tw-text-indigo-500 tw-mt-1" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQ */}
              <h5 className="tw-mt-16 tw-text-xl tw-font-semibold">
                Frequently Asked Questions
              </h5>

              <div className="tw-mt-6 tw-space-y-4">
                {service.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="tw-border tw-rounded-lg tw-overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="tw-w-full tw-flex tw-items-center tw-gap-3 tw-p-4 tw-font-medium tw-text-left hover:tw-bg-slate-50"
                    >
                      <FaQuestionCircle className="tw-text-indigo-600" />
                      {faq.question}
                    </button>

                    {openIndex === index && (
                      <div className="tw-p-4 tw-text-slate-600 tw-bg-slate-50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="tw-space-y-10">

            <div>
              <h5 className="tw-font-semibold tw-text-lg">All Services</h5>
              <ul className="tw-mt-4 tw-space-y-2">
                {allServices.map((title, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleServiceChange(title)}
                      className={`tw-text-left tw-w-full hover:tw-text-indigo-600 ${
                        title === service.title
                          ? "tw-font-semibold tw-text-indigo-600"
                          : ""
                      }`}
                    >
                      {title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tw-bg-slate-50 tw-p-6 tw-rounded-xl">
              <h5 className="tw-font-semibold">Need Help?</h5>
              <p className="tw-mt-2 tw-text-slate-600">
                Available {contactInfo.supportHours}
              </p>

              <ul className="tw-mt-4 tw-space-y-3">
                <li className="tw-flex tw-gap-3">
                  <FaMapMarkerAlt className="tw-text-indigo-600" />
                  {contactInfo.address}
                </li>
                <li className="tw-flex tw-gap-3">
                  <FaPhoneAlt className="tw-text-indigo-600" />
                  {contactInfo.phone}
                </li>
                <li className="tw-flex tw-gap-3">
                  <FaEnvelope className="tw-text-indigo-600" />
                  {contactInfo.email}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="tw-bg-slate-100 tw-py-20">
        <div className="tw-max-w-6xl tw-mx-auto tw-px-4 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-gap-8">
          <div>
            <h3 className="tw-text-2xl tw-font-semibold">
              Looking for Quality Solutions?
            </h3>
            <p className="tw-text-slate-600">
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
