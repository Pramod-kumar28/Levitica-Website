import {
  FaLightbulb,
  FaBezierCurve,
  FaLifeRing,
  FaBrain,
  FaCheckCircle,
} from "react-icons/fa";

const features = [
  "Cost Accounting Fundamentals",
  "Corporate Cash Management",
  "SEO Optimization Services",
  "Company Brand Solutions",
];

const promoBlocks = [
  {
    icon: FaLightbulb,
    title: "Business Consulting",
    description:
      "Scale mission-critical imperatives with data-driven consulting strategies.",
  },
  {
    icon: FaBezierCurve,
    title: "Creative Design",
    description:
      "Craft visually compelling designs that elevate your brand identity.",
  },
  {
    icon: FaLifeRing,
    title: "Market Strategy",
    description:
      "Create high-impact go-to-market strategies for sustainable growth.",
  },
  {
    icon: FaBrain,
    title: "Valuable Ideas",
    description:
      "Transform innovative ideas into real-world business solutions.",
  },
];

const AboutUsSection = () => {
  return (
    <section className="tw-bg-gradient-to-b tw-from-white tw-to-slate-50 tw-py-16">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4">

        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-16 tw-items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-slate-900">
              From Learning to Leading — We’re With You.
            </h2>

            <p className="tw-mt-4 tw-text-slate-600">
              We help individuals and organizations move from foundational learning
              to leadership through innovative, scalable solutions.
            </p>

            <p className="tw-mt-3 tw-text-slate-600">
              Our approach blends strategy, technology, and creativity to unlock
              sustainable growth and long-term value.
            </p>

            {/* Feature list */}
            <ul className="tw-mt-8 tw-space-y-3">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="tw-flex tw-items-center tw-gap-3 tw-text-slate-800"
                >
                  <FaCheckCircle className="tw-text-emerald-500" />
                  <span className="tw-font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT PROMO BLOCKS */}
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-6">
            {promoBlocks.map((block, idx) => {
              const Icon = block.icon;

              return (
                <div
                  key={idx}
                  className="tw-group tw-bg-white tw-rounded-2xl tw-border tw-border-slate-200 tw-p-6 tw-shadow-sm hover:tw-shadow-xl tw-transition"
                >
                  <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-indigo-50 tw-text-indigo-600 tw-flex tw-items-center tw-justify-center group-hover:tw-scale-110 tw-transition">
                    <Icon size={22} />
                  </div>

                  <h5 className="tw-mt-4 tw-font-semibold tw-text-slate-900">
                    {block.title}
                  </h5>

                  <p className="tw-mt-2 tw-text-sm tw-text-slate-600">
                    {block.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
