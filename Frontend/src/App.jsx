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

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
    <Route path="/" element={<Login />} />
    </Routes>
    <Toaster position="top-right" />
  </BrowserRouter>
  )
}

export default App
