import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./AdminProfile.scss";

const AdminProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };
  return (
    <>
      <header className="profile-header">
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
                    Profile Setting
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 col-12 d-lg-flex d-block justify-content-lg-end justify-content-center">
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
                    <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-lg-flex d-none align-items-center">
                <img
                  src="./assets/images/notification-bing.svg"
                  alt="search"
                  className="notification-icon me-3"
                />
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
              <div className="d-lg-none d-flex align-items-center">
                <img
                  src="./assets/images/notification-bing.svg"
                  alt="search"
                  className="notification-icon me-3"
                />
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
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid profile-page py-4">
        <h1 className="page-title">Profile Setting</h1>
        <div className="row">
          <div className="col-lg-12 col-md-4 mt-4">
            <div className="admin-spacing">
              <div className="card">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="text-center">
                      <img
                        src="./assets/images/profile-2.png"
                        alt="Profile"
                        className="rounded-circle img-fluid mb-3 profile-img"
                      />
                      <h5 className="profile-username">Lincoln Philips</h5>
                    </div>
                    <h5 className="menu-title">Menu</h5>
                    <ul className="list-unstyled menu">
                      <li className="mt-4">
                        <a
                          href="#profile"
                          className={
                            activeSection === "profile"
                              ? "active nav-link-1"
                              : "nav-link-1"
                          }
                          onClick={() => toggleSection("profile")}
                          aria-expanded={activeSection === "profile"}
                        >
                          Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="#change-password"
                          className={
                            activeSection === "change-password"
                              ? "active nav-link-2"
                              : "nav-link-2"
                          }
                          onClick={() => toggleSection("change-password")}
                          aria-expanded={activeSection === "change-password"}
                        >
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a
                          href="#terms"
                          className={
                            activeSection === "terms"
                              ? "active nav-link-3"
                              : "nav-link-3"
                          }
                          onClick={() => toggleSection("terms")}
                          aria-expanded={activeSection === "terms"}
                        >
                          Terms & Conditions
                        </a>
                      </li>
                      <li>
                        <a
                          href="#privacy"
                          className={
                            activeSection === "privacy"
                              ? "active nav-link-4"
                              : "nav-link-4"
                          }
                          onClick={() => toggleSection("privacy")}
                          aria-expanded={activeSection === "privacy"}
                        >
                          Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-9 col-md-6 col-12">
                    {/* Profile Section */}
                    <div
                      className={`collapse ${
                        activeSection === "profile" ? "show" : ""
                      }`}
                      id="profile"
                    >
                      <div className="p-lg-4 p-0">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h4 className="admin-title">Profile</h4>
                          <button className="edit-btn">
                            <img
                              src="./assets/images/edit.svg"
                              alt="edit"
                              className="img-fluid me-2"
                            />
                            Edit Profile
                          </button>
                        </div>
                        <form>
                          <div className="row">
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="FirstName"
                                  className={"form-control"}
                                  id="FirstName"
                                  placeholder="Lincoln"
                                />
                                <label htmlFor="FirstName">First Name</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="LastName"
                                  className={"form-control"}
                                  id="LastName"
                                  placeholder="Philips"
                                />
                                <label htmlFor="LastName">Last Name</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="PhoneNumber"
                                  className={"form-control"}
                                  id="PhoneNumber"
                                  placeholder="99130 53222"
                                />
                                <label htmlFor="PhoneNumber">
                                  Phone Number
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="HospitalName"
                                  className={"form-control"}
                                  id="HospitalName"
                                  placeholder="Silver Park Medical Center"
                                />
                                <label htmlFor="HospitalName">
                                  Hospital Name
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="Gender"
                                  className={"form-control"}
                                  id="Gender"
                                  placeholder="Male"
                                />
                                <label htmlFor="Gender">Gender</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  name="EmailAddress"
                                  className={"form-control"}
                                  id="EmailAddress"
                                  placeholder="lincoln@gmail.com"
                                />
                                <label htmlFor="EmailAddress">
                                  Email Address
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="City"
                                  className={"form-control"}
                                  id="City"
                                  placeholder="Ahmedabad"
                                />
                                <label htmlFor="City">City</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="State"
                                  className={"form-control"}
                                  id="State"
                                  placeholder="Gujarat"
                                />
                                <label htmlFor="State">State</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="Country"
                                  className={"form-control"}
                                  id="Country"
                                  placeholder="India"
                                />
                                <label htmlFor="Country">Country</label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Change Password Section */}
                    <div
                      className={`collapse ${
                        activeSection === "change-password" ? "show" : ""
                      }`}
                      id="change-password"
                    >
                      <div className="change-password-sec">
                        <h4 className="admin-title">Change Password</h4>
                        <p className="admin-content mb-4">
                          To change your password, please fill in the fields
                          below. Your password must contain at least 8
                          characters, it must also include at least one upper
                          case letter, one lower case letter, one number and one
                          special character.
                        </p>
                        <form>
                          <div className="form-floating mb-3 position-relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="CurrentPassword"
                              className={"form-control"}
                              id="CurrentPassword"
                              placeholder="Enter Current Password"
                            />
                            <button
                              type="button"
                              className="eye-btn"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <img
                                  src="./assets/images/eye-slash.svg"
                                  alt="eye-slash"
                                  className="img-fluid"
                                />
                              ) : (
                                <img
                                  src="./assets/images/eye.svg"
                                  alt="eye"
                                  className="img-fluid"
                                />
                              )}
                            </button>
                            <label
                              htmlFor="CurrentPassword"
                              className="floating-label"
                            >
                              Current Password
                            </label>
                          </div>
                          <div className="form-floating mb-3 position-relative">
                            <input
                              type={showPassword2 ? "text" : "password"}
                              name="newpassword"
                              className={"form-control"}
                              id="newpassword"
                              placeholder="Enter New Password"
                            />
                            <button
                              type="button"
                              className="eye-btn"
                              onClick={togglePasswordVisibility2}
                            >
                              {showPassword2 ? (
                                <img
                                  src="./assets/images/eye-slash.svg"
                                  alt="eye-slash"
                                  className="img-fluid"
                                />
                              ) : (
                                <img
                                  src="./assets/images/eye.svg"
                                  alt="eye"
                                  className="img-fluid"
                                />
                              )}
                            </button>
                            <label
                              htmlFor="newpassword"
                              className="floating-label"
                            >
                              New Password
                            </label>
                          </div>
                          <div className="form-floating mb-3 position-relative">
                            <input
                              type={showPassword3 ? "text" : "password"}
                              name="ConfirmPassword"
                              className={"form-control"}
                              id="ConfirmPassword"
                              placeholder="Enter Confirm Password"
                            />
                            <button
                              type="button"
                              className="eye-btn"
                              onClick={togglePasswordVisibility3}
                            >
                              {showPassword3 ? (
                                <img
                                  src="./assets/images/eye-slash.svg"
                                  alt="eye-slash"
                                  className="img-fluid"
                                />
                              ) : (
                                <img
                                  src="./assets/images/eye.svg"
                                  alt="eye"
                                  className="img-fluid"
                                />
                              )}
                            </button>
                            <label
                              htmlFor="ConfirmPassword"
                              className="floating-label"
                            >
                              Confirm Password
                            </label>
                          </div>
                          <button type="submit" className="submit-btn">
                            Change Password
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Terms & Conditions Section */}
                    <div
                      className={`collapse ${
                        activeSection === "terms" ? "show" : ""
                      }`}
                      id="terms"
                    >
                      <div className="p-lg-4 p-0">
                        <h4 className="admin-title">Terms & Conditions</h4>
                        <div className="card mt-4">
                          <p className="admin-content mt-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Fusce quis ante ornare, venenatis tortor sed,
                            fringilla ante. Morbi nec semper justo. Cras eget
                            rhoncus urna, eu fringilla nibh. Class aptent taciti
                            sociosqu ad litora torquent per conubia nostra, per
                            inceptos himenaeos. Nam pretium eleifend neque, vel
                            blandit erat iaculis id. Etiam ut lectus vitae metus
                            convallis condimentum quis cursus mi. Aenean non
                            varius enim. Pellentesque sit amet interdum sapien.
                            Fusce ac augue erat. Suspendisse sodales est et
                            laoreet fringilla. Duis justo mauris, semper et
                            justo eu, mollis porttitor eros.
                          </p>
                          <p className="admin-content">
                            Dolor sit amet, consectetur adipiscing elit. Fusce
                            quis ante ornare, venenatis tortor sed, fringilla
                            ante. Morbi nec semper justo. Cras eget rhoncus
                            urna, eu fringilla nibh. Class aptent taciti
                            sociosqu ad litora torquent per conubia nostra, per
                            inceptos himenaeos. Nam pretium eleifend neque, vel
                            blandit erat iaculis id. Etiam ut lectus vitae metus
                            convallis condimentum quis cursus mi. Aenean non
                            varius enim. Pellentesque sit amet interdum sapien.
                            Fusce ac augue erat. Suspendisse sodales est et
                            laoreet fringilla. Duis justo mauris, semper et
                            justo eu, mollis porttitor eros.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel blandit erat iaculis
                            id. Etiam ut lectus vitae metus convallis
                            condimentum quis cursus mi. Aenean non varius enim.
                            Pellentesque sit amet interdum sapien. Fusce ac
                            augue erat. Suspendisse sodales est et laoreet
                            fringilla. Duis justo mauris, semper et justo eu,
                            mollis porttitor eros.rat. Suspendisse sodales est
                            et laoreet fringilla. Duis justo mauris, semper et
                            justo eu, mollis porttitor eros.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel blandit erat iaculis
                            id. Etiam ut lectus vitae metus convallis
                            condimentum quis cursus mi. Aenean non varius enim.
                            Pellentesque sit amet interdum sapien. Fusce ac
                            augue erat. Suspendisse sodales est et laoreet
                            fringilla. Duis justo mauris, semper et justo eu,
                            mollis porttitor eros.rat. Suspendisse sodales est
                            et laoreet fringilla. Duis justo mauris, semper et
                            justo eu, mollis porttitor eros.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel blandit erat iaculis
                            id. Etiam ut lectus vitae metus convallis
                            condimentum quis cursus mi. Aenean non varius enim.
                            Pellentesque sit amet.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel blandit erat iaculis
                            id. Etiam ut lectus vitae metus convallis
                            condimentum quis cursus mi. Aenean non varius enim.
                            Pellentesque sit amet.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel.
                          </p>
                        </div>
                        {/* Your Terms & Conditions Content */}
                      </div>
                    </div>

                    {/* Privacy Policy Section */}
                    <div
                      className={`collapse ${
                        activeSection === "privacy" ? "show" : ""
                      }`}
                      id="privacy"
                    >
                      <div className="p-lg-4 p-0">
                        <h4 className="admin-title">Privacy Policy</h4>
                        <div className="card mt-4">
                          <p className="admin-content mt-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Fusce quis ante ornare, venenatis tortor sed,
                            fringilla ante. Morbi nec semper justo. Cras eget
                            rhoncus urna, eu fringilla nibh. Class aptent taciti
                            sociosqu ad litora torquent per conubia nostra, per
                            inceptos himenaeos. Nam pretium eleifend neque, vel
                            blandit erat iaculis id. Etiam ut lectus vitae metus
                            convallis condimentum quis cursus mi. Aenean non
                            varius enim. Pellentesque sit amet interdum sapien.
                            Fusce ac augue erat. Suspendisse sodales est et
                            laoreet fringilla. Duis justo mauris, semper et
                            justo eu, mollis porttitor eros.
                          </p>
                          <p className="admin-content">
                            Dolor sit amet, consectetur adipiscing elit. Fusce
                            quis ante ornare, venenatis tortor sed, fringilla
                            ante. Morbi nec semper justo. Cras eget rhoncus
                            urna, eu fringilla nibh. Class aptent taciti
                            sociosqu ad litora torquent per conubia nostra, per
                            inceptos himenaeos. Nam pretium eleifend neque, vel
                            blandit erat iaculis id. Etiam ut lectus vitae metus
                            convallis condimentum quis cursus mi. Aenean non
                            varius enim. Pellentesque sit amet interdum sapien.
                            Fusce ac augue erat. Suspendisse sodales est et
                            laoreet fringilla. Duis justo mauris, semper et
                            justo eu, mollis porttitor eros.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel blandit erat iaculis
                            id. Etiam ut lectus vitae metus convallis
                            condimentum quis cursus mi. Aenean non varius enim.
                            Pellentesque sit amet interdum sapien. Fusce ac
                            augue erat. Suspendisse sodales est et laoreet
                            fringilla. Duis justo mauris, semper et justo eu,
                            mollis porttitor eros.rat. Suspendisse sodales est
                            et laoreet fringilla. Duis justo mauris, semper et
                            justo eu, mollis porttitor eros.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel blandit erat iaculis
                            id. Etiam ut lectus vitae metus convallis
                            condimentum quis cursus mi. Aenean non varius enim.
                            Pellentesque sit amet interdum sapien. Fusce ac
                            augue erat. Suspendisse sodales est et laoreet
                            fringilla. Duis justo mauris, semper et justo eu,
                            mollis porttitor eros.rat. Suspendisse sodales est
                            et laoreet fringilla. Duis justo mauris, semper et
                            justo eu, mollis porttitor eros.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel blandit erat iaculis
                            id. Etiam ut lectus vitae metus convallis
                            condimentum quis cursus mi. Aenean non varius enim.
                            Pellentesque sit amet.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel blandit erat iaculis
                            id. Etiam ut lectus vitae metus convallis
                            condimentum quis cursus mi. Aenean non varius enim.
                            Pellentesque sit amet.
                          </p>
                          <p className="admin-content">
                            Consectetur adipiscing elit. Fusce quis ante ornare,
                            venenatis tortor sed, fringilla ante. Morbi nec
                            semper justo. Cras eget rhoncus urna, eu fringilla
                            nibh. Class aptent taciti sociosqu ad litora
                            torquent per conubia nostra, per inceptos himenaeos.
                            Nam pretium eleifend neque, vel.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
