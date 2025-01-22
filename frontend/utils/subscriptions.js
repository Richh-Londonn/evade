
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/api';

export const fetchSubscriptions = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/subscriptions/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        throw error.response.data;
    }
};

export const cancelSubscription = async (subscriptionId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/subscriptions/${subscriptionId}`);
        return response.data;
    } catch (error) {
        console.error('Error canceling subscription:', error);
        throw error.response.data;
    }
};
