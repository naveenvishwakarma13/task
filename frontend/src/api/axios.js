import axios from "axios";
import { baseURL } from "../constent/constent.js";

// Create Axios instance
const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: automatically add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token from localStorage
  if (token) {
    config.headers["token"] = token; // send token in header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
