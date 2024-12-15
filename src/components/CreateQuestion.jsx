import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Navbar Component
const Navbar = () => (
  <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
    <div className="flex items-center">
      {/* <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" /> */}
      <span className="text-white text-lg font-semibold">Interview Expo</span>
    </div>
    <div className="hidden md:flex space-x-4">
      {/* <button className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
        Login
      </button> */}
    </div>
    {/* Mobile Hamburger Button */}
    {/* <div className="md:hidden">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-white"
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
      </button>
    </div> */}
  </nav>
);

const CreateQuestion = () => {
  const { companyId } = useParams(); // Get company ID from URL
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([""]); // Initialize with one empty question field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/question/create",
        {
          company: companyId,
          questions,
        }
      );

      setSuccess("Questions created successfully!");
      setQuestions([""]); // Reset form after success
      setIsLoading(false);

      // Navigate to a relevant page after submission
      setTimeout(() => navigate(`/questions`), 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create questions. Please try again."
      );
      setIsLoading(false);
    }
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestionField = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestionField = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6 mt-11">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto ">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Add Questions
          </h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mb-4 text-center">{success}</p>
          )}

          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Questions
            </h2>
            {questions.map((question, index) => (
              <div
                key={index}
                className="flex flex-row mb-4 relative space-y-2"
              >
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                  required
                />
                {/* Remove button placed outside the textarea */}
                <button
                  type="button"
                  className="border border-red-500 px-2 rounded self-end text-red-500 font-bold m-2"
                  onClick={() => removeQuestionField(index)}
                >
                  -
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <button
                type="button"
                className="text-blue-500 font-semibold"
                onClick={addQuestionField}
                disabled={questions.length >= 10}
              >
                + Add Question
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-lg focus:outline-none hover:bg-blue-600 transition duration-300"
                disabled={isLoading || questions.some((q) => q.trim() === "")}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
