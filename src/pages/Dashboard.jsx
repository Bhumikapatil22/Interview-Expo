import React, { useEffect, useState } from "react";
import { getAllCompanies } from "../api/companyService";

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies();
                setCompanies(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load companies:", error);
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) return <p>Loading companies...</p>;

    return (
        <div>
            <h1>Companies</h1>
            {companies.length === 0 ? (
                <p>No companies found.</p>
            ) : (
                <ul>
                    {companies.map((company) => (
                        <li key={company._id}>
                            <h2>{company.name}</h2>
                            <p>Location: {company.location}</p>
                            <p>Industry: {company.industry}</p>
                            <p>Role: {company.role}</p>
                            {company.questions && company.questions.length > 0 && (
                                <ul>
                                    {company.questions.map((question, index) => (
                                        <li key={index}>{question}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
