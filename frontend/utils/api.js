
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

// User API
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error.response.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error.response.data;
    }
};

// Hazard Detection API
export const predictHazard = async (image) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/hazard/predict`, { image });
        return response.data;
    } catch (error) {
        console.error('Error predicting hazard:', error);
        throw error.response.data;
    }
};
