import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

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

export const register = async (email, password, name, role) => {
    const response = await api.post('/auth/register', { email, password, name, role });
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

export const uploadAvatar = async (formData) => {
    const response = await api.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    // Update local storage too so the changes reflect immediately
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, avatar: response.data.avatar };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return response.data;
};

export default api;
