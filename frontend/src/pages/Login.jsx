import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import "./Login.css";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // 👈 added toggle state
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    username: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        // ---- LOGIN ----
          const payload = { 
                emailOrUsername: formData.emailOrUsername, 
                password: formData.password 
          };
          const { data } = await API.post('/auth/login', payload);
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          localStorage.setItem('user', JSON.stringify(data));

          if (data.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard');
          }
      } else {
        // ---- SIGNUP ----
          if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
          }
          const payload = {
            name: formData.username,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            password: formData.password
          };
          await API.post('/user/register', payload);
          alert("Signup successful! Please login.");
          setIsLogin(true); // switch back to login after signup
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div className="login-container">
      {/* Left side */}
      <div className="left-section">
        <h1>Sri Sai Baba Apartment</h1>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Right side - login/signup form */}
      <div className="right-section">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          {error && <p className="error">{error}</p>}

          {isLogin ? (
            <>
              <input
                type="text"
                name="emailOrUsername"
                placeholder="Email, Username or Phone"
                value={formData.emailOrUsername}
                onChange={handleChange}
                required
              />

              {/* Password field with eye button 👇 */}
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <div className="role-selection">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={formData.role === "owner"}
                    onChange={handleChange}
                    required
                  />
                  <span>Owner</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="tenant"
                    checked={formData.role === "tenant"}
                    onChange={handleChange}
                    required
                  />
                  <span>Tenant</span>
                </label>
              </div>
              {/* Password field with eye button 👇 */}
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="password-field">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="toggle-eye"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </>
          )}

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          {/* Toggle link */}
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
        </form>

        
      </div>
    </div>
  );
};

export default Login;
