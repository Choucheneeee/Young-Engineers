import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "bi bi-house" },
    { name: "Programs", path: "/programs", icon: "bi bi-book" },
    { name: "Groups", path: "/groups", icon: "bi bi-people" },
    { name: "Children", path: "/children", icon: "bi bi-person" },
    { name: "Payments", path: "/payments", icon: "bi bi-currency-dollar" },
  ];

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "250px", height: "100vh", fontFamily: "'Signika', sans-serif" }}
    >
      <Link
        to="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </Link>

      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link
              to={item.path}
              className="nav-link link-dark"
              style={{
                fontWeight: 400,
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <i className={`${item.icon} me-2`}></i> {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <div className="dropdown">
        <Link
          to="#"
          className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ fontWeight: 400 }}
        >
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            width="40"
            height="40"
            className="rounded-circle me-2"
          />
          <strong>Admin</strong>
        </Link>
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/logout">
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
