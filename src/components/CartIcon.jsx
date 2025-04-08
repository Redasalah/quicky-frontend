// src/components/CartIcon.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartIcon.css';

const CartIcon = () => {
  const { itemCount } = useCart();
  
  return (
    <div className="cart-icon-wrapper">
      <i className="fas fa-shopping-cart"></i>
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
      <span className="cart-text">Cart</span>
    </div>
  );
};

export default CartIcon;