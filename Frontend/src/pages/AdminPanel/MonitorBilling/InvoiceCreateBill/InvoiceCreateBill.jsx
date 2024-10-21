import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "./InvoiceCreateBill.scss";
import { Minus } from "lucide-react";

const InvoiceCreateBill = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [hospitalDetails, setHospitalDetails] = useState([
    {
      name: "",
      otherText: "",
      email: "",
      billDate: "",
      billTime: "",
      billNumber: "",
      phoneNumber: "",
      address: "",
    },
  ]);
  const [patientDetails, setPatientDetails] = useState([
    {
      name: "",
      diseaseName: "",
      doctorName: "",
      description: "",
      discount: "",
      tax: "",
      amount: "",
      totalAmount: "",
      paymentType: "",
      age: "",
      gender: "",
      address: "",
    },
  ]);

  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
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

  // Handle file upload
  const handleFileUpload = (event) => setFile(event.target.files[0]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  // Handle dynamic hospital details change
  const handleHospitalDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHospitalDetails = [...hospitalDetails];
    updatedHospitalDetails[index][name] = value;
    setHospitalDetails(updatedHospitalDetails);
  };

  // Add new hospital detail row
  const addHospitalDetail = () => {
    setHospitalDetails([
      ...hospitalDetails,
      {
        name: "",
        otherText: "",
        email: "",
        billDate: "",
        billTime: "",
        billNumber: "",
        phoneNumber: "",
        address: "",
      },
    ]);
  };

  // Remove hospital detail row
  const removeHospitalDetail = (index) => {
    const updatedHospitalDetails = [...hospitalDetails];
    updatedHospitalDetails.splice(index, 1);
    setHospitalDetails(updatedHospitalDetails);
  };

  // Handle dynamic patient detail change
  const handlePatientDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPatientDetails = [...patientDetails];
    updatedPatientDetails[index][name] = value;
    setPatientDetails(updatedPatientDetails);
  };

  // Add new patient detail row
  const addPatientDetail = () => {
    setPatientDetails([
      ...patientDetails,
      {
        name: "",
        diseaseName: "",
        doctorName: "",
        description: "",
        discount: "",
        tax: "",
        amount: "",
        totalAmount: "",
        paymentType: "",
        age: "",
        gender: "",
        address: "",
      },
    ]);
  };

  // Remove patient detail row
  const removePatientDetail = (index) => {
    const updatedPatientDetails = [...patientDetails];
    updatedPatientDetails.splice(index, 1);
    setPatientDetails(updatedPatientDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Now you have `hospitalDetails` and `patientDetails` states with all the form data.
    console.log("Hospital Details:", hospitalDetails);
    console.log("Patient Details:", patientDetails);
  };

  return (
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
                    <li className="breadcrumb-item" aria-current="page">
                      Billing And Payments
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Monitor Billing
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
        <div className="container-fluid invoice-create-bill-page py-4">
          <h1 className="invoice-create-bill-title mb-0">Create Bill</h1>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                Hospital Details
                <button
                  type="button"
                  className="change_design-btn"
                  onClick={addHospitalDetail}
                >
                  <img
                    src="/assets/images/add.svg"
                    alt="add"
                    className="img-fluid me-md-3 me-0"
                  />
                  <span className="d-md-inline-flex d-none">Add New Field</span>
                </button>
              </h5>
              {hospitalDetails.map((hospitalDetail, index) => (
                <div key={index} className="row">
                  <div className="col-md-3">
                    <div
                      className="upload-area"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {file ? (
                        <div>
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Uploaded file"
                            className="img-fluid"
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => setFile(null)}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <i className="bi bi-cloud-upload"></i>
                          <p>Upload a file or drag and drop</p>
                          <small>PNG, JPG, GIF up to 10MB</small>
                          <input
                            type="file"
                            className="form-control"
                            onChange={handleFileUpload}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      {Object.entries(hospitalDetail).map(([key, value]) => (
                        <div
                          key={key}
                          className="col-lg-4 col-md-6 col-12 mb-3"
                        >
                          <div className="form-floating position-relative">
                            <input
                              type={
                                key.includes("Date")
                                  ? "date"
                                  : key.includes("Time")
                                  ? "time"
                                  : "text"
                              }
                              className="form-control"
                              placeholder={`Enter ${key}`}
                              name={key}
                              value={value}
                              onChange={(e) =>
                                handleHospitalDetailChange(index, e)
                              }
                            />
                            <label>
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </label>
                            <button
                              type="button"
                              className="minus-btn"
                              onClick={() => removeHospitalDetail(index)}
                            >
                              <Minus size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                Patient Details
                <button
                  type="button"
                  className="change_design-btn"
                  onClick={addPatientDetail}
                >
                  <img
                    src="/assets/images/add.svg"
                    alt="add"
                    className="img-fluid me-md-3 me-0"
                  />
                  <span className="d-md-inline-flex d-none">Add New Field</span>
                </button>
              </h5>
              {patientDetails.map((patientDetail, index) => (
                <div key={index} className="row">
                  {Object.entries(patientDetail).map(([key, value]) => (
                    <div key={key} className="col-lg-3 col-md-6 col-12 mb-3">
                      <div className="form-floating position-relative">
                        <input
                          type={
                            key.includes("Amount") ||
                            key.includes("Age") ||
                            key.includes("Tax")
                              ? "number"
                              : "text"
                          }
                          className="form-control"
                          placeholder={`Enter ${key}`}
                          name={key}
                          value={value}
                          onChange={(e) => handlePatientDetailChange(index, e)}
                        />
                        <label>
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                        <button
                          type="button"
                          className="minus-btn"
                          onClick={() => removePatientDetail(index)}
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreateBill;
