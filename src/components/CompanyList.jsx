import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/company/get`);
        console.log(response.data);
        if (response.data?.companies) {
          setCompanies(response.data.companies);
        } else {
          setError("Unexpected API response format");
        }
      } catch (err) {
        setError("Failed to fetch companies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCardClick = (companyId) => {
    navigate(`/create-question/${companyId}`); // Navigate to the CreateQuestion page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" /> */}
          <span className="text-white text-xl font-semibold">Interview Expo</span>
        </div>
        <div className="hidden md:flex space-x-4">
          
          <Link to="/create-company">
            <button className="hover:bg-blue-700 rounded text-white px-6 py-2 ">
             Add Company
            </button>
          </Link>

          <Link to="/questions">
            <button className="hover:bg-blue-700 rounded text-white px-6 py-2 ">
             View Questions
            </button>
          </Link>

          <Link to="/">
            <button className="hover:bg-blue-700 rounded text-white px-6 py-2 ">
              Logout
            </button>
          </Link>
        </div>
        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 md:hidden">
          <div className="bg-gray-800 p-4 w-3/4 max-w-md">
          <Link to="/create-company">
            <button className=" text-white px-6 py-2 ">
             Add Company
            </button>
          </Link>

          <Link to="/questions">
            <button className=" text-white px-6 py-2 ">
             View Questions
            </button>
          </Link>

          <Link to="/">
            <button className=" text-white px-6 py-2 ">
              Logout
            </button>
          </Link>
          </div>
        </div>
      )}

      {/* Company List Content */}
      <div className="mt-7 p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Companies</h1>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading companies...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {companies.length > 0 ? (
              companies.map((company) => (
                <div
                  key={company._id}
                  onClick={() => handleCardClick(company._id)}
                  className="bg-white border border-gray-300 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <div className="flex justify-center items-center h-32 w-32 bg-gray-100 rounded-full mx-auto mt-4">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={`${company.name} Logo`}
                        className="object-contain h-full w-full"
                      />
                    ) : (
                      <span className="text-lg text-gray-500">Logo</span>
                    )}
                  </div>
                  <div className="text-center py-4 px-6">
                    <h2 className="text-xl font-semibold text-gray-800">{company.name}</h2>
                    <p className="text-gray-600 text-sm mt-2">{company.location}</p>
                    <p className="text-gray-600 text-sm">{company.industry}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No companies found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
