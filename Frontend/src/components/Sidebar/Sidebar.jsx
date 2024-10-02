import React, { useState } from "react";
import "./Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="breadcrumb-container d-block d-lg-none p-3">
        <button className="btn btn-primary" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>
      </nav>

      <div className={`sidebar d-flex flex-column ${isOpen ? "open" : ""}`}>
        <div className="logo-section">
          <img
            src="./assets/images/logo.png"
            alt="Hospital Logo"
            className="logo img-fluid"
          />
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#dashboard" className="nav-link nav-link-1">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="#doctor-management" className="nav-link nav-link-2">
              Doctor Management
            </a>
          </li>
          <li className="nav-item">
            <a href="#patient-management" className="nav-link nav-link-3">
              Patient Management
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link nav-link-4 collapsed"
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
            <a href="#analytics" className="nav-link nav-link-5">
              Reporting and Analytics
            </a>
          </li>
        </ul>
        <div className="logout-section">
          <a href="#logout" className="nav-link nav-link-6">
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
