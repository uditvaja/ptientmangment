import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import PatientsSummary from "../../components/PatientsSummary/PatientsSummary";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState("year");
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

  const yearData = [
    { name: "2001", patients: 28000 },
    { name: "2002", patients: 20000 },
    { name: "2003", patients: 30000 },
    { name: "2004", patients: 27000 },
    { name: "2005", patients: 18000 },
    { name: "2006", patients: 23000 },
    { name: "2007", patients: 34000 },
    { name: "2008", patients: 30000 },
    { name: "2009", patients: 25000 },
    { name: "2010", patients: 33000 },
  ];

  const monthData = [
    { name: "Jan", patients: 1000 },
    { name: "Feb", patients: 1200 },
    { name: "Mar", patients: 1100 },
    { name: "Apr", patients: 1300 },
    { name: "May", patients: 1400 },
    { name: "Jun", patients: 1200 },
    { name: "July", patients: 1500 },
    { name: "Aug", patients: 1800 },
    { name: "Sep", patients: 1700 },
    { name: "Oct", patients: 2000 },
    { name: "Nov", patients: 1900 },
    { name: "Dec", patients: 2200 },
  ];

  const weekData = [
    { name: "Mon", patients: 200 },
    { name: "Tue", patients: 250 },
    { name: "Wed", patients: 180 },
    { name: "Thu", patients: 220 },
    { name: "Fri", patients: 270 },
    { name: "Sat", patients: 150 },
    { name: "Sun", patients: 100 },
  ];

  const getChartData = () => {
    switch (timeFrame) {
      case "year":
        return yearData;
      case "month":
        return monthData;
      case "week":
        return weekData;
      default:
        return yearData;
    }
  };

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

  const noNotificationImage = "./assets/images/no-notification.png";

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
                <div className="col-md-6 col-12 mb-lg-0 mb-3">
                  <h3 className="user-name mb-0">Good Morning ! Martin</h3>
                  <p className="content">Hope you have a good day</p>
                </div>
                <div className="col-md-6 col-12 d-lg-flex d-block justify-content-lg-end">
                  <div className="search-container me-3">
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
          <div className="dashboard-main">
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-lg-7">
                  <div className="row">
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="stat-card stat-card-1">
                        <img
                          src="./assets/images/total-patients.png"
                          alt="total-patients"
                          className="img-fluid"
                        />
                        <div className="d-flex flex-column">
                          <h3 className="mb-0">Total Patients</h3>
                          <p className="stat-number">1500</p>
                        </div>
                        <span className="line-1"></span>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="stat-card stat-card-2">
                        <img
                          src="./assets/images/total-doctors.png"
                          alt="total-doctors"
                          className="img-fluid"
                        />
                        <div className="d-flex flex-column">
                          <h3 className="mb-0">Total Doctors</h3>
                          <p className="stat-number">500</p>
                        </div>
                        <span className="line-2"></span>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                      <div className="stat-card stat-card-3">
                        <img
                          src="./assets/images/todays-appo.png"
                          alt="todays-appo"
                          className="img-fluid"
                        />
                        <div className="d-flex flex-column">
                          <h3 className="mb-0">Today's Appointments</h3>
                          <p className="stat-number">1080</p>
                        </div>
                        <span className="line-3"></span>
                      </div>
                    </div>
                  </div>
                  <div className="card patients-card border-0">
                    <div className="card-body border-0">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <h5 className="billing-title">Patients Statistics</h5>
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            onClick={() => setTimeFrame("year")}
                            className={
                              timeFrame === "year"
                                ? "btn btn-primary"
                                : "btn btn-outline-primary"
                            }
                          >
                            Year
                          </button>
                          <button
                            type="button"
                            onClick={() => setTimeFrame("month")}
                            className={
                              timeFrame === "month"
                                ? "btn btn-primary"
                                : "btn btn-outline-primary"
                            }
                          >
                            Month
                          </button>
                          <button
                            type="button"
                            onClick={() => setTimeFrame("week")}
                            className={
                              timeFrame === "week"
                                ? "btn btn-primary"
                                : "btn btn-outline-primary"
                            }
                          >
                            Week
                          </button>
                        </div>
                      </div>

                      <div
                        className="chart-container"
                        style={{ height: "300px" }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={getChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="patients"
                              stroke="#8884d8"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 mt-lg-0 mt-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h3 className="billing-title">Billing & Payments</h3>
                    <button className="create-btn">
                      <img
                        src="./assets/images/add.svg"
                        alt="add"
                        className="img-fluid me-2"
                      />
                      Create Bills
                    </button>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span className="circle"></span>
                    <p className="pending-text">Pending Bills: 50</p>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead className="text-center">
                        <tr>
                          <th>Bill No</th>
                          <th>Patient Name</th>
                          <th>Disease Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {[
                          {
                            billNo: 5654,
                            patientName: "Charlie Vaccaro",
                            disease: "Colds and Flu",
                            status: "Paid",
                          },
                          {
                            billNo: 5655,
                            patientName: "James George",
                            disease: "Conjunctivitis",
                            status: "Unpaid",
                          },
                          {
                            billNo: 5656,
                            patientName: "Craig Torff",
                            disease: "Allergies",
                            status: "Paid",
                          },
                          {
                            billNo: 5657,
                            patientName: "Chance Lipshutz",
                            disease: "Diarrhea",
                            status: "Unpaid",
                          },
                          {
                            billNo: 5658,
                            patientName: "Gustavo Saris",
                            disease: "Headaches",
                            status: "Paid",
                          },
                          {
                            billNo: 5659,
                            patientName: "Carter Bator",
                            disease: "Mononucleosis",
                            status: "Unpaid",
                          },
                          {
                            billNo: 5660,
                            patientName: "Kadin Schleifer",
                            disease: "Stomach Aches",
                            status: "Paid",
                          },
                        ].map((row, index) => (
                          <tr key={index} className="border-b">
                            <td className="bill-no py-3">{row.billNo}</td>
                            <td className="patient-name py-3">
                              {row.patientName}
                            </td>
                            <td className="patient-name py-3">{row.disease}</td>
                            <td
                              className={`status-btn py-3 ${
                                row.status === "Paid"
                                  ? "paid-btn"
                                  : "unpaid-btn"
                              }`}
                            >
                              <span>{row.status}</span>
                            </td>
                            <td className="action-btn py-3">
                              <img
                                src="./assets/images/eye-blue.svg"
                                alt="eye-blue"
                                className="img-fluid"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row mt-lg-0 mt-4">
                <div className="col-lg-7 mb-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="billing-title">Today's Appointments List</h5>
                    <button className="view-btn" type="button">
                      View All
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="appo-card">
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="appo-title">Roger Lubin</h6>
                          <span className="onsite">Onsite</span>
                        </div>
                        <div className="appo-details">
                          <h5 className="appo-details-title">Doctor Name</h5>
                          <h6 className="appo-details-subtitle">Leo Geidt</h6>
                          <h5 className="appo-details-title mt-3">
                            Disease Name
                          </h5>
                          <h6 className="appo-details-subtitle">
                            Meningococcal Disease
                          </h6>
                          <h5 className="appo-details-title mt-3">
                            Appointment Time
                          </h5>
                          <h6 className="appo-details-subtitle">10:00 AM</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="appo-card">
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="appo-title">Jakob Korsgaard</h6>
                          <span className="online">Online</span>
                        </div>
                        <div className="appo-details">
                          <h5 className="appo-details-title">Doctor Name</h5>
                          <h6 className="appo-details-subtitle">Leo Geidt</h6>
                          <h5 className="appo-details-title mt-3">
                            Disease Name
                          </h5>
                          <h6 className="appo-details-subtitle">
                            Meningococcal Disease
                          </h6>
                          <h5 className="appo-details-title mt-3">
                            Appointment Time
                          </h5>
                          <h6 className="appo-details-subtitle">10:00 AM</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="appo-card">
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="appo-title">Roger Lubin</h6>
                          <span className="onsite">Onsite</span>
                        </div>
                        <div className="appo-details">
                          <h5 className="appo-details-title">Doctor Name</h5>
                          <h6 className="appo-details-subtitle">Leo Geidt</h6>
                          <h5 className="appo-details-title mt-3">
                            Disease Name
                          </h5>
                          <h6 className="appo-details-subtitle">
                            Meningococcal Disease
                          </h6>
                          <h5 className="appo-details-title mt-3">
                            Appointment Time
                          </h5>
                          <h6 className="appo-details-subtitle">10:00 AM</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 mb-4">
                  <PatientsSummary />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
