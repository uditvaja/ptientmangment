import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, sidebarRef, activeLink }) => {
  return (
    <>
      <div
        ref={sidebarRef}
        className={`sidebar d-flex flex-column ${isOpen ? "open" : "closed"}`}
      >
        <div className="logo-section">
          <img
            src="./assets/images/logo.png"
            alt="Hospital Logo"
            className="logo img-fluid"
          />
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={"/"}  className={`nav-link nav-links-1 ${activeLink === '/' || activeLink === '/dashboard' ? 'active' : ''}`}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/doctor-management"} className={`nav-link nav-links-2 ${activeLink === '/doctor-management' ? 'active' : ''}`}>
              Doctor Management
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/patient-management"} className={`nav-link nav-links-3 ${activeLink === '/patient-management' ? 'active' : ''}`}>
              Patient Management
            </Link>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link nav-links-4 collapsed ${activeLink === '/billing' ? 'active' : ''}`}
              href="#billing"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              Billing and Payments
            </a>
            <ul id="billing" className="collapse">
              <li>
                <a href="#monitor-billing">Monitor Billing</a>
              </li>
              <li>
                <a href="#insurance-claims">Insurance Claims</a>
              </li>
              <li>
                <a href="#payment-process">Payment Process</a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to={"/analytics"} className={`nav-link nav-links-5 ${activeLink === '/analytics' ? 'active' : ''}`}>
              Reporting and Analytics
            </Link>
          </li>
        </ul>
        <div className="logout-section">
          <a href="#logout" className="nav-link nav-links-6">
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
