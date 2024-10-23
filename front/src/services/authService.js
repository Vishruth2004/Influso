import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Change this to your backend URL

// Signup
export const signup = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

// Login
export const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};
