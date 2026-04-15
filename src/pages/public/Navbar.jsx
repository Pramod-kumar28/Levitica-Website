import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/img/leviticalogo.png"
              alt="logo"
              className="h-20 w-auto"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsNavOpen(true)}
            aria-label="Toggle navigation"
          >
            <Menu size={28} />
          </button>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-6 font-semibold">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/trainings">Trainings</NavItem>
            <NavItem to="/about-us">About Us</NavItem>
            <NavItem to="/contact-us">Contact Us</NavItem>

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
              <Link to="/app">
                <button className="btn accent-outline-btn">
                  Download App
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setIsNavOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-end p-4 border-b">
          <button onClick={() => setIsNavOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="flex flex-col">

          <MobileNavItem to="/" close={() => setIsNavOpen(false)}>
            Home
          </MobileNavItem>

          <MobileNavItem to="/services" close={() => setIsNavOpen(false)}>
            Services
          </MobileNavItem>

          <MobileNavItem to="/trainings" close={() => setIsNavOpen(false)}>
            Trainings
          </MobileNavItem>

          <MobileNavItem to="/about-us" close={() => setIsNavOpen(false)}>
            About Us
          </MobileNavItem>

          <MobileNavItem to="/contact-us" close={() => setIsNavOpen(false)}>
            Contact Us
          </MobileNavItem>

          {/* Buttons */}

          <MobileNavItem to="/login" close={() => setIsNavOpen(false)}>

            Log in

          </MobileNavItem>

          <MobileNavItem to="/sign-up" close={() => setIsNavOpen(false)}>
            Sign Up

          </MobileNavItem>

          <MobileNavItem to="/app" close={() => setIsNavOpen(false)}>

            Download App

          </MobileNavItem>

        </ul>
      </div>
    </header>
  );
};

/* Desktop Nav Item */

const NavItem = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-700 hover:text-blue-600 transition"
    >
      {children}
    </Link>
  </li>
);

/* Mobile Nav Item */

const MobileNavItem = ({ to, children, close }) => (
  <li className="border-b">
    <Link
      to={to}
      onClick={close}
      className="block w-full py-3 px-6 text-gray-800 hover:bg-gray-100 hover:text-blue-600 transition"
    >
      {children}
    </Link>
  </li>
);

export default Navbar;