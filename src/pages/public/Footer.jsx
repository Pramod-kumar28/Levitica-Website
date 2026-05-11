import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-midnight_text dark:bg-midnight_text text-white">

      {/* ===== TOP SECTION ===== */}
      <div className="container mx-auto max-w-screen-xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-start">

          {/* LOGO */}
          <div className="flex justify-center lg:justify-start">
            <img src="/img/leviticalogo.png" className="h-14 object-contain" alt="Levitica Logo" />
          </div>

          {/* ADDRESS */}
          <div>
            <h5 className="text-md font-semibold text-white mb-4 tracking-wide">Address</h5>
            <p className="text-gray leading-relaxed text-sm mb-4">
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
            <h5 className="text-md font-semibold text-white mb-4 tracking-wide">Quick Links</h5>
            <ul className="space-y-2 text-gray text-sm">
              <li><Link to="/contact-us" className="hover:text-primary transition">Contact Support</Link></li>
              <li><Link to="/services" className="hover:text-primary transition">Services</Link></li>
              <li><Link to="/trainings" className="hover:text-primary transition">Trainings</Link></li>
              <li><Link to="/about-us" className="hover:text-primary transition">About Us</Link></li>
            </ul>
          </div>

          {/* TERMS & CONDITIONS */}
          <div>
            <h5 className="text-md font-semibold text-white mb-4 tracking-wide">Terms & Conditions</h5>
            <ul className="space-y-2 text-gray text-sm">
              <li><Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition">Terms of Service</Link></li>
              <li><Link to="/refund" className="hover:text-primary transition">Refund Policy</Link></li>
            </ul>
          </div>

          {/* POPULAR SEARCHES */}
          <div>
            <h5 className="text-md font-semibold text-white mb-4 tracking-wide">Popular Searches</h5>
            <ul className="space-y-2 text-gray text-sm">
              <li className="hover:text-primary transition cursor-pointer">Internships</li>
              <li className="hover:text-primary transition cursor-pointer">Full Stack Development</li>
              <li className="hover:text-primary transition cursor-pointer">AI & Machine Learning</li>
              <li className="hover:text-primary transition cursor-pointer">Digital Marketing</li>
            </ul>
          </div>

        </div>
      </div>

      {/* ===== MIDDLE SECTION ===== */}
      <div className="border-t border-dark_border py-6">
        <div className="container mx-auto max-w-screen-xl px-4 flex flex-col lg:flex-row justify-between items-center gap-4">

          {/* LEFT - Contact Info */}
          <div className="flex flex-col sm:flex-row gap-4 text-gray text-sm text-center sm:text-left">
            <p>
              <span className="text-white font-medium">Phone :</span> +91 9032503559
            </p>
            <p>
              <span className="text-white font-medium">Email :</span> hr@leviticatechnologies.com
            </p>
          </div>

        </div>
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="border-t border-dark_border py-4 text-center text-gray text-xs">
        © {new Date().getFullYear()} Levitica Technologies. All rights reserved.
      </div>

    </footer>
  );
};

/* SOCIAL ICON */
const Social = ({ icon: Icon }) => (
  <div className="w-8 h-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-primary hover:scale-105 transition-all duration-300 cursor-pointer">
    <Icon size={13} className="text-white" />
  </div>
);

export default Footer;