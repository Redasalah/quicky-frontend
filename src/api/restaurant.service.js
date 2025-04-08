// src/api/restaurant.service.js
import api from './config';

const RestaurantService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/restaurants', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getMenu: async (restaurantId) => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}/menu`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default RestaurantService;