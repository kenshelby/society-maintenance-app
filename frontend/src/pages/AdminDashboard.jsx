import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { useNavigate, Outlet } from "react-router-dom";
import API from '../utils/api';
import UsersTable from '../components/UsersTable.jsx'


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
          <p className="sidebar-item" onClick={() => navigate("../src/components/UsersTable")}>Users</p>
          <p className="sidebar-item">Settings</p>
          <p className="sidebar-item logout" onClick={handleLogout}>Logout</p>
          <p className="sidebar-item close" onClick={() => setIsOpen(false)}>Close</p>
        </div>

  {/* Main content area */}
        <div className="main-content">
          {/* actual dashboard content goes here */}
          <div className="table-header">
            <h2>Flats</h2>
            <button className="add-flat-btn" onClick={() => navigate("/admin/add-flat")}>
              + Add Flat
            </button>
          </div>
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Flat No</th>
                  <th>Owner</th>
                  <th>Members</th>
                  <th>phone</th>
                </tr>
              </thead>
              <tbody>
                {flats.map(flat => (
                  <tr key={flat._id}>
                    <td>{flat.flatNumber}</td>
                    <td>{flat.owner?.name}</td>
                    <td>{flat.members?.length || 0}</td>
                    <td>{flat.owner?.phone || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span> Page {page} of {totalPages} </span>

            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
          <Outlet />
        </div>
</div>
  );
}
