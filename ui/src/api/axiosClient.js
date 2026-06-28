import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat", // 🔥 key fix
      skipNulls: true
    }),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;