// src/pages/restaurant/RestaurantDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Footer from '../../components/Footer';
import '../../styles/restaurant/RestaurantDashboard.css';

const RestaurantDashboard = () => {
    const { user } = useAuth();
    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [stats, setStats] = useState({
      totalOrders: 0,
      todayOrders: 0,
      revenue: 0,
      averageRating: 0
    });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Simulate API call to fetch restaurant dashboard data
      const fetchDashboardData = async () => {
        try {
          // In a real app, these would be API calls
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock data
          setStats({
            totalOrders: 248,
            todayOrders: 12,
            revenue: 3250.75,
            averageRating: 4.7
          });
          
          setActiveOrders([
            {
              id: 'ORD-3001',
              time: '10:30 AM',
              customer: 'John Doe',
              items: [
                { name: 'Margherita Pizza', quantity: 2 },
                { name: 'Garlic Bread', quantity: 1 }
              ],
              total: 30.98,
              status: 'Preparing'
            },
            {
              id: 'ORD-3002',
              time: '10:45 AM',
              customer: 'Jane Smith',
              items: [
                { name: 'Pepperoni Pizza', quantity: 1 },
                { name: 'Caesar Salad', quantity: 1 },
                { name: 'Soda', quantity: 2 }
              ],
              total: 28.45,
              status: 'Received'
            },
            {
              id: 'ORD-3003',
              time: '11:15 AM',
              customer: 'Mike Brown',
              items: [
                { name: 'Vegetarian Pizza', quantity: 1 },
                { name: 'Cheesy Garlic Bread', quantity: 1 }
              ],
              total: 22.99,
              status: 'Ready for Pickup'
            }
          ]);
          
          setCompletedOrders([
            {
              id: 'ORD-2998',
              time: '9:20 AM',
              customer: 'Alex Wilson',
              items: [
                { name: 'Hawaiian Pizza', quantity: 1 },
                { name: 'Fries', quantity: 1 }
              ],
              total: 19.50,
              status: 'Delivered'
            },
            {
              id: 'ORD-2999',
              time: '9:45 AM',
              customer: 'Taylor Johnson',
              items: [
                { name: 'Meat Lovers Pizza', quantity: 1 },
                { name: 'Wings', quantity: 1 }
              ],
              total: 25.75,
              status: 'Delivered'
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
  
    const handleUpdateStatus = (orderId, newStatus) => {
      // Update order status (in a real app, this would be an API call)
      setActiveOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus } 
            : order
        )
      );
      
      // If order is completed, move it to completed orders
      if (newStatus === 'Delivered' || newStatus === 'Picked Up') {
        const completedOrder = activeOrders.find(order => order.id === orderId);
        if (completedOrder) {
          setCompletedOrders([{ ...completedOrder, status: newStatus }, ...completedOrders]);
          setActiveOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        }
      }
    };
  
    if (loading) {
      return (
        <>
          <div className="restaurant-loading-container">
            <p>Loading dashboard data...</p>
          </div>
          <Footer />
        </>
      );
    }
  
    return (
      <>
       
        <div className="restaurant-dashboard-container">
          <div className="restaurant-dashboard-header">
            <h1>Restaurant Dashboard</h1>
            <p>Welcome back, {user?.name || 'Restaurant Partner'}</p>
          </div>
  
          <div className="restaurant-stats-container">
            <div className="restaurant-stat-card">
              <h3>Total Orders</h3>
              <p className="stat-value">{stats.totalOrders}</p>
            </div>
            <div className="restaurant-stat-card">
              <h3>Today's Orders</h3>
              <p className="stat-value">{stats.todayOrders}</p>
            </div>
            <div className="restaurant-stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-value">${stats.revenue.toFixed(2)}</p>
            </div>
            <div className="restaurant-stat-card">
              <h3>Average Rating</h3>
              <p className="stat-value">★ {stats.averageRating.toFixed(1)}</p>
            </div>
          </div>
  
          <div className="restaurant-actions-container">
            <Link to="/Restaurant/menu" className="restaurant-action-button primary">
              Manage Menu
            </Link>
            <Link to="/Restaurant/settings" className="restaurant-action-button secondary">
              Restaurant Settings
            </Link>
          </div>
  
          <div className="active-orders-container">
            <h2>Active Orders</h2>
            
            {activeOrders.length > 0 ? (
              <div className="orders-list">
                {activeOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div>
                        <h3>{order.id}</h3>
                        <p>{order.time} - {order.customer}</p>
                      </div>
                      <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-quantity">{item.quantity}x</span>
                          <span className="item-name">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-card-footer">
                      <p className="order-total">Total: ${order.total.toFixed(2)}</p>
                      <div className="order-actions">
                        {order.status === 'Received' && (
                          <button 
                            onClick={() => handleUpdateStatus(order.id, 'Preparing')}
                            className="status-update-button"
                          >
                            Start Preparing
                          </button>
                        )}
                        
                        {order.status === 'Preparing' && (
                          <button 
                            onClick={() => handleUpdateStatus(order.id, 'Ready for Pickup')}
                            className="status-update-button"
                          >
                            Mark as Ready
                          </button>
                        )}
                        
                        {order.status === 'Ready for Pickup' && (
                          <button 
                            onClick={() => handleUpdateStatus(order.id, 'Picked Up')}
                            className="status-update-button"
                          >
                            Mark as Picked Up
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders-message">No active orders at the moment.</p>
            )}
          </div>
  
          <div className="completed-orders-container">
            <h2>Completed Orders</h2>
            
            {completedOrders.length > 0 ? (
              <div className="orders-list">
                {completedOrders.map(order => (
                  <div key={order.id} className="order-card completed">
                    <div className="order-card-header">
                      <div>
                        <h3>{order.id}</h3>
                        <p>{order.time} - {order.customer}</p>
                      </div>
                      <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-quantity">{item.quantity}x</span>
                          <span className="item-name">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-card-footer">
                      <p className="order-total">Total: ${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-orders-message">No completed orders for today.</p>
            )}
            
            <div className="view-all-button-container">
              <Link to="/Restaurant/orders/history" className="view-all-button">
                View All Orders
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
  export default RestaurantDashboard;