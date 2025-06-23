// src/axiosConfig.js
import axios from 'axios';

// Set the base URL globally for all requests
const axiosInstance = axios.create({
  baseURL: "https://fav-image-share.onrender.com",  // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any other global headers here if necessary (e.g., Authorization)
  },
});

export default axiosInstance;
