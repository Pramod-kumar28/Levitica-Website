import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGoogle,
  

  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
 
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
    <footer className="tw-bg-gradient-to-b tw-from-slate-950 tw-to-slate-900 tw-text-white">

      {/* TOP SECTION */}
      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-20 tw-text-white">
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-5 tw-gap-12">

          {/* LINK COLUMNS */}
          {["QUICK LINKS", "COMPANY", "LEGAL", "SUPPORT"].map((category) => (
            <div key={category}>
              <h4 className="tw-font-semibold tw-text-lg tw-mb-6 tw-text-white">
                {category}
              </h4>

              <ul className="tw-space-y-3 tw-text-sm tw-text-white/80">
                {getLinksByCategory(category).map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="hover:tw-text-white tw-text-white/80 hover:tw-underline tw-transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT SECTION */}
          <div className="tw-text-white">
            <h4 className="tw-font-semibold tw-text-lg tw-text-white tw-mb-6">
              Get In Touch
            </h4>

            <ul className="tw-space-y-5 tw-text-sm tw-text-white/80">

              <li className="tw-flex tw-gap-4">
                <FaMapMarkerAlt className="tw-text-indigo-400 tw-mt-1" size={30} />
                <span>
                  2nd Floor, Vittal Rao Nagar, Madhapur,  
                  Sriram Plaza, Hyderabad, Telangana – 500081
                </span>
              </li>

              <li className="tw-flex tw-gap-4 tw-items-center">
                <FaEnvelope className="tw-text-indigo-400" size={16} />
                <span>hr@designcareermetrics.com</span>
              </li>

              <li className="tw-flex tw-gap-4 tw-items-center">
                <FaPhoneAlt className="tw-text-indigo-400" size={16} />
                <span>+91 73375 72543</span>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="tw-border-t tw-border-white/10">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-6 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-gap-6">

          <p className="tw-text-sm tw-text-white/70 tw-text-center md:tw-text-left">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://designcareermetrics.com"
              target="_blank"
              rel="noreferrer"
              className="tw-font-medium hover:tw-underline tw-text-white"
            >
              DCM
            </a>
            . All rights reserved.
          </p>

          {/* SOCIAL ICONS */}
          <div className="tw-flex tw-gap-4">
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="
                  tw-w-10 tw-h-10
                  tw-flex tw-items-center tw-justify-center
                  tw-rounded-full
                  tw-bg-white/10
                  hover:tw-bg-indigo-600
                  hover:tw-scale-110
                  tw-transition-all tw-duration-300
                "
              >
                <Icon size={20} className="tw-text-white" />
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