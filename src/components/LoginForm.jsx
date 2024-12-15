import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Store token
        localStorage.setItem('role', response.data.user.role); // Store user role
        alert('Login successful');
        // Redirect based on role
        if (response.data.user.role === 'Admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        {/* Error Message */}
        <div className="mt-4 text-center text-sm text-red-500">
          {/* Render error message dynamically if needed */}
        </div>

        {/* Additional Links */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
