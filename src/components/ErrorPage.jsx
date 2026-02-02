import { Link } from "react-router-dom";
import { FaArrowUp, FaHourglassHalf } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="main">
      {/* Hero Section */}
      <section
        className="hero-section ptb-100 gradient-overlay full-screen"
        style={{
          background:
            "url('img/slider-img-2.jpg') no-repeat center center / cover",
        }}
      >
        <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-px-4">
          <div className="tw-max-w-2xl tw-text-center tw-text-white">
            {/* Icon */}
            <div className="tw-flex tw-justify-center tw-mb-6">
              <FaHourglassHalf className="tw-text-6xl tw-text-white/90" />
            </div>

            {/* Heading */}
            <h1 className="tw-text-4xl md:tw-text-5xl tw-font-extrabold tw-mb-4">
              Coming Soon
            </h1>

            {/* Subtitle */}
            <p className="tw-text-lg tw-text-white/80 tw-mb-8">
              We’re working hard to bring this page to life.  
              Stay tuned for something amazing!
            </p>

            {/* CTA */}
            <Link
              to="/"
              className="tw-inline-flex tw-items-center tw-gap-2 tw-border tw-border-white tw-text-white tw-px-8 tw-py-3 tw-rounded-full tw-font-semibold hover:tw-bg-white hover:tw-text-slate-900 tw-transition"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll To Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="tw-fixed tw-bottom-6 tw-right-6 tw-bg-slate-900 tw-text-white tw-p-3 tw-rounded-full tw-shadow-lg hover:tw-bg-slate-700 tw-transition"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default ErrorPage;
