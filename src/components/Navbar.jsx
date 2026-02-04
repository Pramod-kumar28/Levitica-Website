import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50 tw-bg-white tw-shadow-lg tw-border-b">
      <nav className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-3">
        <div className="tw-flex tw-items-center tw-justify-between tw-h-16">

          {/* Logo */}
          <Link to="/" className="tw-flex tw-items-center">
            <img
              src="/img/dcmlogo3.jpg"
              alt="logo"
              className="tw-h-10 tw-w-auto"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:tw-hidden tw-text-gray-700"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop menu */}
          <ul className="tw-hidden lg:tw-flex tw-items-center tw-gap-6 tw-font-semibold">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/trainings">Trainings</NavItem>
            <NavItem to="/about-us">About Us</NavItem>
            <NavItem to="/contact-us">Contact Us</NavItem>

            {/* ⬇️ KEEP btn classes */}
            <li>
              <Link to="/login">
                <button className="btn outline-btn">Log in</button>
              </Link>
            </li>

            <li>
              <Link to="/sign-up">
                <button className="btn outline-btn">Sign Up</button>
              </Link>
            </li>

            <li>
              <Link to="/dcm-app">
                <button className="btn accent-outline-btn">
                  Download App
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        {isNavOpen && (
          <div className="lg:tw-hidden tw-border-t tw-py-4">
            <ul className="tw-flex tw-flex-col tw-gap-4">
              <MobileNavItem to="/" close={() => setIsNavOpen(false)}>Home</MobileNavItem>
              <MobileNavItem to="/services" close={() => setIsNavOpen(false)}>Services</MobileNavItem>
              <MobileNavItem to="/trainings" close={() => setIsNavOpen(false)}>Trainings</MobileNavItem>
              <MobileNavItem to="/about-us" close={() => setIsNavOpen(false)}>About Us</MobileNavItem>
              <MobileNavItem to="/contact-us" close={() => setIsNavOpen(false)}>Contact Us</MobileNavItem>

              {/* ⬇️ KEEP btn classes */}
              <li>
                <Link to="/login" onClick={() => setIsNavOpen(false)}>
                  <button className="btn outline-btn tw-w-full">
                    Log in
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/sign-up" onClick={() => setIsNavOpen(false)}>
                  <button className="btn outline-btn tw-w-full">
                    Sign Up
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/dcm-app" onClick={() => setIsNavOpen(false)}>
                  <button className="btn accent-outline-btn tw-w-full">
                    Download App
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

/* ---------------- Helpers ---------------- */

const NavItem = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="tw-text-gray-700 hover:tw-text-blue-600 tw-transition"
    >
      {children}
    </Link>
  </li>
);

const MobileNavItem = ({ to, children, close }) => (
  <li>
    <Link
      to={to}
      onClick={close}
      className="tw-text-gray-700 hover:tw-text-blue-600"
    >
      {children}
    </Link>
  </li>
);

export default Navbar;
