import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import API from '../utils/api';


export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [flats, setFlats] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const { data } = await API.get(`/flats?page=${page}&limit=10`);
        setFlats(data.flats);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFlats();
  }, [page]);

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
      </table>

        </div>
</div>
  );
}
