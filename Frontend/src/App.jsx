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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/adminProfile" element={<AdminProfile />} />
        <Route path="/doctorProfile" element={<DoctorProfile />} />
        <Route path="/patientAppointment" element={<PatientAppointment />} />
        <Route path="/patientBookAppointment" element={<PatientBookAppointment />} />
        <Route path="/billing/monitor-billing" element={<PendingBills />} />
        {/* Admin Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/otp-verification" element={<Otp_screen />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Doctor Auth */}
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-forgot-password" element={<DoctorForgotPassword />} />
        <Route path="/doctor-otp-verification" element={<DoctorOtpScreen />} />
        <Route path="/doctor-reset-password" element={<DoctorResetPassword />} />
        {/* Patient Auth */}
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-forgot-password" element={<PatientForgotPassword />} />
        <Route path="/patient-otp-verification" element={<PatientOtpScreen />} />
        <Route path="/patient-reset-password" element={<PatientResetPassword />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
