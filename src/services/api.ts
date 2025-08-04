import axios from "axios";
import { store } from "store/index";
import { logout, setCredentials } from "store/slice/authSlice";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:9000/api", // ✅  API base URL
  baseURL: "", // ✅  API base URL
  timeout: 10000,
});

// axiosInstance.interceptors.request.use((config) => {
//   console.log("store");
//   console.log(store);
//   const state = store.getState();
//   const token = state.user.auth;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refreshToken")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         const res = await axios.post(
//           "https://your-axiosInstance.com/api/auth/refresh",
//           { refreshToken }
//         );

//         const newAccessToken = res.data.accessToken;
//         store.dispatch(
//           setCredentials({
//             accessToken: newAccessToken,
//             refreshToken: refreshToken!,
//             user: store.getState().user.auth,
//           })
//         );

//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axios(originalRequest);
//       } catch (refreshErr) {
//         store.dispatch(logout());
//         return Promise.reject(refreshErr);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
