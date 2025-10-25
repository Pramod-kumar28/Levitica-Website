import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);


  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg border fixed-top custom-nav bg-white text-dark">
          <div className="container">
            <div className="navbar-brand ">
              <div >
                <img
                  src="/img/dcmlogo3.jpg"
                  alt="logo"
                  className="logo-img "
                />
              </div>
              <div >
                <button className="navbar-toggler" onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Toggle navigation">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={`navbar-collapse collapse ${isNavOpen ? "show  bg-white" : ""}`}>
              <ul className="navbar-nav ml-auto menu ">
                <li ><Link to="/" onClick={() => setIsNavOpen(false)} className="text-dark " >Home</Link></li>
                <li>
                  <Link to="/services" className="text-dark" onClick={() => setIsNavOpen(false)}>Services</Link>

                </li>
                <li><Link to="/trainings" className="text-dark" onClick={() => setIsNavOpen(false)}>Trainings</Link></li>
                <li><Link to="/about-us" className="text-dark" onClick={() => setIsNavOpen(false)}>About Us</Link></li>
                <li><Link to="/contact-us" className="text-dark" onClick={() => setIsNavOpen(false)}>Contact Us</Link></li>
                <li>
                  <Link to="/login" className="text-dark  " onClick={() => setIsNavOpen(false)}><button className="btn outline-btn ">Log in</button></Link>

                </li>
                <li>
                  <Link to="/sign-up" className="text-dark " onClick={() => setIsNavOpen(false)}>
                    <button className="btn outline-btn ">Sign Up</button>
                  </Link>
                </li>
                <li>

                  <Link to="/dcm-app" className="text-dark" onClick={() => setIsNavOpen(false)}>
                    <button className="btn accent-outline-btn ">Download App</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
};
export default Navbar;