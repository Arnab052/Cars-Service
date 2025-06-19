import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstance/AxiosInstance";
import { endpoints } from "../EndPoints/endpoints";

export const updatePassword = async (data) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.updatepw, data);
    return response?.data;
  } catch (error) {
    toast.error(error?.message);
  }
};
