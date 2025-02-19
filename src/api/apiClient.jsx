// api.js
import axios from 'axios';
// Set your API base URL (you can configure it via an environment variable)
const API_BASE_URL = 'https://api.socialmediateam.gr';
// Create an Axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout (adjust as needed)
});
// Optional: Add a request interceptor to attach authentication tokens or other headers
apiClient.interceptors.request.use(
    (config) => {
        // For example, attach a token from localStorage if it exists
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// Optional: Add a response interceptor for global error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally here (e.g., redirect to login on 401)
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            // Optionally, perform actions like clearing tokens or redirecting the user
        }
        return Promise.reject(error);
    }
);
/**
 * Generic API call functions
 */
// GET request
export const getData = (endpoint, config = {}) => {
    return apiClient.get(endpoint, config);
};
// POST request
export const postData = (endpoint, data, config = {}) => {
    return apiClient.post(endpoint, data, config);
};
// PUT request
export const putData = (endpoint, data, config = {}) => {
    return apiClient.put(endpoint, data, config);
};
// PATCH request
export const patchData = (endpoint, data, config = {}) => {
    return apiClient.patch(endpoint, data, config);
};
// DELETE request
export const deleteData = (endpoint, config = {}) => {
    return apiClient.delete(endpoint, config);
};
export default apiClient;
