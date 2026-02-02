import {
  FaCheckCircle,
  FaBolt,
  FaSyncAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";

const ManpowerSection = ({ backgroundImage }) => {
  const benefits = [
    { text: "Elite, Verified Workforce", icon: FaCheckCircle },
    { text: "Rapid Deployment", icon: FaBolt },
    { text: "Flexible Staffing Models", icon: FaSyncAlt },
    { text: "Seamless PAN-India Reach", icon: FaMapMarkedAlt },
  ];

  const isDark = Boolean(backgroundImage);

  return (
    <section
      className={`tw-relative tw-py-24 ${
        isDark ? "tw-text-white" : "tw-bg-white tw-text-slate-900"
      }`}
      style={
        backgroundImage
          ? {
              background: `url(${backgroundImage}) center / cover no-repeat`,
            }
          : undefined
      }
    >
      {/* Overlay */}
      {isDark && (
        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-black/70 tw-to-black/50" />
      )}

      <div className="tw-relative tw-max-w-5xl tw-mx-auto tw-px-4 tw-text-center">
        <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-white">
          Empowering Businesses with People Who Make an Impact
        </h2>

        <p className="tw-mt-4 tw-text-lg tw-text-white/90 md:tw-text-xl">
          Professionals who are skilled, vetted, and deployment-ready — delivered
          exactly when and where your business needs them. Not just manpower,
          but momentum.
        </p>

        {/* Benefits */}
        <div className="tw-mt-10 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-6 tw-max-w-3xl tw-mx-auto">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`tw-flex tw-items-center tw-gap-3 tw-p-4 tw-rounded-xl ${
                  isDark
                    ? "tw-bg-white/10 tw-backdrop-blur"
                    : "tw-bg-slate-50"
                }`}
              >
                <Icon className="tw-text-xl tw-text-emerald-400" />
                <span className="tw-font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="tw-mt-12">
          <a
            href="contact-us"
            className={`btn ${
              isDark ? "outline-white-btn" : "outline-btn"
            }`}
          >
            Get Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default ManpowerSection;
