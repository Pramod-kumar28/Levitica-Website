import React, { useEffect, useState } from 'react';
import { allServices, contactInfo, servicesData } from '../data/servicesData';
import { Link, useNavigate, useParams } from 'react-router-dom';
  import {
  Code,
  Smartphone,
  Cloud,
  ServerCog,
  ShieldCheck,
  Bug,
  Brain,
} from "lucide-react";

const ServiceDetails = () => {


const iconMap = {
  Code,
  Smartphone,
  Cloud,
  ServerCog,
  ShieldCheck,
  Bug,
  Brain,
};

  const { serviceName } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchServiceData = () => {
      try {
        // Find service by slug (URL parameter)
        const serviceData = servicesData[serviceName]
        console.log(serviceData)


        if (serviceData) {
          setService(serviceData);
        } else {
          console.error("Service not found:", serviceName);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading service data:", error);
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceName, navigate]);

  const handleServiceChange = (title) => {
    // Find the service object to get the correct slug
    const selectedService = title
      ?.toLowerCase()
      .replace(/\([^)]*\)/g, '')           // Remove anything in parentheses
      .replace(/&/g, 'and')                // Replace ampersand with 'and'
      .replace(/[^a-z0-9\s]/g, '')         // Remove special characters
      .trim()
      .replace(/\s+/g, '-')

    if (selectedService) {
      navigate(`/services/${selectedService}`);
      window.scrollTo(0, 0); // Scroll to top after navigation
    }
  };

  if (loading) {
    return <div className="container text-center py-5">Loading service details...</div>;
  }

  if (!service) {
    return <div className="container text-center py-5">Service not found.</div>;
  }

  return (<>
    <div className="main pt-100">
      {/* Header Section */}
      <section className="hero-section ptb-100 gradient-overlay"
        style={{ background: "url('/img/header-bg-5.jpg') no-repeat top center / cover " }}>
        <div className="hero-bottom-shape-two" style={{ background: "url('/img/hero-bottom-shape.svg') no-repeat bottom center" }}></div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-7">
              <div className="page-header-content text-white text-center pt-sm-5 pt-md-5 pt-lg-0">
                <h1 className="text-white mb-0">{service?.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Details Section */}
      <section className="service-details-section ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="service-details-wrap">
                <img src={service.image} alt={service.title} style={{ height: '350px', width: '100%', padding: "10px" }} className="img-fluid rounded shadow-sm" />
                <div className="services-detail-content mt-4">
                  <h4>{service?.title}</h4>
                  <p className="lead">{service.description}</p>

                  <h5 className="mt-5">Our Service Offerings</h5>
                  <div className="row mt-4">
                    {service.serviceTypes.map((type, index) => {
                      const Icon = iconMap[type.icon];

                      return (
                        <div key={index} className="col-md-6 mb-4">
                          <div className="card h-100 border-0 shadow-sm it-service-card">
                            <div className="card-body">
                              <div className="d-flex align-items-start">
                                <div className="it-icon-box mr-3">
                                  {Icon && <Icon size={28} />}
                                </div>
                                <div>
                                  <h6 className="card-title text-primary mb-1">
                                    {type.name}
                                  </h6>
                                  <p className="card-text mb-0">
                                    {type.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>


                  <div className="row mt-5">
                    <div className="col-md-6">
                      <div className="benefits-wrap">
                        <h5>Benefits</h5>
                        <ul className="list-unstyled tech-feature-list">
                          {service?.benefits?.map((benefit, index) => (
                            <li key={index} className="py-1">
                              <span className="ti-check-box mr-2 color-secondary"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="industries-wrap">
                        <h5>Industries & Programs We Serve</h5>
                        <ul className="list-unstyled">
                          {service.industries?.map((industry, index) => (
                            <li key={index} className="py-1">
                              <span className="ti-angle-right mr-2 color-primary"></span>
                              {industry}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <>
                    <h5 className="mt-5">Frequently Asked Questions</h5>
                    <div id="accordion-1" className="accordion accordion-faq mt-4">
                      {service.faqs.map((faq, index) => (
                        <div key={index} className="card">
                          <div
                            className={`card-header py-3 ${openIndex === index ? '' : 'collapsed'}`}
                            id={`heading-1-${index + 1}`}
                            onClick={() => toggleFAQ(index)}
                            style={{ cursor: "pointer" }}
                            role="button"
                            aria-expanded={openIndex === index}
                            aria-controls={`collapse-1-${index + 1}`}
                          >
                            <h6 className="mb-0">
                              <span className={`ti-${index === 0 ? 'help-alt' : index === 1 ? 'search' : index === 2 ? 'time' : 'shield'} mr-3`}></span>
                              {faq.question}
                            </h6>
                          </div>
                          <div
                            id={`collapse-1-${index + 1}`}
                            className={`collapse ${openIndex === index ? 'show' : ''}`}
                            aria-labelledby={`heading-1-${index + 1}`}
                            data-parent="#accordion-1"
                          >
                            <div className="card-body">
                              <p>{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>

                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-md-4">
              <div className="sidebar-right pl-4">
                {/* All Services List */}
                <aside className="widget widget-categories">
                  <div className="widget-title">
                    <h5>All Services</h5>
                  </div>
                  <ul className="all-service-list">
                    {allServices.map((serviceTitle, index) => (
                      <li key={index}>
                        <a href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleServiceChange(serviceTitle);
                          }}
                          className={serviceTitle === service?.title ? "active" : ""}
                        >
                          {serviceTitle}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>

                {/* Need Help */}
                <aside className="widget widget-categories">
                  <div className="widget-title">
                    <h5>Need Help?</h5>
                  </div>
                  <p>We are available {contactInfo.supportHours} for dedicated support</p>
                  <ul className="primary-list mt-25">
                    <li><span className="ti-location-pin mr-2 color-primary"></span> {contactInfo.address}</li>
                    <li><span className="ti-mobile mr-2 color-primary"></span> {contactInfo.phone}</li>
                    <li><span className="ti-email mr-2 color-primary"></span> {contactInfo.email}</li>
                  </ul>
                </aside>

                {/* Newsletter Subscription can be added back later if needed */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action py-5 gray-light-bg">
        <div className="container">
          <div className="row justify-content-around align-items-center">
            <div className="col-md-7">
              <div className="subscribe-content">
                <h3 className="mb-1">Looking for Quality Solutions?</h3>
                <p>Connect with us to find the right solution for your organization's needs.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="action-btn text-lg-right text-sm-left">
                <Link to={"/contact-us"} className="btn secondary-solid-btn">Request a Consultation</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  </>
  );
};

export default ServiceDetails;