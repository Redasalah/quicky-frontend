// src/context/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const CartContext = createContext(null);

// Action types
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';

// Initial state
const initialState = {
  items: [],
  restaurant: null // To ensure items only come from one restaurant at a time
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.item.id);
      
      // If different restaurant, clear cart first
      if (state.restaurant && action.payload.restaurant && state.restaurant.id !== action.payload.restaurant.id) {
        return {
          items: [{ ...action.payload.item, quantity: 1 }],
          restaurant: action.payload.restaurant
        };
      }
      
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        return {
          ...state,
          items: updatedItems
        };
      } else {
        // Add new item with quantity 1
        return {
          ...state,
          items: [...state.items, { ...action.payload.item, quantity: 1 }],
          restaurant: state.restaurant || action.payload.restaurant
        };
      }
      
    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
      
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        // If cart becomes empty, reset restaurant
        restaurant: state.items.length === 1 ? null : state.restaurant
      };
      
    case CLEAR_CART:
      return initialState;
      
    default:
      return state;
  }
};

// Context provider
export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initial render
  const loadCartFromStorage = () => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : initialState;
    } catch (error) {
      console.error('Error loading cart from local storage:', error);
      return initialState;
    }
  };
  
  const [cart, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Calculate cart totals
  const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
  
  // Add item to cart
  const addItem = (item, restaurant) => {
    dispatch({
      type: ADD_ITEM,
      payload: { item, restaurant }
    });
  };
  
  // Update item quantity
  const updateQuantity = (id, quantity) => {
    // Ensure quantity is at least 1
    if (quantity < 1) return;
    
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { id, quantity }
    });
  };
  
  // Remove item from cart
  const removeItem = (id) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: { id }
    });
  };
  
  // Clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  
  // Create context value
  const cartContextValue = {
    items: cart.items,
    restaurant: cart.restaurant,
    subtotal,
    itemCount,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  };
  
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

export default CartContext;