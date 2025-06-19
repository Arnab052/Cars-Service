import axiosInstance from "../AxiosInstance/AxiosInstance";
import { endpoints } from "../endpoints/endpoints";

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get(
      endpoints.cms.allservicecategories
    );

    return response?.data?.data;
  } catch (error) {
    console.log(`Error in all categories api ${error}`);
  }
};
