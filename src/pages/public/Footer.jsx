import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-midnight_text text-white">

      {/* ===== TOP SECTION ===== */}
      <div className="container mx-auto max-w-screen-xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">

          {/* LOGO */}
          <div className="flex items-center">
            <img src="/img/leviticalogo.png" className="h-14 object-contain" />
          </div>

          {/* ADDRESS */}
          <div>
            <h4 className="text-lg text-white font-semibold mb-4">Address</h4>
            <p className="text-gray leading-relaxed mb-4">
              2nd Floor, Vittal Rao Nagar, Madhapur,<br />
              Hyderabad, Telangana – 500081
            </p>

            <div className="flex gap-3">
              <Social icon={FaFacebookF} />
              <Social icon={FaXTwitter} />
              <Social icon={FaLinkedinIn} />
              <Social icon={FaYoutube} />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray">
              <li><Link to="/contact-us">Contact Support</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/trainings">Trainings</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
            </ul>
          </div>

          {/* POPULAR SEARCHES */}
          <div>
            <h4 className="text-lg text-white font-semibold mb-4">Popular Searches</h4>
            <ul className="space-y-3 text-gray">
              <li>Internships</li>
              <li>Full Stack Development</li>
              <li>AI & Machine Learning</li>
              <li>Digital Marketing</li>
            </ul>
          </div>

        </div>
      </div>

      {/* ===== MIDDLE SECTION ===== */}
      <div className="border-t border-dark_border py-8">
        <div className="container mx-auto max-w-screen-xl px-4 flex flex-col lg:flex-row justify-between items-center gap-6">

          {/* LEFT */}
          <div className="flex flex-col md:flex-row gap-6 text-gray text-lg">
            <p>
              <span className="text-white font-medium">Phone :</span> +91 9032503559
            </p>
            <p>
              <span className="text-white font-medium">Email :</span> hr@leviticatechnologies.com
            </p>
          </div>

          {/* NEWSLETTER */}
          <div className="flex items-center gap-3 w-full max-w-lg">
            <span className="text-white font-semibold text-lg">
              Newsletter
            </span>

            <div className="flex w-full">
              <input
                type="text"
                placeholder="Email address"
                className="w-full px-4 py-3 bg-white text-black focus:outline-none"
              />
              <button className="bg-primary px-6 py-3 hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="border-t border-dark_border py-4 text-center text-gray text-sm">
        © {new Date().getFullYear()} Levitica Technologies. All rights reserved.
      </div>

    </footer>
  );
};

/* SOCIAL ICON */
const Social = ({ icon: Icon }) => (
  <div className="w-9 h-9 flex items-center justify-center rounded-md bg-white/20 hover:bg-primary transition">
    <Icon size={14} />
  </div>
);

export default Footer;