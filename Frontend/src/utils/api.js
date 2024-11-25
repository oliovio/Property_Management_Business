import axios from 'axios';

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend base URL
  timeout: 10000, // Optional: Add timeout for requests
});

// Interceptor to add authorization headers
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return req;
  },
  (error) => {
    console.error('Request error:', error); // Log any request setup errors
    return Promise.reject(error);
  }
);

// Interceptor to handle responses and errors globally
API.interceptors.response.use(
  (response) => {
    return response; // Pass through successful responses
  },
  (error) => {
    if (error.response) {
      // Handle HTTP errors (4xx, 5xx)
      console.error('Response error:', error.response.data.message || error.response.statusText);
      if (error.response.status === 401) {
        // Optional: Handle unauthorized errors (e.g., log the user out)
        console.error('Unauthorized! Please log in again.');
        localStorage.removeItem('token'); // Clear token if unauthorized
        // Redirect or show login modal, if necessary
      }
    } else if (error.request) {
      // Handle network errors or no response
      console.error('No response from server:', error.message);
    } else {
      // Handle other Axios setup errors
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
