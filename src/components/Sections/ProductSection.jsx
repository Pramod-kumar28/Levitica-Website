import "./productsecion.css";
import { motion } from "framer-motion";
import {
  FaUsersCog,
  FaBuilding,
  FaBrain,
  FaHospital,
  FaGraduationCap,
  FaCheckCircle
} from "react-icons/fa";

const products = [
  {
    id: 1,
    title: "HRMS",
    subtitle: "Human Resource Management System",
    description: "A complete HR digital solution for modern businesses.",
    features: [
      "End-to-end HR lifecycle management",
      "Payroll, attendance & performance tracking"
    ],
    icon: FaUsersCog,
    accentColor: "#4a6fff"
  },
  {
    id: 2,
    title: "Hostel & PG System",
    subtitle: "Maintenance & Booking Platform",
    description: "Smart booking & management platform for hostels and PGs.",
    features: [
      "Room allocation & booking management",
      "Payments & maintenance tracking"
    ],
    icon: FaBuilding,
    accentColor: "#ff6b6b"
  },
  {
    id: 3,
    title: "AI-Powered HR + CRM",
    subtitle: "Next-gen Business Solutions",
    description: "AI-driven tools to automate HR and business workflows.",
    features: [
      "Automated resume screening",
      "CRM & productivity automation"
    ],
    icon: FaBrain,
    accentColor: "#2ed573"
  },
  {
    id: 4,
    title: "DVSkillHub",
    subtitle: "EdTech Learning Platform",
    description: "A modern e-learning platform for students and professionals.",
    features: [
      "Courses, quizzes & certifications",
      "Instructor & student dashboards"
    ],
    icon: FaGraduationCap,
    accentColor: "#f59e0b"
  },
  {
    id: 5,
    title: "HMS",
    subtitle: "Hospital Management System",
    description: "Complete hospital automation for clinics & hospitals.",
    features: [
      "Patient records & appointment scheduling",
      "Billing, pharmacy & lab management"
    ],
    icon: FaHospital,
    accentColor: "#06b6d4"
  }
];

const ProductsShowcase = () => {
  return (
    <section className="products-modern">
      <div className="container">

        <div className="section-header">
          <span className="badge">Products</span>
          <h2>Digital Products We Build</h2>
          <p>
            Scalable enterprise-grade software products designed for businesses,
            institutions, and growing teams.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product, i) => {
            const Icon = product.icon;

            return (
              <motion.div
                key={product.id}
                className="product-card-modern"
                style={{ "--accent": product.accentColor }}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="product-header">
                  <div className="icon-box">
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3>{product.title}</h3>
                    <span>{product.subtitle}</span>
                  </div>
                </div>

                <p className="product-description">
                  {product.description}
                </p>

                <ul className="features">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <FaCheckCircle size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>

                
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductsShowcase;
