import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" /> */}
          <span className="text-white text-xl font-semibold">
            Interview Expo
          </span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/signup">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-9 md:flex-row items-center justify-center px-4 gap-8 ">
        {/* Left Section */}
        <div className="flex flex-col items-center text-center  max-w-md">
          <img
            src="https://www.rcpit.ac.in/uploads/1599837268.png"
            alt="Logo"
            className=" h-28 mr-2"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to RCPIT's Interview Expo
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Prepare for your career with confidence. Access company details,
            interview questions, and much more.
          </p>
          <Link to="/get-company">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              View Companies
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/premium-vector/manager-talking-candidate-inside-office-ask-each-other-questions-answers-interview-job-interview-concept-flat-vector-illustration_923732-4853.jpg"
            alt="Interview Illustration"
            className="w-80 md:w-96 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
