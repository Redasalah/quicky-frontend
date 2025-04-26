// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, setError } = useAuth();
  
  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // State for form validation errors
  const [formErrors, setFormErrors] = useState({});
  
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  
  // Check for registration success message
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || ''
  );
  
  // Clear success/error messages when component unmounts
  useEffect(() => {
    return () => {
      setError(null);
      // Clear location state to prevent message persisting
      if (location.state?.message) {
        navigate(location.pathname, { replace: true });
      }
    };
  }, [setError, navigate, location]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset any previous errors
    setError(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    // Attempt login
    const result = await login(
      formData.email, 
      formData.password
    );
    
    // Stop loading
    setIsLoading(false);
    
    // Handle login result
    if (result.success) {
      // Redirect to dashboard or home page
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2 className="auth-title">Welcome Back</h2>
        
        {/* Success message */}
        {successMessage && (
          <div className="success-banner">
            {successMessage}
          </div>
        )}
        
        {/* Global error message */}
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'input-error' : ''}
              placeholder="Enter your email"
            />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>
          
          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'input-error' : ''}
              placeholder="Enter your password"
            />
            {formErrors.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
          </div>
          
          {/* Forgot Password Link */}
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        {/* Redirect to Sign Up */}
        <div className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
        
        {/* Terms and Conditions */}
        <div className="auth-terms">
          <p>
            By continuing, you agree to our 
            <Link to="/terms"> Terms of Service </Link> 
            and 
            <Link to="/privacy"> Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;