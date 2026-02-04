import { Link } from "react-router-dom";
import { memo } from "react";
import {
  FiArrowRight,
  FiTrendingUp,
  FiShare2,
  FiBarChart2,
} from "react-icons/fi";
// import MarketingLottie from "../lottie/MarketingLottie";


const HeroSlideMarketing = memo(({isActive}) => {
  return (
    <section className="tw-relative tw-overflow-hidden tw-py-28 tw-bg-gradient-to-br tw-from-orange-900 tw-via-red-900 tw-to-pink-900">
      
      {/* Background glow */}
      <div className="tw-absolute tw-inset-0 tw-bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] tw-from-white/5 tw-to-transparent" />

      <div className="tw-relative tw-max-w-7xl tw-mx-auto tw-px-4">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-5 tw-gap-12 tw-items-center">

          {/* ================= TEXT ================= */}
          <div className="lg:tw-col-span-3 tw-text-white tw-order-1 lg:tw-order-1">

            <span className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-sm tw-text-sm tw-font-medium tw-mb-6 hover:tw-bg-white/20 tw-transition">
              <span className="tw-w-2 tw-h-2 tw-bg-yellow-400 tw-rounded-full tw-animate-pulse"></span>
              Growth • Branding • Performance
            </span>

            <h1 className="tw-text-4xl md:tw-text-5xl lg:tw-text-6xl tw-font-bold tw-leading-tight tw-text-white">
              Digital Marketing That{" "}
              <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-orange-400 tw-to-pink-400">
                Delivers
              </span>
            </h1>

            <p className="tw-mt-6 tw-text-base md:tw-text-lg tw-text-orange-100 tw-max-w-2xl">
              Data-driven SEO, high-conversion social media campaigns, and
              performance-focused brand strategies designed to grow your
              visibility, engagement, and revenue.
            </p>

            {/* ================= CTA ================= */}
            <div className="tw-flex tw-flex-wrap tw-gap-4 tw-mt-8">
              <Link
                to="/services"
                className="
                  tw-group
                  tw-inline-flex
                  tw-items-center
                  tw-gap-2
                  tw-bg-gradient-to-r
                  tw-from-orange-500
                  tw-to-pink-500
                  hover:tw-from-orange-600
                  hover:tw-to-pink-600
                  tw-text-white
                  tw-px-8
                  tw-py-3
                  tw-rounded-xl
                  tw-font-semibold
                  tw-shadow-lg
                  hover:tw-shadow-2xl
                  tw-transition-all
                "
              >
                Explore Services
                <FiArrowRight className="tw-transition-transform group-hover:tw-translate-x-1" />
              </Link>

              <Link
                to="/contact-us"
                className="
                  tw-group
                  tw-inline-flex
                  tw-items-center
                  tw-gap-2
                  tw-bg-white/10
                  hover:tw-bg-white/20
                  tw-backdrop-blur-sm
                  tw-text-white
                  tw-border
                  tw-border-white/30
                  tw-px-8
                  tw-py-3
                  tw-rounded-xl
                  tw-font-semibold
                  tw-transition-all
                "
              >
                Contact Us
                <FiArrowRight className="tw-opacity-70 group-hover:tw-opacity-100 group-hover:tw-translate-x-1 tw-transition" />
              </Link>
            </div>

            {/* ================= FEATURES ================= */}
            <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-mt-12">
              <Feature
                icon={<FiTrendingUp />}
                label="SEO Optimization"
                color="orange"
              />
              <Feature
                icon={<FiShare2 />}
                label="Social Media"
                color="pink"
              />
              <Feature
                icon={<FiBarChart2 />}
                label="Analytics & Growth"
                color="red"
              />
            </div>
          </div>

          {/* ================= LOTTIE ================= */}
          <div className="lg:tw-col-span-2 tw-relative tw-order-2 lg:tw-order-2">
            <div className="tw-relative tw-z-10 lg:tw--mr-8">
              {/* {isActive ? (
                <MarketingLottie isActive />
              ) : (
                <div className="tw-w-full tw-max-w-md tw-h-[360px]" />
              )} */}
            </div>

            {/* floating glows */}
            <div className="tw-absolute tw-top-8 tw-left-4 tw-w-24 tw-h-24 tw-bg-pink-500/20 tw-rounded-full tw-blur-xl"></div>
            <div className="tw-absolute tw-bottom-8 tw-right-4 tw-w-20 tw-h-20 tw-bg-orange-500/20 tw-rounded-full tw-blur-xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
});

/* ================= FEATURE ITEM ================= */
const Feature = ({ icon, label, color }) => {
  const colors = {
    orange: "tw-bg-orange-500/20 tw-text-orange-300",
    pink: "tw-bg-pink-500/20 tw-text-pink-300",
    red: "tw-bg-red-500/20 tw-text-red-300",
  };

  return (
    <div className="tw-group tw-flex tw-items-center tw-gap-3 hover:tw-translate-y-[-2px] tw-transition">
      <div
        className={`tw-p-2 tw-rounded-lg ${colors[color]} group-hover:tw-scale-110 tw-transition`}
      >
        {icon}
      </div>
      <span className="tw-text-sm tw-text-orange-200 group-hover:tw-text-white tw-transition">
        {label}
      </span>
    </div>
  );
};

export default HeroSlideMarketing;
