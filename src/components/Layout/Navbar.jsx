// Navbar.jsx
import React from "react";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="nav-links">
        <div className="logo-text">BetterCalendar</div>
        <NavLink to="/" className="nav-link">
          Add Activity
        </NavLink>
        <NavLink to="ai" className="nav-link">
          AI Planner
        </NavLink>
        {/* <a href="#" className="nav-link">
          Link 3
        </a>
        <a href="#" className="nav-link">
          Link 4
        </a> */}
      </div>
      <div className="bottom-element">
        <img src="path/to/user-img.jpg" alt="User" className="user-img" />
        <span className="username">John Doe</span>
      </div>
    </div>
  );
};

export default Navbar;
