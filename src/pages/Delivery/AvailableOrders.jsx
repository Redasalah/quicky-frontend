// src/pages/delivery/AvailableOrders.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/Delivery/AvailableOrders.css';

const AvailableOrders = () => {
  const navigate = useNavigate();
  const [availableOrders, setAvailableOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    distance: 'all',
    amount: 'all'
  });

  useEffect(() => {
    // Simulate API call to fetch available orders
    const fetchAvailableOrders = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockOrders = [
          {
            id: 'ORD-2001',
            restaurant: {
              name: 'Pizza Paradise',
              address: '123 Main St, Anytown',
              distance: 1.8
            },
            customerAddress: '456 Oak Ave, Anytown',
            items: 3,
            totalAmount: 24.99,
            estimatedTime: '20-25 min',
            deliveryFee: 4.50
          },
          {
            id: 'ORD-2002',
            restaurant: {
              name: 'Burger Heaven',
              address: '789 Pine St, Anytown',
              distance: 3.2
            },
            customerAddress: '101 Maple Dr, Anytown',
            items: 2,
            totalAmount: 18.75,
            estimatedTime: '25-30 min',
            deliveryFee: 5.25
          },
          {
            id: 'ORD-2003',
            restaurant: {
              name: 'Sushi World',
              address: '555 Cherry Ln, Anytown',
              distance: 0.9
            },
            customerAddress: '222 Elm Ct, Anytown',
            items: 4,
            totalAmount: 42.50,
            estimatedTime: '15-20 min',
            deliveryFee: 3.75
          },
          {
            id: 'ORD-2004',
            restaurant: {
              name: 'Taco Time',
              address: '333 Birch Rd, Anytown',
              distance: 4.7
            },
            customerAddress: '777 Cedar St, Anytown',
            items: 5,
            totalAmount: 32.80,
            estimatedTime: '30-35 min',
            deliveryFee: 6.00
          }
        ];
        
        setAvailableOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching available orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableOrders();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleAcceptOrder = (orderId) => {
    // In a real app, this would make an API call to accept the order
    console.log(`Accepting order: ${orderId}`);
    
    // Navigate to order delivery page
    navigate(`/delivery/order/${orderId}`);
  };

  // Apply filters to orders
  const filteredOrders = availableOrders.filter(order => {
    // Distance filter
    if (filters.distance === 'near' && order.restaurant.distance > 2) {
      return false;
    }
    if (filters.distance === 'medium' && (order.restaurant.distance <= 2 || order.restaurant.distance > 5)) {
      return false;
    }
    if (filters.distance === 'far' && order.restaurant.distance <= 5) {
      return false;
    }
    
    // Amount filter
    if (filters.amount === 'low' && order.totalAmount > 20) {
      return false;
    }
    if (filters.amount === 'medium' && (order.totalAmount <= 20 || order.totalAmount > 35)) {
      return false;
    }
    if (filters.amount === 'high' && order.totalAmount <= 35) {
      return false;
    }
    
    return true;
  });

  return (
    <>
      <div className="available-orders-container">
        <div className="available-orders-header">
          <h1>Available Orders</h1>
          <p>Select an order to deliver</p>
        </div>
        
        <div className="order-filters">
          <div className="filter-group">
            <label htmlFor="distance">Distance</label>
            <select 
              id="distance" 
              name="distance" 
              value={filters.distance} 
              onChange={handleFilterChange}
            >
              <option value="all">All Distances</option>
              <option value="near">Nearby (0-2 miles)</option>
              <option value="medium">Medium (2-5 miles)</option>
              <option value="far">Far (5+ miles)</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="amount">Order Amount</label>
            <select 
              id="amount" 
              name="amount" 
              value={filters.amount} 
              onChange={handleFilterChange}
            >
              <option value="all">All Amounts</option>
              <option value="low">Low ($0-$20)</option>
              <option value="medium">Medium ($20-$35)</option>
              <option value="high">High ($35+)</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-message">
            <p>Loading available orders...</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-card-header">
                    <h3>{order.restaurant.name}</h3>
                    <span className="order-id">{order.id}</span>
                  </div>
                  
                  <div className="order-card-details">
                    <div className="detail-row">
                      <span className="detail-label">Restaurant:</span>
                      <span className="detail-value">{order.restaurant.address}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Customer:</span>
                      <span className="detail-value">{order.customerAddress}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Distance:</span>
                      <span className="detail-value">{order.restaurant.distance.toFixed(1)} miles</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Items:</span>
                      <span className="detail-value">{order.items}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Est. Time:</span>
                      <span className="detail-value">{order.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="order-card-footer">
                    <div className="order-amount">
                      <span className="amount-label">Order Total:</span>
                      <span className="amount-value">${order.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="delivery-fee">
                      <span className="fee-label">Delivery Fee:</span>
                      <span className="fee-value">${order.deliveryFee.toFixed(2)}</span>
                    </div>
                    <button 
                      className="accept-order-button" 
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      Accept Order
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-orders-message">
                <p>No available orders match your filters.</p>
                <button 
                  className="reset-filters-button"
                  onClick={() => setFilters({ distance: 'all', amount: 'all' })}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    
    </>
  );
};

export default AvailableOrders;