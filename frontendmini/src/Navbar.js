import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHeartbeat } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="navbar">
       <div className="navbar-logo">
        <FaHeartbeat size={28} color="#c1121f" /> {/* Icon as logo */}
      </div>
      <div className={`navbar-links ${isMobileMenuOpen ? "open" : ""}`}>
        <Link
          className={location.pathname === "/home" ? "active" : ""}
          to="/home"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          className={location.pathname === "/result" ? "active" : ""}
          to="/result"
          onClick={() => setMobileMenuOpen(false)}
        >
          Result
        </Link>
        <Link
          className={location.pathname === "/awareness" ? "active" : ""}
          to="/awareness"
          onClick={() => setMobileMenuOpen(false)}
        >
          Awareness
        </Link>
        <Link
          className={location.pathname === "/navigation" ? "active" : ""}
          to="/navigation"
          onClick={() => setMobileMenuOpen(false)}
        >
          Navigation
        </Link>
      </div>
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
