// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { register, error, setError } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CUSTOMER'
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  // Clear any existing errors when component mounts
  React.useEffect(() => {
    setError(null);
    return () => setError(null);
  }, [setError]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
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
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
    
    // Prepare registration data
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };
    
    // Attempt registration
    const result = await register(registrationData);
    
    if (result.success) {
      // Navigate to login page with success message
      navigate('/login', { 
        state: { 
          message: 'Registration successful. Please log in.' 
        } 
      });
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2 className="auth-title">Create an Account</h2>
        
        {/* Global error message */}
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={formErrors.firstName ? 'input-error' : ''}
            />
            {formErrors.firstName && (
              <span className="error-message">{formErrors.firstName}</span>
            )}
          </div>
          
          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={formErrors.lastName ? 'input-error' : ''}
            />
            {formErrors.lastName && (
              <span className="error-message">{formErrors.lastName}</span>
            )}
          </div>
          
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'input-error' : ''}
            />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>
          
          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'input-error' : ''}
            />
            {formErrors.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
          </div>
          
          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formErrors.confirmPassword ? 'input-error' : ''}
            />
            {formErrors.confirmPassword && (
              <span className="error-message">{formErrors.confirmPassword}</span>
            )}
          </div>
          
          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="RESTAURANT_STAFF">Restaurant Staff</option>
              <option value="DELIVERY_PERSONNEL">Delivery Personnel</option>
            </select>
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className="auth-button"
          >
            Create Account
          </button>
        </form>
        
        {/* Redirect to Login */}
        <div className="auth-redirect">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;