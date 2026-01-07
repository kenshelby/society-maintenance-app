import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="user-sidebar">
      <h2>Menu</h2>
        <p className="sidebar-link" onClick={() => navigate("profile")}>Profile</p>
        <p className="sidebar-link" onClick={() => navigate("Friends")}>Friends</p>
        <p className="sidebar-link" onClick={() => navigate("Flats")}>Flats</p>
        <p className="sidebar-link" onClick={() => navigate("Messages")}>Messages</p>
        <p className="sidebar-link" onClick={() => navigate("Complaints")}>Complaints</p>
        <p className="sidebar-link" onClick={() => navigate("Maintenance")}>Maintenance</p>
        <p className="sidebar-link" onClick={() => navigate("Polls")}>Polls</p>
        <p className="sidebar-link" onClick={() => navigate("Guards")}>Guards</p>
        <p className="sidebar-link" onClick={() => navigate("Notifications")}>Notifications</p>
        <p className="sidebar-link" onClick={handleLogout}>Logout</p>
    </div>
  );
};

export default Sidebar;
