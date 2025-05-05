import axios from 'axios';

// Set your API base URL (you can configure it via an environment variable)
const API_BASE_URL = 'https://back.socialmediateam.gr';
// const API_BASE_URL = 'http://localhost:3000';
// const API_KEY = 'ad4a0daec06454dcdc51492275b048d3f1d5f84d5da3033db0123fd8739fa5d5'; // Should be stored securely, preferably in env variables
// Create an Axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer-when-downgrade',
    timeout: 10000, // 10 seconds timeout
});

// Optional: Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// API call functions
export const getData = (endpoint, config = {}) => apiClient.get(endpoint, config);
export const postData = (endpoint, data, config = {}) => apiClient.post(endpoint, data, config);
export const putData = (endpoint, data, config = {}) => apiClient.put(endpoint, data, config);
export const patchData = (endpoint, data, config = {}) => apiClient.patch(endpoint, data, config);
export const deleteData = (endpoint, config = {}) => apiClient.delete(endpoint, config);

export default apiClient;
