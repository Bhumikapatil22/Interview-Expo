import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateCompany from "./components/CreateCompany";
import CompanyList from "./components/CompanyList";
import CreateQuestion from "./components/CreateQuestion";
import QuestionsList from "./components/QuestionsList";
import SignupForm from "./components/SignUpForm";
import Login from "./components/LoginForm";
import LandingPage from "./components/LandingPage"; // Import LandingPage

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-company" element={<CreateCompany />} />
        <Route path="/get-company" element={<CompanyList />} />
        <Route path="/create-question/:companyId" element={<CreateQuestion />} />
        <Route path="/questions" element={<QuestionsList />} />
      </Routes>
    </Router>
  );
}

export default App;
