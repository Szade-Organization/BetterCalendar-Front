import { Outlet } from "react-router-dom";
import "../../styles/Layout.css";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
