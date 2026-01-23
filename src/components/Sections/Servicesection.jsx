import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  TrendingUp,
  MonitorCog,
} from "lucide-react";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "IT Services & Solutions",
      description:
        "Enterprise-grade IT services including software development, cloud, cybersecurity, and infrastructure management.",
      icon: <MonitorCog size={28} />,
      gradient:
        "linear-gradient(135deg, #507788ff 0%, #1287adff 50%, #2c5364 100%)",
      path: "/services/it-services",
    },
    {
      id: 2,
      title: "Manpower & Staffing Solutions",
      description:
        "Comprehensive staffing solutions to ensure you get the right talent at the right time.",
      icon: <Users size={28} />,
      gradient:
        "linear-gradient(135deg, #505688ff 0%, #1243adff 50%, #2c5364 100%)",
      path: "/services/manpower-and-staffing-solutions",
    },
    {
      id: 3,
      title: "Campus Recruitment Training (CRT)",
      description:
        "Industry-ready training programs focused on aptitude, technical, and soft skills.",
      icon: <GraduationCap size={28} />,
      gradient:
        "linear-gradient(135deg, #773c6dff 0%, #ad1293ff 50%, #642c61ff 100%)",
      path: "/services/campus-recruitment-training",
    },
    {
      id: 4,
      title: "Business Development & Consulting",
      description:
        "Strategic consulting services to accelerate growth and improve performance.",
      icon: <TrendingUp size={28} />,
      gradient:
        "linear-gradient(135deg, #367d92ff 0%, #306074ff 50%, #0d46c2ff 100%)",
      path: "/services/business-development-and-consulting",
    },
  ];

  return (
    <>
      <section className="services-section mt-5" id="services">
        <div className="w-full px-3">
<motion.div
  className="section-header"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <h2>Our Services</h2>
  <p>Comprehensive solutions to meet your business and talent needs</p>
</motion.div>


         <div className="services-grid">
  {services.map((service, index) => (
    <motion.div
      key={service.id}
      className="service-card clean-card"
      style={{ "--hover-gradient": service.gradient }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
    >
      <div className="card-content">
        <motion.div 
          className="icon-box"
          whileHover={{ rotate: 8, scale: 1.1 }}
        >
          {service.icon}
        </motion.div>

        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>

      <div className="card-hover">
        <Link to={service.path}>
          <button className="service-btn">Learn More</button>
        </Link>
      </div>
    </motion.div>
  ))}
</div>

        </div>
      </section>

      <div className="services-section-btn text-center">
        <Link to="/services">
          <button className="accent-outline-btn btn rounded-5">
            View All Our Services
          </button>
        </Link>
      </div>
    </>
  );
};

export default ServicesSection;
    