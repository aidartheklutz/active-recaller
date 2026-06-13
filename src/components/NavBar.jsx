import React from "react";
import { NavLink } from "react-router";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-content">
        {/* Logo and Title */}
        <NavLink to="/" className="nav-logo">
          <img src="/active-recaller.png" alt="Active Recaller Logo" />
          <div>
            <h1>Active Recaller</h1>
            <p>Memorize stuff!</p>
          </div>
        </NavLink>

        {/* Navigation Links with Icons */}
        <div className="nav-links">
          <NavLink to="/" className="navbarLink" title="Home">
            <i
              className="bi bi-house-door-fill"
              style={{ fontSize: "1.6rem" }}
            ></i>
          </NavLink>
          <NavLink to="/about" className="navbarLink" title="About project">
            <i
              className="bi bi-info-circle-fill"
              style={{ fontSize: "1.6rem" }}
            ></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
