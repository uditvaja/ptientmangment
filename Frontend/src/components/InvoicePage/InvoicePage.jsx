import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./InvoicePage.scss";
import PatientSidebar from "../PatientSidebar/PatientSidebar";

const InvoicePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const notifications = [
    {
      id: 1,
      title: "Change Invoice Theme",
      description: "Lincoln Philips changed the Invoice Theme.",
      time: "5 min ago",
      icon: "theme-icon.svg",
    },
    {
      id: 2,
      title: "Dr.Bharat",
      description: "Created a bill by Dr. Bharat.",
      time: "5 min ago",
      icon: "theme-icon.svg",
    },
    {
      id: 3,
      title: "Payment Received",
      description: "24,668 is the payment done of Miracle Canter.",
      time: "1:52PM",
      icon: "payment-received-icon.svg",
    },
    {
      id: 4,
      title: "Payment Cancelled",
      description: "24,668 is the payment cancelled of Miracle Canter.",
      time: "1:52PM",
      icon: "payment-cancelled-icon.svg",
    },
  ];
  return (
    <div className="d-flex">
      <div className="w-15 w-md-0">
        <PatientSidebar
          isOpen={isSidebarOpen}
          sidebarRef={sidebarRef}
          activeLink={location.pathname}
        />
      </div>
      <div className="w-85 w-md-100">
        <div className="profile-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6 col-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <img
                          src="./assets/images/home-2.svg"
                          alt="Home"
                          className="breadcrumb-icon"
                        />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Appointment Booking
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-6 col-12 d-lg-flex d-block justify-content-lg-end">
                <div className="search-container me-3 mt-lg-0 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quick Search"
                  />
                  <img
                    src="./assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                  <Dropdown className="me-3">
                    <Dropdown.Toggle variant="link" id="dropdown-all">
                      All
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Doctor</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Patient</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-lg-flex d-none align-items-center">
                  <Dropdown className="notification-dropdown">
                    <Dropdown.Toggle
                      variant="link"
                      className="notification-toggle"
                    >
                      <img
                        src="./assets/images/notification-bing.svg"
                        alt="Notification Icon"
                        className="img-fluid"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="notification-menu">
                      <div className="notification-header d-flex justify-content-between align-items-center">
                        <span>Notification</span>
                        <button className="close-btn">&times;</button>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="notification-item d-flex align-items-start"
                          >
                            <img
                              src={`./assets/images/${notification.icon}`}
                              alt={notification.title}
                              className="notification-icon"
                            />
                            <div className="notification-content">
                              <h5>{notification.title}</h5>
                              <p>{notification.description}</p>
                            </div>
                            <span className="notification-time">
                              {notification.time}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="no-notifications text-center">
                          <img
                            src={noNotificationImage}
                            alt="No Notifications"
                            className="no-notifications-img"
                          />
                        </div>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-user">
                      <div className="d-flex align-items-center">
                        <img
                          src="./assets/images/profile.png"
                          alt="Lincoln Philips"
                          className="profile-pic img-fluid"
                        />
                        <div className="d-block text-start">
                          <h3 className="user-name mb-0">Lincoln Philips</h3>
                          <span className="user-role">Admin</span>
                        </div>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                      <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-lg-none d-flex align-items-center justify-content-center">
                  <Dropdown className="notification-dropdown">
                    <Dropdown.Toggle
                      variant="link"
                      className="notification-toggle"
                    >
                      <img
                        src="./assets/images/notification-bing.svg"
                        alt="Notification Icon"
                        className="img-fluid"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="notification-menu">
                      <div className="notification-header d-flex justify-content-between align-items-center">
                        <span>Notification</span>
                        <button className="close-btn">&times;</button>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="notification-item d-flex align-items-start"
                          >
                            <img
                              src={`./assets/images/${notification.icon}`}
                              alt={notification.title}
                              className="notification-icon"
                            />
                            <div className="notification-content">
                              <h5>{notification.title}</h5>
                              <p>{notification.description}</p>
                            </div>
                            <span className="notification-time">
                              {notification.time}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="no-notifications text-center">
                          <img
                            src={noNotificationImage}
                            alt="No Notifications"
                            className="no-notifications-img"
                          />
                        </div>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-user">
                      <div className="d-flex align-items-center">
                        <img
                          src="./assets/images/profile.png"
                          alt="Lincoln Philips"
                          className="profile-pic img-fluid"
                        />
                        <div className="d-block text-start">
                          <h3 className="user-name mb-0">Lincoln Philips</h3>
                          <span className="user-role">Admin</span>
                        </div>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                      <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <nav className="breadcrumb-container d-block d-lg-none p-3">
                    <button className="btn btn-primary" onClick={toggleSidebar}>
                      <i className="bi bi-list"></i>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid invoice-page py-4">
          <div className="invoice-container">
            <div className="invoice-header">
              <div className="logo">
                <i className="bi bi-plus-circle"></i> Hospital
              </div>
              <h2 className="invoice-title">Invoice</h2>
            </div>

            <div className="doctor-info">
              <h3>Dr. Bharat Patel</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                mattis turpis nisl, viverra scelerisque porta eu.
              </p>
            </div>

            <div className="invoice-details">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Name:</strong> Miracle Kenter
                  </p>
                  <p>
                    <strong>Gender:</strong> Male
                  </p>
                  <p>
                    <strong>Age:</strong> 36 Years
                  </p>
                  <p>
                    <strong>Address:</strong> B-105 Vimal Bungalows Purnaam
                    Mogavira, Jamalpur
                  </p>
                </div>
                <div className="col-md-6 text-end">
                  <p>
                    <strong>Bill No:</strong> 1234
                  </p>
                  <p>
                    <strong>Bill Date:</strong> 20 June, 2020
                  </p>
                  <p>
                    <strong>Bill Time:</strong> 10:45 PM
                  </p>
                  <p>
                    <strong>Disease Name:</strong> Jasuam Saris
                  </p>
                  <p>
                    <strong>Phone Number:</strong> 9757766557
                  </p>
                  <p>
                    <strong>Payment Type:</strong> Insurance
                  </p>
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Qty.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Neuromuscular blockers</td>
                  <td>₹ 13,000.00</td>
                  <td>2</td>
                  <td>₹ 26,000.00</td>
                </tr>
                <tr>
                  <td>Neuromuscular blockers</td>
                  <td>₹ 800.00</td>
                  <td>2</td>
                  <td>₹ 1,600.00</td>
                </tr>
                <tr>
                  <td>Levocarvin with high dose methoxarate (HDMTX)</td>
                  <td>₹ 1000.00</td>
                  <td>2</td>
                  <td>₹ 2000.00</td>
                </tr>
                <tr>
                  <td>Hydroxyurea for sickle cell disease</td>
                  <td>₹ 20.00</td>
                  <td>2</td>
                  <td>₹ 40.00</td>
                </tr>
              </tbody>
            </table>

            <div className="insurance-details">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Insurance Company:</strong> HDFC life Insurance
                  </p>
                  <p>
                    <strong>Insurance Plan:</strong> Health Insurance
                  </p>
                  <p>
                    <strong>Claim Amount:</strong> ₹ 2,000.00
                  </p>
                  <p>
                    <strong>Claimed Amount:</strong> ₹ 2,500.00
                  </p>
                </div>
                <div className="col-md-6 text-end">
                  <p>
                    <strong>Amount:</strong> ₹ 25,840.00
                  </p>
                  <p>
                    <strong>Discount 5%:</strong> ₹ 1,292.00
                  </p>
                  <p>
                    <strong>Tax:</strong> ₹ 120.00
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹ 24,668.00
                  </p>
                </div>
              </div>
            </div>

            <div className="invoice-footer">
              <div className="contact-info">
                <p>Call: +91604 22394</p>
                <p>Email: Hello@Gmail.com</p>
              </div>
              <button className="btn btn-primary btn-lg">Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
