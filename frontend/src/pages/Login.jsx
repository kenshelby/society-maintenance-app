import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = formData.emailOrUsername.includes('@')
        ? { email: formData.emailOrUsername, password: formData.password }
        : { username: formData.emailOrUsername, password: formData.password };

      const { data } = await API.post('/auth/login', payload);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="w-1/2 bg-pink-200 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-pink-700">Welcome Back!</h1>
      </div>

      {/* Right side - login form in box */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl mb-6 font-semibold text-center">Login</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <input
            type="text"
            name="emailOrUsername"
            placeholder="Email or Username"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mb-6"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
