import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';
export const FILE_BASE_URL = import.meta.env.VITE_FILE_URL || '';

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

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user info
    return response.data;
};

export const register = async (email, password, name) => {
    const response = await api.post('/auth/register', { email, password, name });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user info
    return response.data;
};

export const getRecords = async () => {
    const response = await api.get('/records');
    return response.data;
};

export const createRecord = async (recordData) => {
    // If recordData is FormData, axios lets the browser set Content-Type to multipart/form-data
    // If it's a plain object, it defaults to application/json
    const response = await api.post('/records', recordData);
    return response.data;
};

export const deleteRecord = async (id) => {
    const response = await api.delete(`/records/${id}`);
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    localStorage.setItem('user', JSON.stringify(response.data)); // Update stored user info
    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await api.put('/users/change-password', passwordData);
    return response.data;
};

export default api;
