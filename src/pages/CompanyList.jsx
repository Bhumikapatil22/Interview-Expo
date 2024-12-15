import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/company/get"
        );
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loader"></span> {/* Custom loader if needed */}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {companies.length > 0 ? (
            companies.map((company) => (
              <div
                key={company._id}
                onClick={() => handleCardClick(company._id)} // Navigate to question creation page
                className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col items-center w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] cursor-pointer transform transition duration-300 hover:scale-105"
              >
                <div className="h-16 w-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  {company.logo ? (
                    <img
                      src={company.logo} // Dynamically set the logo URL
                      alt={`${company.name} Logo`} // Add alt text for accessibility
                      className="h-full w-full object-cover" // Ensure the image fits within the container
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No Logo</span> // Fallback text if no logo is available
                  )}
                </div>
                <h1 className="text-lg font-semibold text-gray-800">{company.name}</h1>
                <p className="text-gray-600">{company.location}</p>
                <p className="text-gray-600">{company.industry}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No companies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyList;
