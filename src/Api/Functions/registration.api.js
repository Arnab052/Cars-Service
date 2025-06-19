import axiosInstance from "../AxiosInstance/AxiosInstance";
import { endpoints } from "../endpoints/endpoints";

// Define Registration API Function
export const registration = async (data) => {
  const response = await axiosInstance.post(endpoints.auth.registration, data);
  try {
    if (response.data) return response?.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with an error status code
      return {
        success: false,
        error: error.response.data,
        status: error.response.status,
        message: error.response.data.message || "Registration failed",
      };
    }
  }
};
