import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./PatientManagement.scss";
import PatientDetailsModal from "../../../components/modals/PatientDetailsModal/PatientDetailsModal";

const PatientManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const [searchTerms, setSearchTerms] = useState({
    today: "",
    upcoming: "",
    previous: "",
    canceled: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  
  // State for upcoming appointments
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
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

  const fetchUpcomingAppointments = async () => {
    setLoading(true);
    setError(null);
    const adminId = localStorage.getItem("adminId"); // Use your actual adminId here
    try {
      const response = await axios.get(`http://localhost:9500/v1/dashboard-adminFlow/appointement-upcomming?adminId=${adminId}`);
      setUpcomingAppointments(response.data); // Adjust this based on your API response structure
    } catch (err) {
      setError("Failed to fetch upcoming appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (activeTab === "upcoming") {
      fetchUpcomingAppointments();
    }
  }, [activeTab]);

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const getFilteredAppointments = (appointments, searchTerm) => {
    return appointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patientIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderAppointmentTable = (appointments, searchTerm) => {
    const filteredAppointments = getFilteredAppointments(appointments, searchTerm);
    if (filteredAppointments.length === 0) {
      return (
        <div className="text-center py-5">
          <img
            src="/assets/images/no-today-appointment.png"
            alt="No appointments"
            className="mb-3 img-fluid"
          />
        </div>
      );
    }

    return (
      <div className="table-responsive">
        <table className="table today-patient_management-table table-hover">
          <thead>
            <tr>
              <th className="rounded-end-0">Patient Name</th>
              <th className="rounded-end-0 rounded-start-0">Patient Issue</th>
              <th className="rounded-end-0 rounded-start-0">Doctor Name</th>
              <th className="rounded-end-0 rounded-start-0">Disease Name</th>
              <th className="rounded-end-0 rounded-start-0">Appointment Time</th>
              <th className="rounded-end-0 rounded-start-0">Appointment Type</th>
              <th className="rounded-start-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={appointment.profilePicture}
                    alt={appointment.patientName}
                    className="me-3 img-fluid profile_img"
                  />
                  {appointment.patientName}
                </td>
                <td>{appointment.patientIssue}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.diseaseName}</td>
                <td>
                  <div className="patient_management-time">
                    {appointment.appointmentTime}
                  </div>
                </td>
                <td className="text-center patient_management-badge">
                  <span
                    className={`badge badge-${
                      appointment.appointmentType === "Online"
                        ? "warning"
                        : "primary"
                    }`}
                  >
                    {appointment.appointmentType}
                  </span>
                </td>
                <td>
                  <button
                    className="bg-transparent"
                    onClick={() => handleViewPatient(appointment)}
                  >
                    <img
                      src="/assets/images/view-icon-box.svg"
                      alt="view-icon-box"
                      className="img-fluid"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
            {/* ... header content ... */}
          </div>
        </div>
        <div className="container-fluid patient_management_page py-4">
          <Tabs
            defaultActiveKey="today"
            activeKey={activeTab}
            onSelect={(tabKey) => setActiveTab(tabKey)}
            className="mb-3"
          >
            <Tab eventKey="today" title="Today Appointment">
              {/* ... today's appointments content ... */}
            </Tab>
            <Tab eventKey="upcoming" title="Upcoming Appointment">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="patient_management-title">Upcoming Appointment</h2>
                <div className="patient_management-search-container">
                  <input
                    type="text"
                    placeholder="Search Patient"
                    value={searchTerms.upcoming}
                    onChange={(e) => handleSearchChange(e, "upcoming")}
                    className="form-control"
                  />
                  <img
                    src="/assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                </div>
              </div>
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : (
                renderAppointmentTable(upcomingAppointments, searchTerms.upcoming)
              )}
            </Tab>
            <Tab eventKey="previous" title="Previous Appointment">
              {/* ... previous appointments content ... */}
            </Tab>
            <Tab eventKey="canceled" title="Cancel Appointment">
              {/* ... canceled appointments content ... */}
            </Tab>
          </Tabs>
        </div>
      </div>
      <PatientDetailsModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        patient={selectedPatient}
      />
    </div>
  );
};

export default PatientManagement;
