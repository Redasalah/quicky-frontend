// src/components/DeliveryNavbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/DeliveryNavbar.css';

const DeliveryNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="delivery-navbar">
      <div className="navbar-container">
        <Link to="/delivery/dashboard" className="navbar-logo">
          UberDontEat <span className="delivery-badge">Delivery</span>
        </Link>
        
        <div className="navbar-mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={`burger-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
        
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/delivery/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/delivery/available-orders" className="navbar-link">
              Available Orders
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/delivery/history" className="navbar-link">
              Delivery History
            </Link>
          </li>
          <li className="navbar-item">
            <div className="navbar-profile">
              <span className="navbar-username">{user?.name || 'Delivery Partner'}</span>
              <button className="navbar-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DeliveryNavbar;