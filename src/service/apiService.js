import axios from 'axios';

export const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleApiError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data.message || 'An error occurred.');
        return error.response.data.message || 'Something went wrong. Please try again later.';
    } else if (error.request) {
        console.error('No response received:', error.request);
        return 'No response from the server. Please check your connection.';
    } else {
        console.error('Error in request setup:', error.message);
        return 'Failed to send request. Please try again.';
    }
};

const apiRequest = async (requestFunc) => {
    try {
        const response = await requestFunc();
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const login = (username, password) =>
    apiRequest(() => api.post('/api/auth/login', { username, password }));

export const register = (username, password) =>
    apiRequest(() => api.post('/api/auth/register', { username, password }));

export const updateScore = (score) =>
    apiRequest(() => api.patch('/api/scores', { score }));

export const getHighScores = () =>
    apiRequest(() => api.get('/api/scores'));

export const getPastScores = () =>
    apiRequest(() => api.get('/api/scores/history'));

export default api;