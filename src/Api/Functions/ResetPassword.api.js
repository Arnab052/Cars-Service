import axiosInstance from "../AxiosInstance/AxiosInstance";
import { endpoints } from "../endpoints/endpoints";

export const resetpassword = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.resetpw, data);
    return response?.data;
  } catch (error) {
    console.log(`Error in reset password ${error}`);
  }
};
