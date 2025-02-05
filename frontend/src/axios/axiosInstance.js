import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080/api/v1", // Fetch the URL from the env file or use default
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
