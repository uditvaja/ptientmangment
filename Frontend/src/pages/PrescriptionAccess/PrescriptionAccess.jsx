import React, { useEffect, useRef, useState } from "react";
import "./PrescriptionAccess.scss";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientSidebar from "../../components/PatientSidebar/PatientSidebar";
import { Card, Col, Dropdown, Form, Row, Button } from "react-bootstrap";

const PrescriptionCard = ({
  doctor,
  hospital,
  disease,
  date,
  time,
  imageName,
  imageSize,
}) => (
  <Card className="mb-3">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{doctor}</h5>
        <div className="d-flex align-items-center">
          <Button variant="link" className="p-0 me-2">
            <img src="./assets/images/download-icon.svg" alt="Download" />
          </Button>
          <Button variant="link" className="p-0">
            <img src="./assets/images/eye-gray.svg" alt="Print" />
          </Button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <strong>Hospital Name:</strong>
        <span>{hospital}</span>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <strong>Disease Name:</strong>
        <span>{disease}</span>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <strong>Date:</strong>
        <span>{date}</span>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <strong>Time:</strong>
        <span>{time}</span>
      </div>
      <div className="prescription-images-box mt-3">
        <img
          src="./assets/images/prescription-placeholder.png"
          alt="Prescription"
          className="img-fluid"
        />
        <div>
          <span>{imageName}</span>
          <small className="d-block">{imageSize}</small>
        </div>
      </div>
    </Card.Body>
  </Card>
);

const CustomDateRangeSelector = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="custom-date-selector">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          const [start, end] = update;
          setStartDate(start);
          setEndDate(end);
        }}
        isClearable={false}
        customInput={
          <Form.Control as="button" className="date-range-button">
            {startDate && endDate
              ? `${formatDate(startDate)} - ${formatDate(endDate)}`
              : "Select Date Range"}
          </Form.Control>
        }
      />
      {startDate && endDate && (
        <Button variant="link" className="reset-dates-btn" onClick={resetDates}>
          <img src="./assets/images/cross-icon.svg" alt="Reset" />
        </Button>
      )}
    </div>
  );
};

const PrescriptionAccess = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2022-01-02"));
  const [endDate, setEndDate] = useState(new Date("2022-01-13"));
  const sidebarRef = useRef(null);
  const location = useLocation();
  //   const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
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

  const prescriptions = [
    {
      doctor: "Dr. Ryan Vetrovs",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      imageName: "Prescription.JPG",
      imageSize: "370 x 218",
    },
    {
      doctor: "Marcus Septimus",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      imageName: "Prescription.JPG",
      imageSize: "370 x 218",
    },
    {
      doctor: "Ahmad Arcand",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      imageName: "Prescription.JPG",
      imageSize: "370 x 218",
    },
    {
      doctor: "Dr. Ryan Vetrovs",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      imageName: "Prescription.JPG",
      imageSize: "370 x 218",
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
              <div className="col-md-6 col-12 mobile-screen">
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
                    <li className="breadcrumb-item active" aria-current="page">
                      Prescription Access
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-6 col-12 d-lg-flex d-block justify-content-lg-end">
                <div className="d-lg-flex d-none search-container me-3 mt-lg-0 mt-3">
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
                      <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Doctor</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Patient</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-lg-none d-flex align-items-center justify-content-between">
                  <nav className="breadcrumb-container d-block d-lg-none p-0">
                    <button className="btn btn-primary" onClick={toggleSidebar}>
                      <i className="bi bi-text-left"></i>
                    </button>
                  </nav>
                  <div className="d-flex align-items-center justify-content-center">
                    <button className="btn" onClick={toggleSearch}>
                      <img
                        src="/assets/images/search.svg"
                        alt="search"
                        className="search-icon"
                      />
                    </button>
                    {isSearchVisible && (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quick Search"
                        style={{ display: isSearchVisible ? "block" : "none" }}
                      />
                    )}
                    <Dropdown className="notification-dropdown mx-3">
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
                          <div className="d-none text-start">
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
                      <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                      <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid prescription-access-page py-4">
          <div className="row mb-4 align-items-center">
            <Col>
              <h1 className="prescription-access-title">
                Prescription Access
              </h1>
            </Col>
            <Col xs="auto">
              <CustomDateRangeSelector
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </Col>
          </div>
          <Row>
            {prescriptions.map((prescription, index) => (
              <Col key={index} md={6} lg={3}>
                <PrescriptionCard {...prescription} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionAccess;
