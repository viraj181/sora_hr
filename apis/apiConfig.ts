"use client";
import axios from "axios";
import Cookies from "js-cookie";

// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const ApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// export const DOMAIN_NAME = process.env.NEXT_PUBLIC_BASE_DOMAIN_NAME;

const apiInstance = axios.create({
  baseURL: ApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "x-platform": "web",
  },
});

export const formDataApiInstance = axios.create({
  baseURL: ApiBaseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    // "x-platform": "web",
  },
});

formDataApiInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in cookies");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in cookies");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let handleLogout: (() => void) | null = null;

export const setLogoutHandler = (logoutFn: (() => void) | null) => {
  handleLogout = logoutFn;
};

apiInstance.interceptors.response.use(
  (config) => {
    if (config?.data?.statusCode === 401) {
      Cookies.remove("token");
      if (handleLogout) {
        handleLogout();
      }
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return config;
  },
  (error) => {
    if (error?.response?.status == 401) {
      Cookies.remove("token");
      if (handleLogout) {
        handleLogout();
      }
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default apiInstance;
