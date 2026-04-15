import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,

} from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: 'https://www.facebook.com/people/Levitica-Technologies/61556544303087',
  },

  {
    name: "Twitter",
    icon: FaXTwitter,
    url: "https://x.com/levitica02?s=11",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/company/levitica-technologies-pvt-ltd",
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: 'https://www.youtube.com/@leviticatechnologies',
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-slate-900 text-white">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* LINK COLUMNS */}
          {["QUICK LINKS", "COMPANY", "LEGAL", "SUPPORT"].map((category) => (
            <div key={category}>
              <h4 className="font-semibold text-lg mb-6 text-white">
                {category}
              </h4>

              <ul className="space-y-3 text-sm text-white/80">
                {getLinksByCategory(category).map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="hover:text-white text-white/80 hover:underline transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT SECTION */}
          <div className="text-white">
            <h4 className="font-semibold text-lg text-white mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-5 text-sm text-white/80">

              <li className="flex gap-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-indigo-400" size={16} />
                </div>
                <span>
                  2nd Floor, Vittal Rao Nagar, Madhapur,
                  Sriram Plaza, Hyderabad, Telangana – 500081
                </span>
              </li>

              <li className="flex gap-4 items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaEnvelope className="text-indigo-400" size={16} />
                </div>
                <span>hr@leviticatechnologies.com</span>
              </li>

              <li className="flex gap-4 items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaPhoneAlt className="text-indigo-400" size={16} />
                </div>
                <span>+91 9032503559</span>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-white/70 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://leviticatechnologies.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:underline text-white"
            >
              Levitica Technologies
            </a>
            . All rights reserved.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-white/10
                  hover:bg-indigo-600
                  hover:scale-110
                  transition-all duration-300
                "
              >
                <Icon size={20} className="text-white" />
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
};

// LINKS
function getLinksByCategory(category) {
  const links = {
    "QUICK LINKS": [
      { label: "Make Appointment", href: "/contact-us" },
      { label: "Department Services", href: "/services" },
    ],
    COMPANY: [
      { label: "About Our Services", href: "/about-us" },
      { label: "Our Affiliates Program", href: "/#" },
    ],
    LEGAL: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Terms of Service", href: "/terms" },
    ],
    SUPPORT: [
      { label: "Contact", href: "/contact-us" },
      { label: "Knowledge Base", href: "/knowledge-base" },
      { label: "Forums", href: "/forums" },
    ],
  };

  return links[category] || [];
}

export default Footer;