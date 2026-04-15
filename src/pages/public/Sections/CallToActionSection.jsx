import { Link } from "react-router-dom";

const ConsultingCTA = () => {
  return (
    <section className="bg-slate-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Content */}
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl md:text-3xl font-semibold text-slate-900">
              Consulting Services To Empower Your Business
            </h3>
            <p className="mt-2 text-slate-600 text-sm md:text-base">
              Rapidiously engage fully tested e-commerce with progressive architectures.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <Link
              to="/contact-us"
              className="btn secondary-solid-btn px-6 py-2.5 text-sm md:text-base"
            >
              Contact With Us
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ConsultingCTA;