import { Link } from "react-router-dom";
import ContactUsForm from "./ContactForm";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="pt-6">

      {/* ================= HERO (PROPERTY STYLE) ================= */}
      <section className="bg-herobg bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">

          <h1 className="text-4xl md:text-5xl font-bold text-midnight_text dark:text-white">
            Contact Us
          </h1>

          <p className="mt-4 text-gray max-w-xl mx-auto">
            Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing
          </p>

          <div className="mt-6 text-midnight_text dark:text-white">
            Home <span className="mx-2">›</span> Contact
          </div>

        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="py-12 bg-white dark:bg-darkmode">
        <div className="max-w-4xl mx-auto px-4">

          <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-center">
            
            {/* EMAIL */}
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 w-14 h-14 flex items-center justify-center rounded-full mb-3">
                <FaEnvelope className="text-primary text-xl" />
              </div>

              <h4 className="font-semibold text-midnight_text dark:text-white">
                Email Us
              </h4>

              <p className="text-gray mt-2 text-sm max-w-xs">
                hr@leviticatechnologies.com
              </p>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 w-14 h-14 flex items-center justify-center rounded-full mb-3">
                <FaMapMarkerAlt className="text-primary text-xl" />
              </div>

              <h4 className="font-semibold text-midnight_text dark:text-white">
                Address
              </h4>

              <p className="text-gray mt-2 text-sm max-w-xs">
                2nd Floor, Vittal Rao Nagar, Madhapur, Hyderabad
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= MAP ================= */}
      <div className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <iframe
            title="Levitica Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.330780255581!2d78.3854985!3d17.4438751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873dde7736fdeff1%3A0x88d3af212bf885bc!2sLevitica%20Technologies%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1774844621869!5m2!1sen!2sin"
            className="w-full h-[400px] rounded-lg"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* ================= FORM SECTION ================= */}
      <section className="py-20 bg-white dark:bg-darkmode">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* FORM */}
            <div>
              <h2 className="text-2xl font-bold text-midnight_text dark:text-white mb-6">
                Get Online Consultation
              </h2>

              <ContactUsForm />
            </div>

            {/* IMAGE */}
            <div className="h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1596550190504-8cd94a80b3bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29udGFjdCUyMHJlbGF0ZWQlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
                alt="contact"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ================= OFFICE SECTION ================= */}
      <section className="bg-primary lg:py-10 py-10 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-6 lg:grid-cols-9 gap-7 pb-2">

            <div className="col-span-3">
              <h2 className="text-white text-4xl font-bold">
                Hyderabad Office
              </h2>
            </div>

            <div className="col-span-3">
              <p className="text-white/70 text-xl">
                Madhapur, Telangana
              </p>
            </div>

            <div className="col-span-3">
              <a href="mailto:hr@leviticatechnologies.com" className="text-white underline">
                hr@leviticatechnologies.com
              </a>

              <p className="text-white/80 mt-2">
                Call: +91 9032503559
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactUs;