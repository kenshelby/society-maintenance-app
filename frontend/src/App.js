import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AddFlatForm from "./pages/AddFlatForm";
import Complaints from './components/Complaints';
import Friends from './components/Friends';
import FlatsTable from './components/FlatsTable';
import Guards from './components/Guards';
import Maintenance from './components/Maintenance';
import Messages from './components/Messages';
import Navbar from './components/Navbar';
import NotificationBell from './components/NotificationBell';
import Notifications from './components/Notifications';
import Polls from './components/Polls';
import Profile from './components/Profile';
import UsersTable from './components/UsersTable'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }><Route path = "UsersTable" element ={<UsersTable/>}/>
            </Route>

            <Route path="/admin/add-flat" element={<AddFlatForm />} />

            <Route path="/user-dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }>
                <Route path="profile" element={<Profile />} />
                <Route path="friends" element={<Friends />} />
                <Route path="flats" element={<FlatsTable />} />
                <Route path="messages" element={<Messages />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="maintenance" element={<Maintenance />} />
                <Route path="polls" element={<Polls />} />
                <Route path="guards" element={<Guards />} />
                <Route path="notification-bell" element={<NotificationBell />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>

        </Routes>
    </Router>
  );
}

export default App;