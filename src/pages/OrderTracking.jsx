// src/pages/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/OrderTracking.css';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock order data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrderDetails = async () => {
      try {
        // In a real application, you would fetch this from your backend
        const mockOrderDetails = {
          id: orderId || 'ORD12345',
          restaurant: 'Pizza Paradise',
          date: '2024-04-06 12:30 PM',
          total: 33.45,
          status: 'Out for Delivery',
          items: [
            { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
            { name: 'Garlic Bread', quantity: 2, price: 5.99 },
            { name: 'Coca-Cola', quantity: 2, price: 2.99 }
          ],
          trackingSteps: [
            {
              status: 'Order Placed',
              description: 'Your order has been received',
              timestamp: '2024-04-06 12:30 PM',
              completed: true
            },
            {
              status: 'Preparing',
              description: 'Restaurant is preparing your food',
              timestamp: '2024-04-06 12:45 PM',
              completed: true
            },
            {
              status: 'Out for Delivery',
              description: 'Your order is on its way',
              timestamp: '2024-04-06 13:00 PM',
              completed: true
            },
            {
              status: 'Delivered',
              description: 'Order will be delivered soon',
              timestamp: null,
              completed: false
            }
          ]
        };

        setOrderDetails(mockOrderDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-tracking-container">
        <div className="loading-spinner">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="order-tracking-container">
      <div className="order-tracking-card">
        <div className="order-tracking-header">
          <h1>Order Tracking</h1>
          <div className="order-details">
            <span>Order #{orderDetails.id}</span>
            <span>{orderDetails.date}</span>
          </div>
        </div>

        <div className="order-tracking-content">
          <div className="tracking-timeline">
            {orderDetails.trackingSteps.map((step, index) => (
              <div 
                key={step.status} 
                className={`tracking-step ${step.completed ? 'completed' : ''} ${
                  orderDetails.status === step.status ? 'current' : ''
                }`}
              >
                <div className="step-marker"></div>
                <div className="step-content">
                  <h3>{step.status}</h3>
                  <p>{step.description}</p>
                  {step.timestamp && <span className="step-timestamp">{step.timestamp}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-restaurant">
              <h3>{orderDetails.restaurant}</h3>
            </div>
            <div className="order-items">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x {item.quantity}</span>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="order-tracking-actions">
          <Link to="/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
          <button className="btn btn-primary">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;