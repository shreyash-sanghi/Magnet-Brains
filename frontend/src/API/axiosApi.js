import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:7002/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


//Attach token automatically

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Task-Creat");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


 // Auto logout on 401

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("Task-Creat");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
