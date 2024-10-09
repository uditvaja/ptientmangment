import React from "react";
import "./css/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Login from "./pages/login/Login";
import Forgot_Password from "./pages/ForgotPassword/Forgot_Password";
import Otp_screen from "./pages/OtpScreen/Otp_screen";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import DoctorLogin from "./pages/DoctorLogin/DoctorLogin";
import DoctorForgotPassword from "./pages/DoctorForgotPassword/DoctorForgotPassword";
import DoctorOtpScreen from "./pages/DoctorOtpScreen/DoctorOtpScreen";
import DoctorResetPassword from "./pages/DoctorResetPassword/DoctorResetPassword";
import PatientLogin from "./pages/PatientLogin/PatientLogin";
import PatientForgotPassword from "./pages/PatientForgotPassword/PatientForgotPassword";
import PatientOtpScreen from "./pages/PatientOtpScreen/PatientOtpScreen";
import PatientResetPassword from "./pages/PatientResetPassword/PatientResetPassword";
import PatientRegister from "./pages/PatientRegister/PatientRegister";
import PendingBills from "./pages/PendingBills/PendingBills";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import PatientAppointment from "./pages/PatientAppointment/PatientAppointment";
import PatientBookAppointment from "./pages/PatientBookAppointment/PatientBookAppointment";
import InvoicePage from "./components/InvoicePage/InvoicePage";
import AppointmentTimeSlot from "./pages/AppointmentTimeSlot/AppointmentTimeSlot";
import DoctorAppointment from "./pages/DoctorAppointment/DoctorAppointment";
import DoctorAppointmentTimeSlot from "./pages/DoctorAppointmentTimeSlot";
import PrescriptionAccess from "./pages/PrescriptionAccess/PrescriptionAccess";
import PatientRecordAccess from "./pages/PatientRecordAccess/PatientRecordAccess";
import PatientDetails from "./pages/PatientDetails/PatientDetails";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/otp-verification" element={<Otp_screen />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/adminProfile" element={<AdminProfile />} />
        {/* Doctor */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-forgot-password" element={<DoctorForgotPassword />} />
        <Route path="/doctor-otp-verification" element={<DoctorOtpScreen />} />
        <Route path="/doctor-reset-password" element={<DoctorResetPassword />} />
        <Route path="/doctorProfile" element={<DoctorProfile />} />
        <Route path="/doctorAppointmentManagement" element={<DoctorAppointment />} />
        <Route path="/doctorAppointmentTimeSlot" element={<DoctorAppointmentTimeSlot />} />
        <Route path="/patientRecordAccess" element={<PatientRecordAccess />} />
        <Route path="/patientDetails" element={<PatientDetails />} />
        {/* Patient */}
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-forgot-password" element={<PatientForgotPassword />} />
        <Route path="/patient-otp-verification" element={<PatientOtpScreen />} />
        <Route path="/patient-reset-password" element={<PatientResetPassword />} />
        <Route path="/patientAppointment" element={<PatientAppointment />} />
        <Route path="/patientBookAppointment" element={<PatientBookAppointment />} />
        <Route path="/billing/monitor-billing" element={<PendingBills />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/appointmentTimeSlot" element={<AppointmentTimeSlot />} />
        <Route path="/prescriptionAccess" element={<PrescriptionAccess />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
