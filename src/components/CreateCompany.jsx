import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Navbar Component
const Navbar = () => (
  <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
    <div className="flex items-center">
      {/* <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" /> */}
      <span className="text-white text-lg font-semibold">Interview Expo</span>
    </div>
    <div className="hidden md:flex space-x-4">
      {/* <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Sign Up
      </button>
      <button className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
        Login
      </button> */}
    </div>
  </nav>
);

function CreateCompany() {
  const [formData, setFormData] = useState({
    logo: '',
    name: '',
    location: '',
    industry: '',
    role: 'Admin', // Default role
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/company/create`, formData);
      // alert(response.data.message);
       navigate(`/get-company`);
    } catch (error) {
      console.error("Error creating company:", error.response || error);
      alert('There was an error while creating the company.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create New Company</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-lg font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="logo" className="text-lg font-medium text-gray-700">Logo (URL)</label>
              <input
                type="text"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            

            <div className="flex flex-col space-y-2">
              <label htmlFor="location" className="text-lg font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="industry" className="text-lg font-medium text-gray-700">Industry</label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* <div className="flex flex-col space-y-2">
              <label htmlFor="role" className="text-lg font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Admin">Admin</option>
                
                <option value="Student">Student</option>
              </select>
            </div> */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-300"
              >
                Create Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
