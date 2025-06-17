import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api", // ✅  API base URL
  timeout: 10000,
});

// // Optional: Add interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add token or custom headers
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
