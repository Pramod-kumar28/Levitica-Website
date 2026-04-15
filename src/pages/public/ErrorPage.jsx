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
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-2xl text-center text-white">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <FaHourglassHalf className="text-6xl text-white/90" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Coming Soon
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/80 mb-8">
              We’re working hard to bring this page to life.  
              Stay tuned for something amazing!
            </p>

            {/* CTA */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll To Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default ErrorPage;
