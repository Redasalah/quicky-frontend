// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        
        if (userData) {
          // Parse the user data
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          // In a real app, you would verify the token with the API
          // For example:
          // const response = await api.get('/auth/me');
          // setUser(response.data);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear any invalid data
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, make API call to authenticate
      // const response = await api.post('/auth/login', { email, password });
      
      // For now, simulate successful login with mock data
      // You can change the role to test different dashboards
      const mockUser = {
        id: '123',
        name: 'John Doe',
        email,
        role: email.includes('delivery') ? 'DELIVERY_PERSONNEL' : (email.includes('restaurant') ? 'RESTAURANT_STAFF' : 'CUSTOMER'),
        token: 'mock-jwt-token'
      };
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to login. Please try again.' 
      };
    }
  };
  
  // Register function
  const register = async (userData) => {
    try {
      // In a real app, make API call to register user
      // const response = await api.post('/auth/register', userData);
      
      console.log('Registering user:', userData);
      
      // For now, simulate successful registration
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to register. Please try again.' 
      };
    }
  };
  
  // Logout function
  const logout = () => {
    // Remove user data from localStorage
    localStorage.removeItem('user');
    
    // Clear user state
    setUser(null);
  };
  
  // Check if user has a specific role
  const hasRole = (role) => {
    return user?.role === role;
  };
  
  // Check if user is authenticated
  const isAuthenticated = !!user;
  
  // Get appropriate dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!user) return '/dashboard';
    
    switch(user.role) {
      case 'DELIVERY_PERSONNEL':
        return '/Delivery/dashboard';
      case 'RESTAURANT_STAFF':
        return '/restaurant/dashboard';
      case 'CUSTOMER':
      default:
        return '/dashboard';
    }
  };
  
  // Create the context value object
  const authContextValue = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
    getDashboardUrl
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;