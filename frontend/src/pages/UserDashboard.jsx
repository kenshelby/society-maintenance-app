import React from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./UserDashboard.css";
import { Outlet } from "react-router-dom";


const UserDashboard = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  
  return (
    <div className="user-dashboard">
        <Sidebar />
        <div className="main-content">
            {/* Top Navbar */}
            <div className="top-navbar">
              {/* <h1>Dashboard</h1> */}
              <div className="profile-section">
              <div className="profile-pic"></div>
              <h3>{user.name}</h3>
            </div>
              <button onClick={handleLogout}>Logout</button>
            </div>

            {/* Profile Section */}
            {/* <div className="table-header">
              <h2>Flats</h2>
            </div>
                <table border="1" cellPadding="10">
                  <thead>
                    <tr>
                      <th>Flat No</th>
                      <th>Owner</th>
                      <th>Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flats.map(flat => (
                      <tr key={flat._id}>
                        <td>{flat.flatNumber}</td>
                        <td>{flat.owner?.name}</td>
                        <td>{flat.members?.length || 0}</td>
                      </tr>
                    ))}
                  </tbody>
              </table> */}

            {/* Render other pages here */}
            <Outlet />
        </div>
    </div>
        );
};

export default UserDashboard;
