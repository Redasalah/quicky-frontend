// src/components/CartIcon.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartIcon.css';

const CartIcon = () => {
  const { itemCount } = useCart();
  
  return (
    <Link to="/checkout" className="cart-icon-wrapper">
      <div className="cart-icon">
        <i className="fas fa-shopping-cart"></i>
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount}</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;