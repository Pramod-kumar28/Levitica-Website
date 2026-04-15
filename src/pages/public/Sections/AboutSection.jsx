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
    <section className="bg-gradient-to-b from-white to-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              From Learning to Leading  We’re With You.
            </h2>

            <p className="mt-4 text-slate-600">
              We help individuals and organizations move from foundational learning
              to leadership through innovative, scalable solutions.
            </p>

            <p className="mt-3 text-slate-600">
              Our approach blends strategy, technology, and creativity to unlock
              sustainable growth and long-term value.
            </p>

            {/* Feature list */}
            <ul className="mt-8 space-y-3">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-slate-800"
                >
                  <FaCheckCircle className="text-emerald-500" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT PROMO BLOCKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {promoBlocks.map((block, idx) => {
              const Icon = block.icon;

              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition">
                    <Icon size={22} />
                  </div>

                  <h5 className="mt-4 font-semibold text-slate-900">
                    {block.title}
                  </h5>

                  <p className="mt-2 text-sm text-slate-600">
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
