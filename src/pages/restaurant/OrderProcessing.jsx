// src/pages/restaurant/OrderProcessing.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/restaurant/OrderProcessing.css';

// Mock order data
const mockOrders = [
  {
    id: '1001',
    customer: 'John Doe',
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
      { name: 'Garlic Bread', quantity: 1, price: 4.99 }
    ],
    total: 30.97,
    status: 'PENDING',
    orderTime: '2023-10-15T14:30:00',
    deliveryAddress: '123 Main St, Anytown',
    phoneNumber: '555-123-4567'
  },
  {
    id: '1002',
    customer: 'Jane Smith',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
      { name: 'Caesar Salad', quantity: 1, price: 6.99 }
    ],
    total: 21.98,
    status: 'CONFIRMED',
    orderTime: '2023-10-15T14:20:00',
    deliveryAddress: '456 Oak St, Anytown',
    phoneNumber: '555-987-6543'
  },
  {
    id: '1003',
    customer: 'Bob Johnson',
    items: [
      { name: 'Hawaiian Pizza', quantity: 1, price: 15.99 },
      { name: 'Soda', quantity: 2, price: 2.49 }
    ],
    total: 20.97,
    status: 'PREPARING',
    orderTime: '2023-10-15T14:10:00',
    deliveryAddress: '789 Pine St, Anytown',
    phoneNumber: '555-456-7890'
  },
  {
    id: '1004',
    customer: 'Alice Brown',
    items: [
      { name: 'Vegetarian Pizza', quantity: 1, price: 13.99 },
      { name: 'Fettuccine Alfredo', quantity: 1, price: 12.99 }
    ],
    total: 26.98,
    status: 'READY_FOR_DELIVERY',
    orderTime: '2023-10-15T14:00:00',
    deliveryAddress: '101 Elm St, Anytown',
    phoneNumber: '555-234-5678'
  },
  {
    id: '1005',
    customer: 'Charlie Wilson',
    items: [
      { name: 'Spaghetti Bolognese', quantity: 2, price: 13.99 },
      { name: 'Garlic Bread', quantity: 1, price: 4.99 },
      { name: 'Iced Tea', quantity: 2, price: 2.99 }
    ],
    total: 38.95,
    status: 'OUT_FOR_DELIVERY',
    orderTime: '2023-10-15T13:45:00',
    deliveryAddress: '202 Maple St, Anytown',
    phoneNumber: '555-876-5432'
  },
  {
    id: '1006',
    customer: 'David Miller',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
      { name: 'Soda', quantity: 1, price: 2.49 }
    ],
    total: 17.48,
    status: 'DELIVERED',
    orderTime: '2023-10-15T13:30:00',
    deliveryAddress: '303 Cedar St, Anytown',
    phoneNumber: '555-345-6789'
  }
];

const OrderProcessing = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  useEffect(() => {
    // In a real app, fetch data from API
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, this would be an API call
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  
  const filterOrdersByStatus = (orders, status) => {
    if (status === 'ALL') {
      return orders;
    }
    return orders.filter(order => order.status === status);
  };
  
  if (loading) {
    return <div className="loading-container">Loading orders...</div>;
  }
  
  const filteredOrders = filterOrdersByStatus(orders, filterStatus);
  
  return (
    <div className="restaurant-dashboard-container">
      <div className="restaurant-sidebar">
        <div className="restaurant-profile">
          <h3>Restaurant Dashboard</h3>
          <p>Welcome, {user?.name || 'Restaurant Manager'}</p>
        </div>
        <nav className="restaurant-nav">
          <Link to="/restaurant-dashboard" className="nav-item">Dashboard</Link>
          <Link to="/restaurant/menu" className="nav-item">Manage Menu</Link>
          <Link to="/restaurant/orders" className="nav-item active">Process Orders</Link>
          <Link to="/restaurant/profile" className="nav-item">Restaurant Profile</Link>
          <Link to="/restaurant/reports" className="nav-item">Reports</Link>
        </nav>
      </div>
      
      <div className="restaurant-main-content">
        <div className="dashboard-header">
          <h1>Process Orders</h1>
          <p>Manage and update customer orders</p>
        </div>
        
        <div className="order-status-tabs">
          <button 
            className={filterStatus === 'ALL' ? 'active' : ''} 
            onClick={() => setFilterStatus('ALL')}
          >
            All Orders
          </button>
          <button 
            className={filterStatus === 'PENDING' ? 'active' : ''} 
            onClick={() => setFilterStatus('PENDING')}
          >
            Pending
          </button>
          <button 
            className={filterStatus === 'CONFIRMED' ? 'active' : ''} 
            onClick={() => setFilterStatus('CONFIRMED')}
          >
            Confirmed
          </button>
          <button 
            className={filterStatus === 'PREPARING' ? 'active' : ''} 
            onClick={() => setFilterStatus('PREPARING')}
          >
            Preparing
          </button>
          <button 
            className={filterStatus === 'READY_FOR_DELIVERY' ? 'active' : ''} 
            onClick={() => setFilterStatus('READY_FOR_DELIVERY')}
          >
            Ready
          </button>
          <button 
            className={filterStatus === 'OUT_FOR_DELIVERY' ? 'active' : ''} 
            onClick={() => setFilterStatus('OUT_FOR_DELIVERY')}
          >
            Out for Delivery
          </button>
          <button 
            className={filterStatus === 'DELIVERED' ? 'active' : ''} 
            onClick={() => setFilterStatus('DELIVERED')}
          >
            Delivered
          </button>
        </div>
        
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <p className="no-orders-message">No orders found with the selected status.</p>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id-section">
                    <h3>Order #{order.id}</h3>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="order-time">
                    {new Date(order.orderTime).toLocaleString()}
                  </div>
                </div>
                
                <div className="order-content">
                  <div className="customer-details">
                    <h4>Customer Details</h4>
                    <p><strong>Name:</strong> {order.customer}</p>
                    <p><strong>Phone:</strong> {order.phoneNumber}</p>
                    <p><strong>Address:</strong> {order.deliveryAddress}</p>
                  </div>
                  
                  <div className="order-items-details">
                    <h4>Order Items</h4>
                    <ul className="order-items-list">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          <span className="item-name">{item.quantity}x {item.name}</span>
                          <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="order-total">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-actions">
                  {order.status === 'PENDING' && (
                    <button 
                      className="action-button accept"
                      onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                    >
                      Accept Order
                    </button>
                  )}
                  
                  {order.status === 'CONFIRMED' && (
                    <button 
                      className="action-button prepare"
                      onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                    >
                      Start Preparing
                    </button>
                  )}
                  
                  {order.status === 'PREPARING' && (
                    <button 
                      className="action-button ready"
                      onClick={() => updateOrderStatus(order.id, 'READY_FOR_DELIVERY')}
                    >
                      Ready for Pickup
                    </button>
                  )}
                  
                  {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
                    <button 
                      className="action-button cancel"
                      onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                    >
                      Cancel Order
                    </button>
                  )}
                  
                  <button className="action-button print">Print Order</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;