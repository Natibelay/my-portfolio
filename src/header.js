import React, { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaUser,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "./header.css";

export default function Header({ setSection, token, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goTo = (sec) => {
    setSection(sec);
    setMenuOpen(false); // close menu
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <div className="logo" onClick={() => goTo("home")}>
          MyPortfolio
        </div>

        {/* Mobile Menu Button */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>

        {/* Navigation */}
        <nav className={menuOpen ? "active" : ""}>
          <span onClick={() => goTo("home")}>
            <FaHome className="icon" /> Home
          </span>

          <span onClick={() => goTo("about")}>
            <FaInfoCircle className="icon" /> About
          </span>

          <span onClick={() => goTo("contact")}>
            <FaEnvelope className="icon" /> Contact
          </span>

          {token ? (
            <>
              <span onClick={() => goTo("dashboard")}>
                <FaTachometerAlt className="icon" /> Dashboard
              </span>

              <span className="logout" onClick={handleLogout}>
                <FaSignOutAlt className="icon" /> Logout
              </span>
            </>
          ) : (
            <span onClick={() => goTo("login")}>
              <FaUser className="icon" /> Login
            </span>
          )}
        </nav>
      </div>

      {/* Overlay behind mobile menu */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
}
