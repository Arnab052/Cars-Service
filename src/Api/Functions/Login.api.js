import axiosInstance from "../AxiosInstance/AxiosInstance";
import { endpoints } from "../endpoints/endpoints";

export const userLogin = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.login, data);
    return response?.data;
  } catch (error) {
    console.log(`error in login api ${error}`);
  }
};
