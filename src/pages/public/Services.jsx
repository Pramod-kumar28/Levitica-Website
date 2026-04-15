import data from '@/data/services.json';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Services = () => {
  return (
    <div className="bg-white pt-20">

      {/* HERO */}
      <section
        className="hero-section ptb-100 gradient-overlay py-28"
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
      
        <div className="relative  max-w-4xl mx-auto px-4 text-center py-5 border">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our Services
          </h1>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">

          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              We Provide Best Services
            </h2>
            <p className="mt-4 text-slate-600">
              Efficiently aggregate end-to-end core competencies without
              maintainable ideas. Dynamically foster tactical solutions without
              enabled value.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.services.map((service, index) => (
              <div
                key={index}
                className="
                  group bg-white rounded-2xl p-8
                  shadow-sm hover:shadow-xl
                  transition flex flex-col
                "
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-20 h-20 object-contain mb-6"
                />

                <h5 className="text-lg font-semibold text-slate-900">
                  {service.title}
                </h5>

                <p className="mt-3 text-slate-600 flex-grow">
                  {service.description}
                </p>

                <Link
                  to={service.path}
                  className="
                    mt-6 inline-flex items-center gap-2
                    text-indigo-600 font-medium
                    hover:text-indigo-700
                    transition
                  "
                >
                  Get More Info
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition" />
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
