import { Link } from "react-router-dom";
import ContactUsForm from "./ContactForm";

const ContactUs = () => {
  return (
    <div className="pt-20">

      {/* ===== HERO (unchanged visual, fixed React syntax) ===== */}
      <section
        className="hero-section gradient-overlay relative py-28"
        style={{
          background: "url('/img/header-bg-5.jpg') center / cover no-repeat",
        }}
      >
        <div
          className="hero-bottom-shape-two"
          style={{
            background: "url('/img/hero-bottom-shape.svg') no-repeat bottom center",
          }}
        />

        <div className=" backdrop-blur-sm max-w-5xl mx-auto text-center px-4 mt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Contact Us
          </h1>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* FORM */}
            <div className="bg-slate-50 rounded-xl p-8 shadow">
              <h4 className="text-xl font-semibold mb-6">
                Ready to get started?
              </h4>
              <ContactUsForm />
            </div>

            {/* INFO */}
            <div>
              <h2 className="text-3xl font-bold">
                Looking for an excellent business idea?
              </h2>

              <p className="text-slate-600 mt-3">
                Seamlessly deliver next-generation digital initiatives with our expert team.
              </p>

              <Link  to="/services" className="btn outline-btn mt-6">
                View Services →
              </Link>

              <hr className="my-10" />

              <h5 className="text-lg font-semibold mb-2">
                Our Headquarters
              </h5>

              <address className="not-italic text-slate-600 leading-relaxed">
                2nd Floor, Vittal Rao Nagar, Sriram Plaza, <br />
                Madhapur, Hyderabad, Telangana 500081
              </address>

              <div className="mt-4 text-slate-700">
                <p><strong>Phone:</strong> +91 9032503559</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hr@leviticatechnologies.com"
                    className="text-blue-600 hover:underline"
                  >
                    hr@leviticatechnologies.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <div className="w-full">
        <iframe
          title=" Levitica Technologies Office Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.330780255581!2d78.3854985!3d17.4438751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873dde7736fdeff1%3A0x88d3af212bf885bc!2sLevitica%20Technologies%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1774844621869!5m2!1sen!2sin"
          width="100%"
          height="450"
          className="border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </div>
  );
};

export default ContactUs;
