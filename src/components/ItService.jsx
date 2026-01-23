import { Link } from "react-router-dom";
import {
  Code,
  Smartphone,
  Cloud,
  ServerCog,
  ShieldCheck,
  Bug,
  Brain,
  MonitorCog,
} from "lucide-react";
// import "./ITServices.css";

const services = [
  {
    title: "IT Services & Solutions",
    description:
      "End-to-end IT consulting, implementation, and enterprise support.",
    icon: MonitorCog,
    path: "/services/it-services",
  },
  {
    title: "Web Development",
    description:
      "Scalable and secure web applications built with modern technologies.",
    icon: Code,
    path: "/services/web-development",
  },
  {
    title: "Mobile App Development",
    description:
      "High-performance Android and iOS applications for growing businesses.",
    icon: Smartphone,
    path: "/services/mobile-app-development",
  },
  {
    title: "Cloud Services",
    description:
      "Cloud migration, optimization, and managed services across platforms.",
    icon: Cloud,
    path: "/services/cloud-services",
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "Automation, CI/CD pipelines, monitoring, and infrastructure reliability.",
    icon: ServerCog,
    path: "/services/devops",
  },
  {
    title: "Cybersecurity",
    description:
      "Security audits, compliance, threat detection, and risk mitigation.",
    icon: ShieldCheck,
    path: "/services/cybersecurity",
  },
  {
    title: "Software Testing & QA",
    description:
      "Manual and automated testing to ensure quality and performance.",
    icon: Bug,
    path: "/services/software-testing",
  },
  {
    title: "Machine Learning & AI",
    description:
      "AI-driven solutions for automation, analytics, and decision-making.",
    icon: Brain,
    path: "/services/machine-learning",
  },
];

const ITServices = () => {
  return (
    <div className="main pt-100">
      {/* 🔒 HERO / BANNER (UNCHANGED) */}
      <section
        className="hero-section ptb-100 gradient-overlay"
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
        ></div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-7">
              <div className="page-header-content text-white text-center">
                <h1 className="text-white mb-0">IT Services</h1>
                <p className="lead text-white mt-3">
                  Technology solutions designed to scale your business with
                  confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="it-services-section ptb-100">
        <div className="container">
          <div className="row">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="col-lg-3 col-md-6 mb-4">
                  <div className="it-service-card h-100">
                    <div className="icon-box">
                      <Icon size={36} />
                    </div>
                    <h5>{service.title}</h5>
                    <p>{service.description}</p>
                    <Link to={service.path} className="service-link">
                      Learn More →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IT SERVICES OVERVIEW (BRIEF) */}
      <section className="ptb-100 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <h2>IT Services & Solutions</h2>
              <p className="mt-3">
                We provide reliable, scalable, and secure IT services to help
                organizations modernize technology and improve operational
                efficiency.
              </p>
              <p>
                Our solutions span application development, cloud, DevOps,
                cybersecurity, quality assurance, and AI-powered systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="ptb-100">
        <div className="container">
          <div className="row text-center">
            {[
              {
                icon: Code,
                title: "Custom Development",
                desc: "Web, mobile, and enterprise-grade software solutions.",
              },
              {
                icon: Cloud,
                title: "Cloud & DevOps",
                desc: "Cloud-native infrastructure with CI/CD automation.",
              },
              {
                icon: ShieldCheck,
                title: "Security & Compliance",
                desc: "Secure systems, audits, and risk management.",
              },
              {
                icon: Brain,
                title: "AI & Automation",
                desc: "Machine learning solutions for smarter workflows.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="col-md-3 mb-4">
                  <div className="value-card p-4 h-100">
                    <Icon size={36} className="mb-3 text-primary" />
                    <h6>{item.title}</h6>
                    <p className="mb-0">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="ptb-100 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2>Engagement Models</h2>
              <p className="mt-3">
                Flexible engagement models tailored to your timelines, budgets,
                and business objectives.
              </p>
              <ul className="list-unstyled mt-4">
                <li>✔ Fixed-price project delivery</li>
                <li>✔ Dedicated development teams</li>
                <li>✔ Time & material engagement</li>
                <li>✔ Ongoing support & maintenance</li>
              </ul>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm p-4">
                <h5>Why Choose Us</h5>
                <ul className="mt-3">
                  <li>Business-first technology approach</li>
                  <li>Experienced engineers & consultants</li>
                  <li>Secure and scalable solutions</li>
                  <li>Transparent delivery & communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ITServices;
