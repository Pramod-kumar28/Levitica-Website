import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://facebook.com/aslok",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/design_career_metrics",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/company/design-career-metrics-pvt-ltd",
  },
  {
    name: "Google",
    icon: FaGoogle,
    url: "https://share.google/8e69r070lynTkqioy",
  },
];

const Footer = () => {
  return (
    <footer className="tw-bg-slate-900 tw-text-slate-300">

      {/* TOP */}
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-20">
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-5 tw-gap-12">

          {["QUICK LINKS", "COMPANY", "LEGAL", "SUPPORT"].map((category) => (
            <div key={category}>
              <h4 className="tw-text-white tw-font-semibold tw-mb-4">
                {category}
              </h4>
              <ul className="tw-space-y-2">
                {getLinksByCategory(category).map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="hover:tw-text-white tw-transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="tw-text-white tw-font-semibold tw-mb-4">
              Get In Touch
            </h4>

            <ul className="tw-space-y-4">
              <li className="tw-flex tw-gap-3">
                <FaMapMarkerAlt className="tw-mt-1 tw-text-indigo-400" />
                <span>
                  Office #407 & 409, 4th Floor, Jain Sadguru Image's Capital Park,
                  Madhapur, Hyderabad
                </span>
              </li>

              <li className="tw-flex tw-gap-3">
                <FaEnvelope className="tw-text-indigo-400" />
                <span>hr@designcareermetrics.com</span>
              </li>

              <li className="tw-flex tw-gap-3">
                <FaPhoneAlt className="tw-text-indigo-400" />
                <span>+91 73375 72543</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="tw-border-t tw-border-slate-800">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-6 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-gap-4">

          <p className="tw-text-sm">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://designcareermetrics.com"
              target="_blank"
              rel="noreferrer"
              className="tw-text-white hover:tw-underline"
            >
              DCM
            </a>
            . All rights reserved.
          </p>

          <div className="tw-flex tw-gap-4">
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="
                  tw-w-9 tw-h-9 tw-flex tw-items-center tw-justify-center
                  tw-rounded-full tw-bg-slate-800
                  hover:tw-bg-indigo-600 hover:tw-text-white
                  tw-transition
                "
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

// 🔗 Links
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
