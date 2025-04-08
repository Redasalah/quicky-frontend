// src/pages/Dashboard.jsx
import React from 'react';

import Footer from '../components/Footer';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // This is placeholder data - in a real app, this would come from API
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'CUSTOMER'
  };

  const recentOrders = [
    {
      id: '1001',
      restaurant: 'Pizza Palace',
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

  const favoriteRestaurants = [
    {
      id: '101',
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.8
    },
    {
      id: '102',
      name: 'Burger Heaven',
      cuisine: 'American',
      rating: 4.6
    },
    {
      id: '103',
      name: 'Sushi World',
      cuisine: 'Japanese',
      rating: 4.9
    }
  ];

  return (
    <>
    
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {userInfo.name}!</h1>
          <p>Here's what's happening with your account</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card orders-card">
            <h2 className="card-title">Recent Orders</h2>
            {recentOrders.length > 0 ? (
              <div className="order-list">
                {recentOrders.map(order => (
                  <div key={order.id} className="order-item">
                    <div className="order-details">
                      <h3>{order.restaurant}</h3>
                      <p className="order-date">{order.date}</p>
                    </div>
                    <div className="order-status">
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      <p className="order-total">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">You haven't placed any orders yet.</p>
            )}
            <button className="view-all-btn">View All Orders</button>
          </div>

          <div className="dashboard-card favorites-card">
            <h2 className="card-title">Favorite Restaurants</h2>
            {favoriteRestaurants.length > 0 ? (
              <div className="favorites-list">
                {favoriteRestaurants.map(restaurant => (
                  <div key={restaurant.id} className="favorite-item">
                    <div className="restaurant-details">
                      <h3>{restaurant.name}</h3>
                      <p>{restaurant.cuisine}</p>
                    </div>
                    <div className="restaurant-rating">
                      <span className="rating-badge">★ {restaurant.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">You don't have any favorite restaurants yet.</p>
            )}
            <button className="view-all-btn">Browse Restaurants</button>
          </div>
        </div>
      </div>


      
      <Footer />
    </>
  );
};

export default Dashboard;