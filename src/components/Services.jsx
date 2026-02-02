import data from "../data/services.json";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Services = () => {
  return (
    <div className="tw-bg-white tw-pt-20">

      {/* HERO */}
      <section
        className="hero-section ptb-100 gradient-overlay"
        style={{
          background: "url('/img/header-bg-5.jpg') center / cover no-repeat",
        }}
      >
         <div
            className="hero-bottom-shape-two"
            style={{
              background: "url('img/hero-bottom-shape.svg') no-repeat bottom center",
            }}
          ></div>
      
        <div className="tw-relative  tw-max-w-4xl tw-mx-auto tw-px-4 tw-text-center tw-py-5 tw-border">
          <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white">
            Our Services
          </h1>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="tw-bg-slate-50 tw-py-24">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4">

          {/* Section header */}
          <div className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-16">
            <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-slate-900">
              We Provide Best Services
            </h2>
            <p className="tw-mt-4 tw-text-slate-600">
              Efficiently aggregate end-to-end core competencies without
              maintainable ideas. Dynamically foster tactical solutions without
              enabled value.
            </p>
          </div>

          {/* Grid */}
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {data?.services.map((service, index) => (
              <div
                key={index}
                className="
                  tw-group tw-bg-white tw-rounded-2xl tw-p-8
                  tw-shadow-sm hover:tw-shadow-xl
                  tw-transition tw-flex tw-flex-col
                "
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="tw-w-20 tw-h-20 tw-object-contain tw-mb-6"
                />

                <h5 className="tw-text-lg tw-font-semibold tw-text-slate-900">
                  {service.title}
                </h5>

                <p className="tw-mt-3 tw-text-slate-600 tw-flex-grow">
                  {service.description}
                </p>

                <Link
                  to={service.path}
                  className="
                    tw-mt-6 tw-inline-flex tw-items-center tw-gap-2
                    tw-text-indigo-600 tw-font-medium
                    hover:tw-text-indigo-700
                    tw-transition
                  "
                >
                  Get More Info
                  <FaArrowRight className="tw-text-sm group-hover:tw-translate-x-1 tw-transition" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Services;
