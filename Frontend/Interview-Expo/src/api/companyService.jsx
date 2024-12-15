import axiosInstance from "./axiosInstance";

// Fetch all companies
export const getAllCompanies = async () => {
    try {
        const response = await axiosInstance.get("/company/get");
        return response.data.companies; // Matches the response format from your backend
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
};

// Create a new company
export const createCompany = async (companyData) => {
    try {
        const response = await axiosInstance.post("/company/create", companyData);
        return response.data; // Adjust based on backend response
    } catch (error) {
        console.error("Error creating company:", error);
        throw error;
    }
};
