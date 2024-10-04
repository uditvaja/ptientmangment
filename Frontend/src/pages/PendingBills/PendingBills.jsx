import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import "./PendingBills.scss";

const billsData = [
  {
    billNumber: "5654",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "pending",
  },
  {
    billNumber: "5655",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "complete",
  },
  {
    billNumber: "5656",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "pending",
  },
  {
    billNumber: "5657",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "complete",
  },
  {
    billNumber: "5658",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "pending",
  },
  {
    billNumber: "5659",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "complete",
  },
  {
    billNumber: "5660",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "pending",
  },
  {
    billNumber: "5661",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "complete",
  },
  {
    billNumber: "5662",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "pending",
  },
  {
    billNumber: "5663",
    billDate: "2 Jan, 2022",
    patientName: "Haylie Schleifer",
    phoneNumber: "85759 58421",
    status: "complete",
  },
];

const PendingBills = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
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

  const noNotificationImage = "/assets/images/no-notification.png";
  return (
    <>
      <div className="d-flex">
        <div className="w-15 w-md-0">
          <Sidebar
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
                            src="/assets/images/home-2.svg"
                            alt="Home"
                            className="breadcrumb-icon"
                          />
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item"
                        aria-current="page"
                      >
                        Billing And Payments
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Profile Setting
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
                      src="/assets/images/search.svg"
                      alt="search"
                      className="search-icon"
                    />
                    <Dropdown className="me-3">
                      <Dropdown.Toggle variant="link" id="dropdown-all">
                        All
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>All</Dropdown.Item>
                        <Dropdown.Item>Doctor</Dropdown.Item>
                        <Dropdown.Item>Patient</Dropdown.Item>
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
                          src="/assets/images/notification-bing.svg"
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
                                src={`/assets/images/${notification.icon}`}
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
                            src="/assets/images/profile.png"
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
                        <Dropdown.Item href="#/settings">
                          Settings
                        </Dropdown.Item>
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
                          src="/assets/images/notification-bing.svg"
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
                                src={`/assets/images/${notification.icon}`}
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
                            src="/assets/images/profile.png"
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
                        <Dropdown.Item href="#/settings">
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <nav className="breadcrumb-container d-block d-lg-none p-3">
                      <button
                        className="btn btn-primary"
                        onClick={toggleSidebar}
                      >
                        <i className="bi bi-list"></i>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid py-4">
            <div className="pending-bills-container">
              <div className="header">Pending Bills (50)</div>
              <div className="row">
                {billsData.map((bill, index) => (
                  <div
                    key={index}
                    className="mb-4 col-lg-3 col-md-4 col-sm-6 col-12"
                  >
                    <div className="bill-card">
                      <div className="bill-status">
                        <span className="bill-number">
                          Bill No:{" "}
                          <span className="bill-count">{bill.billNumber}</span>
                        </span>
                        <span
                          className={`status-icon ${
                            bill.status === "complete"
                              ? "status-complete"
                              : "status-pending"
                          }`}
                        >
                          {bill.status === "complete" ? (
                            <img
                              src="/assets/images/eye-blue-2.svg"
                              alt="Completed"
                              className="img-fluid"
                            />
                          ) : (
                            <img
                              src="/assets/images/eye-gray.svg"
                              alt="Pending"
                              className="img-fluid"
                            />
                          )}
                        </span>
                      </div>
                      <div className="bill-details">
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="bill-details-title">Bill Date:</p>
                          <p className="bill-details-con">{bill.billDate}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="bill-details-title">Patient Name:</p>
                          <p className="bill-details-con">{bill.patientName}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="bill-details-title">Phone Number:</p>
                          <p className="bill-details-con">{bill.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingBills;
