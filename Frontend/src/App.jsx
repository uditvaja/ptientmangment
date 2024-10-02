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
import Layout from "./components/Layout/Layout";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AdminProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot_Password />} />
        <Route path="/otp-verification" element={<Otp_screen />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
