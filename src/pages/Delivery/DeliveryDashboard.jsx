// src/pages/delivery/DeliveryDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import '../../styles/Delivery/DeliveryDashboard.css';

const DeliveryDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    completedToday: 0,
    earnings: 0,
    rating: 0
  });
  
  const [recentDeliveries, setRecentDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch delivery data
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          totalDeliveries: 156,
          completedToday: 5,
          earnings: 487.50,
          rating: 4.8
        });
        
        setRecentDeliveries([
          {
            id: 'DEL-1001',
            date: '2023-08-20',
            restaurant: 'Pizza Paradise',
            customer: 'John Doe',
            address: '123 Main St, Anytown',
            amount: 24.99,
            status: 'Completed'
          },
          {
            id: 'DEL-1002',
            date: '2023-08-20',
            restaurant: 'Burger Heaven',
            customer: 'Jane Smith',
            address: '456 Oak Ave, Anytown',
            amount: 32.50,
            status: 'Completed'
          },
          {
            id: 'DEL-1003',
            date: '2023-08-19',
            restaurant: 'Sushi World',
            customer: 'Mike Johnson',
            address: '789 Pine St, Anytown',
            amount: 45.75,
            status: 'Completed'
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
      
        <div className="delivery-loading-container">
          <p>Loading dashboard data...</p>
        </div>
       
      </>
    );
  }

  return (
    <>
    
      <div className="delivery-dashboard-container">
        <div className="delivery-dashboard-header">
          <h1>Delivery Dashboard</h1>
          <p>Welcome back, {user?.name || 'Delivery Partner'}</p>
        </div>

        <div className="delivery-stats-container">
          <div className="delivery-stat-card">
            <h3>Total Deliveries</h3>
            <p className="stat-value">{stats.totalDeliveries}</p>
          </div>
          <div className="delivery-stat-card">
            <h3>Completed Today</h3>
            <p className="stat-value">{stats.completedToday}</p>
          </div>
          <div className="delivery-stat-card">
            <h3>Total Earnings</h3>
            <p className="stat-value">${stats.earnings.toFixed(2)}</p>
          </div>
          <div className="delivery-stat-card">
            <h3>Your Rating</h3>
            <p className="stat-value">★ {stats.rating.toFixed(1)}</p>
          </div>
        </div>

        <div className="delivery-actions-container">
          <Link to="/delivery/available-orders" className="delivery-action-button primary">
            View Available Orders
          </Link>
          <Link to="/delivery/order-history" className="delivery-action-button secondary">
            Delivery History
          </Link>
        </div>

        <div className="recent-deliveries-container">
          <h2>Recent Deliveries</h2>
          
          {recentDeliveries.length > 0 ? (
            <div className="recent-deliveries-list">
              {recentDeliveries.map(delivery => (
                <div key={delivery.id} className="delivery-item">
                  <div className="delivery-item-header">
                    <h3>{delivery.restaurant}</h3>
                    <span className="delivery-status">{delivery.status}</span>
                  </div>
                  <div className="delivery-item-details">
                    <p><strong>Order ID:</strong> {delivery.id}</p>
                    <p><strong>Date:</strong> {delivery.date}</p>
                    <p><strong>Customer:</strong> {delivery.customer}</p>
                    <p><strong>Address:</strong> {delivery.address}</p>
                    <p><strong>Amount:</strong> ${delivery.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-deliveries-message">You haven't made any deliveries yet.</p>
          )}
        </div>
      </div>
    
    </>
  );
};

export default DeliveryDashboard;