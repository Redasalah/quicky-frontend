// src/pages/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/OrderHistory.css'; // You'll need to create this CSS file

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch order history
    const fetchOrders = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockOrders = [
          {
            id: '1001',
            restaurant: 'Pizza Paradise',
            date: '2023-08-15',
            status: 'Delivered',
            total: 24.99
          },
          {
            id: '1002',
            restaurant: 'Burger Heaven',
            date: '2023-08-12',
            status: 'Delivered',
            total: 18.50
          },
          {
            id: '1003',
            restaurant: 'Sushi World',
            date: '2023-08-08',
            status: 'Cancelled',
            total: 32.75
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading order history...</div>;
  }

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>{order.restaurant}</h3>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-details">
                <p className="order-date">Order Date: {order.date}</p>
                <p className="order-id">Order ID: {order.id}</p>
                <p className="order-total">Total: ${order.total.toFixed(2)}</p>
              </div>
              <Link to={`/orders/${order.id}`} className="track-order-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/restaurants" className="browse-restaurants">
            Browse Restaurants
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;