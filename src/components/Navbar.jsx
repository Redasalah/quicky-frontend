// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from './CartIcon';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // This is a placeholder for user data
  // In a real app, this would come from your auth context/state
  const user = {
    name: 'John Doe',
    role: 'CUSTOMER'
  };
  
  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log('Logging out...');
    
    // Navigate to home page
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/restaurants" className="navbar-link">
              Restaurants
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/orders" className="navbar-link">
              My Orders
            </Link>
          </li>
          <li className="navbar-item">
            <CartIcon />
          </li>
          <li className="navbar-item">
            <div className="navbar-profile">
              <span className="navbar-username">{user.name}</span>
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

export default Navbar;