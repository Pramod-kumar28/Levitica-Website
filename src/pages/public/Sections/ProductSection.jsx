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
  <div className={`p-2 ${bg} rounded-lg`}>
    <Icon style={{ width: size, height: size }} className={color} />
  </div>
);

const ColorfulIcons = {
  blue: (p) => <IconWrapper {...p} bg="bg-blue-100" color="text-blue-600" />,
  emerald: (p) => <IconWrapper {...p} bg="bg-emerald-100" color="text-emerald-600" />,
  rose: (p) => <IconWrapper {...p} bg="bg-pink-100" color="text-pink-600" />,
  amber: (p) => <IconWrapper {...p} bg="bg-yellow-100" color="text-yellow-600" />,
  cyan: (p) => <IconWrapper {...p} bg="bg-cyan-100" color="text-cyan-600" />
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
      textColor: "text-blue-600",
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
      textColor: "text-pink-600",
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
      textColor: "text-emerald-600",
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
      textColor: "text-yellow-600",
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
      textColor: "text-cyan-600",
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
        className="h-full border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all"
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <Icon icon={product.icon} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {product.title}
              </h3>
              <p className="text-xs text-gray-500">
                {product.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4">
            {product.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {product.features.map((f, i) => (
              <li key={i} className="flex gap-2">
                <FaCheckCircle className={`mt-0.5 text-xs ${product.textColor}`} />
                <span className="text-sm text-gray-700">{f}</span>
              </li>
            ))}
          </ul>

          {/* Push footer to bottom */}
          <div className="flex-grow" />

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {product.deployment}
            </span>

            <Link
              to={`/products/${product.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Learn More
              <FaArrowRight className="ml-2 text-xs" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  /* ---------- RENDER ---------- */
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Enterprise Software Solutions
          </h2>
          <p className="mt-4 text-gray-600 text-base">
            Scalable, secure, and industry-ready platforms to power your business.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium ${
                activeTab === c.id
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Grid */}
       {/* Products Layout */}
<div className="space-y-8">
  {/* First Row – 3 Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredProducts.slice(0, 3).map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>

  {/* Second Row – 2 Cards Centered */}
  {filteredProducts.length > 3 && (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
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
