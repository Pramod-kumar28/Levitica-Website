import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const mobileMenuRef = useRef(null);

  // Sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        sticky
          ? "shadow-lg bg-white dark:bg-semidark"
          : "bg-transparent"
      }`}
    >
      {/* MAIN CONTAINER */}
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md h-20 flex items-center justify-between px-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="/img/leviticalogo.png"
            alt="logo"
            className="h-12 object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center justify-center space-x-8">
          <NavItem to="/" label="Home" />
          <NavItem to="/services" label="Services" />
          <NavItem to="/trainings" label="Trainings" />
          <NavItem to="/about-us" label="About Us" />
          <NavItem to="/contact-us" label="Contact Us" />
        </nav>

        {/* RIGHT BUTTONS */}
        <div className="hidden lg:flex items-center gap-4">

          {/* LOGIN */}
          <Link
            to="/login"
            className="border-2 border-primary text-primary px-4 h-10 flex items-center rounded-lg hover:bg-primary hover:text-white hover:shadow-md transition duration-300"
          >
            Log in
          </Link>

          {/* SIGN UP */}
          <Link
            to="/sign-up"
            className="bg-primary text-white px-4 h-10 flex items-center rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>

          {/* DOWNLOAD */}
          <Link
            to="/app"
            className="border-2 border-primary text-primary px-4 h-10 flex items-center rounded-lg hover:bg-primary hover:text-white hover:shadow-md transition duration-300"
          >
            Download App
          </Link>

        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="lg:hidden p-2"
        >
          <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
          <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
          <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
        </button>
      </div>

      {/* OVERLAY */}
      {navbarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white dark:bg-darkmode shadow-lg z-50 transform transition-transform duration-300 ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-midnight_text dark:text-white">
            Menu
          </h2>
          <button onClick={() => setNavbarOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <MobileNavItem to="/" label="Home" close={() => setNavbarOpen(false)} />
          <MobileNavItem to="/services" label="Services" close={() => setNavbarOpen(false)} />
          <MobileNavItem to="/trainings" label="Trainings" close={() => setNavbarOpen(false)} />
          <MobileNavItem to="/about-us" label="About Us" close={() => setNavbarOpen(false)} />
          <MobileNavItem to="/contact-us" label="Contact Us" close={() => setNavbarOpen(false)} />

          <hr />

          <MobileNavItem to="/login" label="Log in" close={() => setNavbarOpen(false)} />
          <MobileNavItem to="/sign-up" label="Sign Up" close={() => setNavbarOpen(false)} />
          <MobileNavItem to="/app" label="Download App" close={() => setNavbarOpen(false)} />
        </div>
      </div>
    </header>
  );
};

/* DESKTOP ITEM */
const NavItem = ({ to, label }) => (
  <Link
    to={to}
    className="text-midnight_text dark:text-white hover:text-primary transition font-medium"
  >
    {label}
  </Link>
);

/* MOBILE ITEM */
const MobileNavItem = ({ to, label, close }) => (
  <Link
    to={to}
    onClick={close}
    className="text-midnight_text dark:text-white hover:text-primary py-1"
  >
    {label}
  </Link>
);

export default Navbar;