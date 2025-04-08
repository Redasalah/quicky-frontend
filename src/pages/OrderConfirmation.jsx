// src/pages/OrderConfirmation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  // Mock order data - in a real app, this would come from API response or state
  const order = {
    id: 'ORD12345',
    date: new Date().toLocaleString(),
    status: 'Confirmed',
    estimatedDelivery: '30-45 minutes',
    restaurant: 'Pizza Paradise',
    total: 33.45
  };
  
  return (
    <>
    
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <div className="check-icon">✓</div>
            <h1>Order Confirmed!</h1>
            <p>Your food is on its way to you</p>
          </div>
          
          <div className="order-details">
            <div className="order-detail-row">
              <span>Order Number:</span>
              <span>{order.id}</span>
            </div>
            <div className="order-detail-row">
              <span>Order Date:</span>
              <span>{order.date}</span>
            </div>
            <div className="order-detail-row">
              <span>Status:</span>
              <span className="order-status">{order.status}</span>
            </div>
            <div className="order-detail-row">
              <span>Estimated Delivery:</span>
              <span>{order.estimatedDelivery}</span>
            </div>
            <div className="order-detail-row">
              <span>Restaurant:</span>
              <span>{order.restaurant}</span>
            </div>
            <div className="order-detail-row total">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="confirmation-actions">
          <Link 
  to={`/order-tracking/${order.id}`} 
  className="action-button primary"
>
  Track Your Order
</Link>
            <Link to="/restaurants" className="action-button secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default OrderConfirmation;