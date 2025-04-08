// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CartIcon from './CartIcon';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use the authentication context
  const { user, logout, hasRole } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation configurations for different roles
  const navConfigs = {
    CUSTOMER: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Restaurants', path: '/restaurants' },
      { label: 'My Orders', path: '/orders' },
      { component: <CartIcon key="cart" /> }
    ],
    RESTAURANT_STAFF: [
      { label: 'Dashboard', path: '/Restaurant/dashboard' },
      { label: 'Manage Menu', path: '/Restaurant/menu' },
      { label: 'Process Orders', path: '/Restaurant/orders' }
    ],
    DELIVERY_PERSONNEL: [
      { label: 'Dashboard', path: '/Delivery/dashboard' },
      { label: 'Available Orders', path: '/Delivery/available-orders' },
      { label: 'Order History', path: '/Delivery/order-history' }
    ]
  };

  // Render navigation items based on user role
  const renderNavItems = () => {
    // If no user, show login/signup
    if (!user) {
      return [
        { label: 'Login', path: '/login' },
        { label: 'Sign Up', path: '/signup' }
      ].map(item => (
        <li key={item.path} className="navbar-item">
          <Link to={item.path} className="navbar-link">{item.label}</Link>
        </li>
      ));
    }

    // Get nav items for user's role, default to empty array
    const roleNavItems = navConfigs[user.role] || [];

    return roleNavItems.map(item => {
      // If item is a component (like CartIcon), return it directly
      if (item.component) return item;

      // Otherwise, render a navigation link
      return (
        <li key={item.path} className="navbar-item">
          <Link to={item.path} className="navbar-link">
            {item.label}
          </Link>
        </li>
      );
    });
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          UberDontEat
        </Link>
        
        <div className="navbar-mobile-toggle" onClick={toggleMenu}>
          <span className={`burger-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
        
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {renderNavItems()}
          
          {user && (
            <li className="navbar-item">
              <div className="navbar-profile">
                <span className="navbar-username">{user.name}</span>
                <button 
                  className="navbar-logout" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;