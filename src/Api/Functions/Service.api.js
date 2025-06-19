import axiosInstance from "../AxiosInstance/AxiosInstance";
import { endpoints } from "../EndPoints/EndPoints";

export const getAllServices = async () => {
  try {
    const response = await axiosInstance.get(`${endpoints.cms.allservices}`);

    return response?.data;
  } catch (error) {
    throw error;
  }
};
