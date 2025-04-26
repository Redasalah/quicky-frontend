// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create axios instance with base config
const api = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  headers: {
    'Content-Type': 'application/json'
  }
});

// AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Implement token verification endpoint
      setIsAuthenticated(true);
      // Decode token to get user info
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/login', { email, password });
      
      // Store token and user info
      localStorage.setItem('token', response.data.token);
      
      // Set user details
      setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role
      });
      
      setIsAuthenticated(true);
      setLoading(false);
      
      return { success: true };
    } catch (err) {
      // Handle login errors
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      setLoading(false);
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/register', userData);
      
      // Registration successful
      setLoading(false);
      
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (err) {
      // Handle registration errors
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      setLoading(false);
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Context value
  const contextValue = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    setError // Allow clearing errors
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};