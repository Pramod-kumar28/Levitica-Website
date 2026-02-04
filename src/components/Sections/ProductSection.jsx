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
    color: "blue"
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
    color: "rose"
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
    color: "emerald"
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
    color: "amber"
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
    color: "cyan"
  }
];

const colorMap = {
  blue: "tw-text-blue-600 tw-bg-blue-50",
  rose: "tw-text-rose-600 tw-bg-rose-50",
  emerald: "tw-text-emerald-600 tw-bg-emerald-50",
  amber: "tw-text-amber-600 tw-bg-amber-50",
  cyan: "tw-text-cyan-600 tw-bg-cyan-50"
};

const ProductsShowcase = () => {
  return (
    <section className="tw-bg-gradient-to-b tw-from-slate-50 tw-to-white tw-py-6">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4">

        {/* Header */}
        <div className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-10">
          <span className="tw-inline-block tw-mb-4 tw-rounded-full tw-bg-indigo-100 tw-text-indigo-700 tw-text-sm tw-font-semibold tw-px-4 tw-py-1">
            Products
          </span>

          <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-slate-900">
            Digital Products We Build
          </h2>

          <p className="tw-mt-4 tw-text-slate-600">
            Scalable, enterprise-grade software products crafted for
            businesses, institutions, and growing teams.
          </p>
        </div>

        {/* Grid */}
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
          {products.map((product, i) => {
            const Icon = product.icon;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="tw-group tw-relative tw-bg-white tw-rounded-2xl tw-border tw-border-slate-200 tw-shadow-sm hover:tw-shadow-xl tw-transition"
              >
                {/* Accent glow */}
                <div className="tw-absolute tw-inset-0 tw-rounded-2xl tw-bg-gradient-to-br tw-from-transparent tw-via-transparent tw-to-slate-100 tw-opacity-0 group-hover:tw-opacity-100 tw-transition" />

                <div className="tw-relative tw-p-6 tw-flex tw-flex-col tw-h-full">
                  {/* Icon */}
                  <div
                    className={`tw-w-12 tw-h-12 tw-rounded-xl tw-flex tw-items-center tw-justify-center ${colorMap[product.color]}`}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Title */}
                  <h3 className="tw-mt-6 tw-text-lg tw-font-semibold tw-text-slate-900">
                    {product.title}
                  </h3>

                  <span className="tw-text-sm tw-text-slate-500">
                    {product.subtitle}
                  </span>

                  {/* Description */}
                  <p className="tw-mt-4 tw-text-sm tw-text-slate-600">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="tw-mt-6 tw-space-y-3 tw-text-sm">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="tw-flex tw-items-start tw-gap-2 tw-text-slate-700"
                      >
                        <FaCheckCircle className="tw-mt-0.5 tw-text-emerald-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductsShowcase;
