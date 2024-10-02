import React from 'react'
import "./css/App.scss"
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import Login from './pages/login/Login';
import Forgot_Password from './pages/ForgotPassword/Forgot_Password';
import Otp_screen from './pages/OtpScreen/Otp_screen';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/forgot-password" element={<Forgot_Password />} />
    <Route path="/otp-verification" element={<Otp_screen />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
    <Toaster position="top-right" />
  </BrowserRouter>
  )
}

export default App
