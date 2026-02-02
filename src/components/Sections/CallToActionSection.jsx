import { Link } from "react-router-dom";

const ConsultingCTA = () => {
  return (
    <section className="tw-bg-slate-100 tw-py-20">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4">

        <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-start md:tw-items-center tw-justify-between tw-gap-8">

          {/* Content */}
          <div className="tw-max-w-2xl">
            <h3 className="tw-text-2xl md:tw-text-3xl tw-font-semibold tw-text-slate-900">
              Consulting Services To Empower Your Business
            </h3>
            <p className="tw-mt-3 tw-text-slate-600">
              Rapidiously engage fully tested e-commerce with progressive
              architectures.
            </p>
          </div>

          {/* CTA */}
          <div>
            <Link to="/contact-us" className="btn secondary-solid-btn">
              Contact With Us
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ConsultingCTA;
