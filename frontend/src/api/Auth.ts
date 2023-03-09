import axios from "axios";
import { LoginSuccessResponse } from "../utils/type/AuthInterface";
import { NormalizedResponse } from "../utils/type/common";
import { getRefreshToken } from "./browser";
import { handleError, handleResponse } from "./generics";
const axiosApi = axios.create();
// intercepting to capture errors
axiosApi.interceptors.response.use(
  async (response): Promise<NormalizedResponse<any>> => {
    return handleResponse(response);
  },
  async (error): Promise<NormalizedResponse<any>> => {
    return handleError(error);
  }
);

export function login(params: { username: string; password: string }) {
  const baseUrl = "/api/login";

  return axiosApi.post(baseUrl, params) as Promise<
    NormalizedResponse<LoginSuccessResponse>
  >;
}
