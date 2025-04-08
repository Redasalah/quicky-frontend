// src/pages/restaurant/RestaurantSettings.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/restaurant/RestaurantSettings.css';

const RestaurantSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cuisineType: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    openingTime: '09:00',
    closingTime: '22:00',
    deliveryRadius: 5,
    minimumOrderAmount: 10,
    averagePreparationTime: 30,
    deliveryFee: 2.99,
    acceptingOrders: true,
    featuredItems: []
  });
  
  // Mock cuisines for dropdown
  const availableCuisines = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 
    'American', 'Thai', 'Mediterranean', 'French', 'Vietnamese'
  ];
  
  // Load restaurant data
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        // This would be an API call in a real application
        // For now, we'll simulate a delay and use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock restaurant data
        const mockRestaurantData = {
          name: 'Pizza Paradise',
          description: 'Authentic Italian pizzas made with fresh ingredients daily.',
          cuisineType: 'Italian',
          phoneNumber: '(555) 123-4567',
          email: 'contact@pizzaparadise.com',
          address: '123 Main Street',
          city: 'New York',
          postalCode: '10001',
          openingTime: '10:00',
          closingTime: '22:00',
          deliveryRadius: 5,
          minimumOrderAmount: 15,
          averagePreparationTime: 25,
          deliveryFee: 2.99,
          acceptingOrders: true,
          featuredItems: ['Margherita Pizza', 'Pepperoni Pizza', 'Garlic Bread']
        };
        
        setFormData(mockRestaurantData);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setErrorMessage('Failed to load restaurant data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurantData();
  }, []);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear messages when form is being edited
    setSuccessMessage('');
    setErrorMessage('');
  };
  
  // Handle featured items (comma-separated string to array)
  const handleFeaturedItemsChange = (e) => {
    const itemsString = e.target.value;
    const itemsArray = itemsString.split(',').map(item => item.trim()).filter(item => item);
    
    setFormData(prev => ({ ...prev, featuredItems: itemsArray }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // This would be an API call in a real application
      // For now, we'll simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSuccessMessage('Restaurant settings saved successfully!');
      
      // In a real app, you might want to refresh the data after saving
      // fetchRestaurantData();
    } catch (error) {
      console.error('Error saving restaurant settings:', error);
      setErrorMessage('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="restaurant-settings-loading">
        <p>Loading restaurant settings...</p>
      </div>
    );
  }
  
  return (
    <div className="restaurant-settings-container">
      <div className="restaurant-settings-header">
        <h1>Restaurant Settings</h1>
        <p>Welcome, {user?.name || 'Restaurant Partner'}</p>
      </div>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="restaurant-settings-form">
        <div className="settings-section">
          <h2>General Information</h2>
          
          <div className="form-group">
            <label htmlFor="name">Restaurant Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cuisineType">Cuisine Type</label>
              <select
                id="cuisineType"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                required
              >
                <option value="">Select Cuisine</option>
                {availableCuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Location</h2>
          
          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Business Hours</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="openingTime">Opening Time</label>
              <input
                type="time"
                id="openingTime"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="closingTime">Closing Time</label>
              <input
                type="time"
                id="closingTime"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Delivery Settings</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="deliveryRadius">Delivery Radius (km)</label>
              <input
                type="number"
                id="deliveryRadius"
                name="deliveryRadius"
                value={formData.deliveryRadius}
                onChange={handleChange}
                min="1"
                max="20"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="minimumOrderAmount">Minimum Order Amount ($)</label>
              <input
                type="number"
                id="minimumOrderAmount"
                name="minimumOrderAmount"
                value={formData.minimumOrderAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="averagePreparationTime">Average Preparation Time (minutes)</label>
              <input
                type="number"
                id="averagePreparationTime"
                name="averagePreparationTime"
                value={formData.averagePreparationTime}
                onChange={handleChange}
                min="5"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="deliveryFee">Delivery Fee ($)</label>
              <input
                type="number"
                id="deliveryFee"
                name="deliveryFee"
                value={formData.deliveryFee}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="acceptingOrders"
              name="acceptingOrders"
              checked={formData.acceptingOrders}
              onChange={handleChange}
            />
            <label htmlFor="acceptingOrders">Currently Accepting Orders</label>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Featured Items</h2>
          
          <div className="form-group">
            <label htmlFor="featuredItems">Featured Menu Items (comma-separated)</label>
            <textarea
              id="featuredItems"
              name="featuredItems"
              value={formData.featuredItems.join(', ')}
              onChange={handleFeaturedItemsChange}
              rows="2"
              placeholder="Item 1, Item 2, Item 3"
            />
            <small>These items will be highlighted on your restaurant page</small>
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="save-settings-button"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          
          <button
            type="button"
            className="cancel-button"
            onClick={() => window.history.back()}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantSettings;