import ContactUsForm from "./ContactForm";

const ContactUs = () => {
  return (
    <div className="tw-pt-20">

      {/* ===== HERO (unchanged visual, fixed React syntax) ===== */}
      <section
        className="hero-section gradient-overlay tw-relative tw-py-28"
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

        <div className=" tw-backdrop-blur-sm tw-max-w-5xl tw-mx-auto tw-text-center tw-px-4 tw-mt-12">
          <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white">
            Contact Us
          </h1>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="tw-py-24">
        <div className="tw-max-w-6xl tw-mx-auto tw-px-4">
          <div className="tw-grid md:tw-grid-cols-2 tw-gap-12 tw-items-start">

            {/* FORM */}
            <div className="tw-bg-slate-50 tw-rounded-xl tw-p-8 tw-shadow">
              <h4 className="tw-text-xl tw-font-semibold tw-mb-6">
                Ready to get started?
              </h4>
              <ContactUsForm />
            </div>

            {/* INFO */}
            <div>
              <h2 className="tw-text-3xl tw-font-bold">
                Looking for an excellent business idea?
              </h2>

              <p className="tw-text-slate-600 tw-mt-3">
                Seamlessly deliver next-generation digital initiatives with our expert team.
              </p>

              <button className="btn outline-btn tw-mt-6">
                Get Directions →
              </button>

              <hr className="tw-my-10" />

              <h5 className="tw-text-lg tw-font-semibold tw-mb-2">
                Our Headquarters
              </h5>

              <address className="tw-not-italic tw-text-slate-600 tw-leading-relaxed">
                Office #407, 4th Floor, Jain Sadguru Image's Capital Park, <br />
                Ayyappa Society, Madhapur, Hyderabad, Telangana 500081
              </address>

              <div className="tw-mt-4 tw-text-slate-700">
                <p><strong>Phone:</strong> +91 7337572543</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hr@designcareermetrics.com"
                    className="tw-text-blue-600 hover:tw-underline"
                  >
                    hr@designcareermetrics.com
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <div className="tw-w-full">
        <iframe
         title="DCM Technologies Office Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2660901615855!2d78.38363917414267!3d17.44697380108786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910838be5b35%3A0xfa8c53166a450046!2sDesign%20Career%20Metrics%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1758168750472!5m2!1sen!2sin"
          width="100%"
          height="450"
          className="tw-border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </div>
  );
};

export default ContactUs;
