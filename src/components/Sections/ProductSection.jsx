import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsersCog,
  FaBuilding,
  FaBrain,
  FaGraduationCap,
  FaHospital,
  FaChartLine,
  FaFileInvoiceDollar,
  FaRobot,
  FaVideo,
  FaHeartbeat,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

/* ---------- ICON SYSTEM (SAFE FOR TAILWIND) ---------- */
const IconWrapper = ({ icon: Icon, bg, color, size = 20 }) => (
  <div className={`tw-p-2 ${bg} tw-rounded-lg`}>
    <Icon style={{ width: size, height: size }} className={color} />
  </div>
);

const ColorfulIcons = {
  blue: (p) => <IconWrapper {...p} bg="tw-bg-blue-100" color="tw-text-blue-600" />,
  emerald: (p) => <IconWrapper {...p} bg="tw-bg-emerald-100" color="tw-text-emerald-600" />,
  rose: (p) => <IconWrapper {...p} bg="tw-bg-pink-100" color="tw-text-pink-600" />,
  amber: (p) => <IconWrapper {...p} bg="tw-bg-yellow-100" color="tw-text-yellow-600" />,
  cyan: (p) => <IconWrapper {...p} bg="tw-bg-cyan-100" color="tw-text-cyan-600" />
};

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  /* ---------- PRODUCTS ---------- */
 const products = [
    {
      id: 1,
      title: "HRMS",
      subtitle: "Human Resource Management System",
      description:
        "Cloud-based HR platform covering the complete employee lifecycle with automation and compliance. Streamline recruitment, onboarding, payroll processing, performance management, and employee engagement with AI-powered insights and real-time analytics. Our solution reduces manual HR tasks by 70% and improves employee satisfaction through intuitive self-service portals.",
      features: [
        "HR lifecycle automation",
        "Payroll & compliance",
        "Performance tracking",
        "Employee self-service",
        "360-degree feedback system",
        "Leave & attendance automation"
      ],
      icon: FaUsersCog,
      secondaryIcon: FaChartLine,
      iconColor: "blue",
      textColor: "tw-text-blue-600",
      category: ["hr", "enterprise"],
      deployment: "Cloud / On-premise"
    },
    {
      id: 2,
      title: "Hostel & PG System",
      subtitle: "Property Management Platform",
      description:
        "Smart solution for managing bookings, tenants, billing, and maintenance in hostels and PGs. Automate rent collection, track maintenance requests, manage inventory, and provide digital check-in/check-out experiences. Real-time occupancy dashboards and automated notifications keep property managers informed and tenants satisfied with seamless operations.",
      features: [
        "Room & bed management",
        "Automated billing",
        "Tenant dashboards",
        "Maintenance tracking",
        "Digital agreement management",
        "Visitor & security logging"
      ],
      icon: FaBuilding,
      secondaryIcon: FaFileInvoiceDollar,
      iconColor: "rose",
      textColor: "tw-text-pink-600",
      category: ["property"],
      deployment: "Cloud-based"
    },
    {
      id: 3,
      title: "AI HR + CRM",
      subtitle: "AI Business Automation",
      description:
        "AI-driven HR and CRM solution delivering predictive insights and automated workflows. Leverage machine learning algorithms for smart candidate matching, lead scoring, sentiment analysis, and process optimization. Transform business operations with intelligent automation that adapts to your company's unique needs and growth patterns.",
      features: [
        "AI resume screening",
        "Smart CRM pipelines",
        "Predictive analytics",
        "Chatbot automation",
        "Sentiment analysis engine",
        "Workflow optimization tools"
      ],
      icon: FaBrain,
      secondaryIcon: FaRobot,
      iconColor: "emerald",
      textColor: "tw-text-emerald-600",
      category: ["ai", "enterprise"],
      deployment: "SaaS"
    },
    {
      id: 4,
      title: "DVSkillHub",
      subtitle: "Learning Management System",
      description:
        "Modern LMS for institutes and corporates with live classes and certification. Deliver engaging learning experiences through interactive content, gamification, and detailed progress tracking. Support blended learning models with seamless integration of online and offline educational resources for comprehensive skill development.",
      features: [
        "Course management",
        "Live classes",
        "Assessments",
        "Certificates",
        "Gamification & rewards",
        "Progress analytics dashboard"
      ],
      icon: FaGraduationCap,
      secondaryIcon: FaVideo,
      iconColor: "amber",
      textColor: "tw-text-yellow-600",
      category: ["education"],
      deployment: "Cloud "
    },
    {
      id: 5,
      title: "Hospital Management System",
      subtitle: "Healthcare Operations Platform",
      description:
        "End-to-end hospital digitization from patient records to billing and pharmacy. Improve patient care with electronic health records, appointment scheduling, inventory management, and insurance processing. HIPAA-compliant solution that enhances operational efficiency while ensuring data security and regulatory compliance.",
      features: [
        "Electronic health records",
        "Appointment scheduling",
        "Billing & pharmacy",
        "Doctor management",
        "Laboratory integration",
        "Insurance claim processing"
      ],
      icon: FaHospital,
      secondaryIcon: FaHeartbeat,
      iconColor: "cyan",
      textColor: "tw-text-cyan-600",
      category: ["healthcare"],
      deployment: "Cloud /  White-label"
    }
  ];
  /* ---------- FILTER ---------- */
  const categories = [
    { id: "all", name: "All" },
    { id: "enterprise", name: "Enterprise" },
    { id: "hr", name: "HR Tech" },
    { id: "education", name: "Education" },
    { id: "healthcare", name: "Healthcare" },
    { id: "ai", name: "AI" }
  ];

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category.includes(activeTab));

  /* ---------- CARD ---------- */
  const ProductCard = ({ product }) => {
    const Icon = ColorfulIcons[product.iconColor];

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="tw-h-full tw-border tw-border-gray-200 tw-rounded-2xl tw-bg-white tw-shadow-sm hover:tw-shadow-lg tw-transition-all"
      >
        <div className="tw-flex tw-flex-col tw-h-full tw-p-6">
          {/* Header */}
          <div className="tw-flex tw-items-start tw-gap-3 tw-mb-4">
            <Icon icon={product.icon} />
            <div>
              <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
                {product.title}
              </h3>
              <p className="tw-text-xs tw-text-gray-500">
                {product.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="tw-text-sm tw-text-gray-600 tw-mb-4">
            {product.description}
          </p>

          {/* Features */}
          <ul className="tw-space-y-2 tw-mb-6">
            {product.features.map((f, i) => (
              <li key={i} className="tw-flex tw-gap-2">
                <FaCheckCircle className={`tw-mt-0.5 tw-text-xs ${product.textColor}`} />
                <span className="tw-text-sm tw-text-gray-700">{f}</span>
              </li>
            ))}
          </ul>

          {/* Push footer to bottom */}
          <div className="tw-flex-grow" />

          {/* Footer */}
          <div className="tw-pt-4 tw-border-t tw-border-gray-100 tw-flex tw-items-center tw-justify-between">
            <span className="tw-text-xs tw-text-gray-500">
              {product.deployment}
            </span>

            <Link
              to={`/products/${product.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="tw-inline-flex tw-items-center tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-text-blue-700"
            >
              Learn More
              <FaArrowRight className="tw-ml-2 tw-text-xs" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  /* ---------- RENDER ---------- */
  return (
    <section className="tw-py-20 tw-bg-gray-50">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
        {/* Header */}
        <div className="tw-text-center tw-max-w-3xl tw-mx-auto tw-mb-14">
          <h2 className="tw-text-4xl tw-font-bold tw-text-gray-900">
            Enterprise Software Solutions
          </h2>
          <p className="tw-mt-4 tw-text-gray-600 tw-text-base">
            Scalable, secure, and industry-ready platforms to power your business.
          </p>
        </div>

        {/* Tabs */}
        <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-3 tw-mb-10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`tw-px-5 tw-py-2 tw-rounded-full tw-text-sm tw-font-medium ${
                activeTab === c.id
                  ? "tw-bg-blue-600 tw-text-white"
                  : "tw-bg-white tw-border tw-border-gray-200 tw-text-gray-700 hover:tw-border-blue-300"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Grid */}
       {/* Products Layout */}
<div className="tw-space-y-8">
  {/* First Row – 3 Cards */}
  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
    {filteredProducts.slice(0, 3).map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>

  {/* Second Row – 2 Cards Centered */}
  {filteredProducts.length > 3 && (
    <div className="tw-flex tw-justify-center">
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 tw-max-w-4xl tw-w-full">
        {filteredProducts.slice(3, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )}
</div>

      </div>
    </section>
  );
};

export default ProductsSection;
