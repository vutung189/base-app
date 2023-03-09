import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { NormalizedResponse } from "../utils/type/common";

export const handleResponse = async (
  response: AxiosResponse<any>
): Promise<NormalizedResponse<any>> => {
  return Promise.resolve({
    data: response.data,
    statusCode: response.status,
    isSuccess: true,
  });
};

export const handleError = (error: any, shouldFireMessage?: boolean) => {
  const errorMessage = error?.message || error?.response?.message || "Error";
  shouldFireMessage && toast.error(errorMessage);
  return Promise.resolve({
    errorMessage,
    statusCode: error?.response?.status,
    isSuccess: false,
  });
};
