import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

// Navbar component for the header
const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-semibold">Interview Expo</h1>
      <div className="hidden md:flex space-x-4">
        <a href="/" className="hover:bg-blue-700 px-4 py-2 rounded">Home</a>
        </div>
    </div>
  </nav>
);

const QuestionsList = () => {
  const [questionsData, setQuestionsData] = useState([]); // Store grouped data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch all questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/questions/get"); // Adjust API URL
        const questions = response.data.questions;

        // Group questions by company name
        const groupedByCompany = questions.reduce((acc, question) => {
          const companyName = question.company?.name || "Unknown Company"; // Handle undefined company
          if (!acc[companyName]) {
            acc[companyName] = [];
          }
          acc[companyName].push(question.question);
          return acc;
        }, {});

        setQuestionsData(Object.entries(groupedByCompany)); // Convert to array of [companyName, questions[]]
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Company-wise Questions", 10, 10);

    let y = 20; // Initial Y position for content
    questionsData.forEach(([companyName, questions]) => {
      doc.setFontSize(14);
      doc.text(companyName, 10, y);
      y += 8;

      questions.forEach((question, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${question}`, 15, y);
        y += 7;
        if (y > 280) {
          // Handle page overflow
          doc.addPage();
          y = 20;
        }
      });
      y += 5; // Add space between companies
    });

    doc.save("questions.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center my-6">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800 text-center">Company-wise Questions</h1>
          <button
            onClick={generatePDF}
            className="text-sm md:text-lg bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading questions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : questionsData.length > 0 ? (
          <div className="space-y-6">
            {questionsData.map(([companyName, questions]) => (
              <div
                key={companyName}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{companyName}</h2>
                <ul className="list-disc pl-6 text-gray-700">
                  {questions.map((question, index) => (
                    <li key={index} className="text-gray-600">{question}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
