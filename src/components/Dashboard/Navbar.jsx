import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ fontFamily: "'Signika', sans-serif" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontWeight: 600 }}> {/* Bold font for the brand */}
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/dashboard" style={{ fontWeight: 400 }}> {/* Regular font for menu items */}
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/programs" style={{ fontWeight: 400 }}>
                Programs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/groups" style={{ fontWeight: 400 }}>
                Groups
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/children" style={{ fontWeight: 400 }}>
                Children
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payments" style={{ fontWeight: 400 }}>
                Payments
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout" style={{ fontWeight: 400 }}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
