import React, { useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
       {/* Navbar */}
        <div className="navbar">
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </div>
          <h1>Admin Dashboard</h1>
        </div>

        {/* Sidebar */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <h2>Menu</h2>
          <p className="sidebar-item">Dashboard</p>
          <p className="sidebar-item">Users</p>
          <p className="sidebar-item">Settings</p>
          <p className="sidebar-item logout" onClick={handleLogout}>Logout</p>
          <p className="sidebar-item close" onClick={() => setIsOpen(false)}>Close</p>
        </div>

  {/* Main content area */}
  <div className="main-content">
    {/* Your actual dashboard content goes here */}
  </div>
</div>
  );
}
