import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="d-flex">
        <div className="w-15">
          <Sidebar />
        </div>
        <div className="w-85">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
