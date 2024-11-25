import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend API base URL
});

export const login = (credentials) => api.post("/auth/login", credentials);
export const fetchProperties = () => api.get("/properties");
export const fetchTenants = () => api.get("/tenants");

export default api;
