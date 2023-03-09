import axios, { AxiosInstance } from "axios";

import { toast } from "react-toastify";
import i18n from "../i18n";
import { NormalizedResponse } from "../utils/type/common";
import {
  getAccessToken,
  isLoggedIn,
  logoutAndgoToLogin
} from "./browser";
import { handleError, handleResponse } from "./generics";

const axiosApi = axios.create();


// content type
// axiosApi.defaults.baseURL = process.env.REACT_APP_API_URL;
// intercepting to capture request
axiosApi.interceptors.request.use(
  (config) => {
    // log request config
    console.debug("axios config: " + JSON.stringify(config));
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken() || ""}`,
      "Accept-Language": "vi",
    };
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// intercepting to capture errors
axiosApi.interceptors.response.use(
  async (response): Promise<NormalizedResponse<any>> => {
    return handleResponse(response);
  },
  async (error): Promise<NormalizedResponse<any>> => {
    if (error?.response?.status !== 401) {
      const message = error.response?.data?.message;
      toast.error(message || i18n.t("An error has occurred"));

      return handleError(error);
    }

    if (!window.location.pathname.startsWith("/auth")) {
      toast.error(i18n.t<string>("Session timeout"));
      await logoutAndgoToLogin();
    }
    return handleError(error, false);
  }
);

const AUTH_SESSION_KEY = "";

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string | null) => {
  // if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // else delete axios.defaults.headers.common["Authorization"];
};

const getUserFromCookie = () => {
  const user = sessionStorage.getItem(AUTH_SESSION_KEY);
  return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
};
class APICore {
  /**
   * Fetches data from given url
   */
  axiosInstance: AxiosInstance = axiosApi;
  constructor(axiosInstance?: AxiosInstance) {
    if (axiosInstance) {
      this.axiosInstance = axiosInstance;
    }
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.updatePatch = this.updatePatch.bind(this);
  }
  get = (url: string, params?: Record<string, string | number | any>) => {
    let response;
    if (params && Object.keys(params).length !== 0) {
      const queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";

      response = this.axiosInstance.get(
        `${url}?${queryString}`,
        params
      ) as Promise<NormalizedResponse<any>>;
    } else {
      response = this.axiosInstance.get(`${url}`) as Promise<
        NormalizedResponse<any>
      >;
    }
    return response;
  };

  getFile = (url: string, params: any) => {
    let response;
    if (params) {
      const queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, { responseType: "blob" });
    } else {
      response = axios.get(`${url}`, { responseType: "blob" });
    }
    return response;
  };

  getMultiple = (urls: string, params: any) => {
    const reqs = [];
    let queryString = "";
    if (params) {
      queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  /**
   * post given data to url
   */
  post(url: string, data: any) {
    return this.axiosInstance.post(url, data) as Promise<
      NormalizedResponse<any>
    >;
  }
  postParam = (url: string, params?: Record<string, string | number | any>) => {
    let response;
    if (params && Object.keys(params).length !== 0) {
      const queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";

      response = this.axiosInstance.post(
        `${url}?${queryString}`,
        params
      ) as Promise<NormalizedResponse<any>>;
    } else {
      response = this.axiosInstance.post(`${url}`) as Promise<
        NormalizedResponse<any>
      >;
    }
    return response;
  };
  /**
   * Updates patch data
   */
  updatePatch = (url: string, data: any) => {
    return this.axiosInstance.patch(url, data) as Promise<
      NormalizedResponse<any>
    >;
  };

  /**
   * Updates data
   */
  update = (url: string, data: any) => {
    return this.axiosInstance.put(url, data) as Promise<
      NormalizedResponse<any>
    >;
  };

  /**
   * Deletes data
   */
  delete = (url: string, data?: any) => {
    return this.axiosInstance.delete(url, { data }) as Promise<
      NormalizedResponse<any>
    >;
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    // const config = {
    //   headers: {
    //     ...this.axiosInstance.defaults.headers,
    //     "content-type": "multipart/form-data",
    //   },
    // };
    return this.axiosInstance.post(url, formData) as Promise<
      NormalizedResponse<any>
    >;
  };

  /**
   * post given data to url with file
   */
  // updateWithFile = (url: string, data: any) => {
  //   const formData = new FormData();
  //   for (const k in data) {
  //     formData.append(k, data[k]);
  //   }

  //   const config = {
  //     headers: {
  //       ...axios.defaults.headers,
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   return axios.patch(url, formData, config);
  // };

  isUserAuthenticated = () => {
    return isLoggedIn();
  };

  setLoggedInUser = (session: any) => {
    if (session)
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  };
  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    return getUserFromCookie();
  };

  setUserInSession = (modifiedUser: any) => {
    const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const { token, user } = JSON.parse(userInfo);
      this.setLoggedInUser({ token, ...user, ...modifiedUser });
    }
  };
}

/*
Check if token available in session
*/
const user = getUserFromCookie();
if (user) {
  const { token } = user;
  if (token) {
    setAuthorization(token);
  }
}

export { APICore, setAuthorization };

