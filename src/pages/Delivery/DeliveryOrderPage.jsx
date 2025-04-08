// src/pages/delivery/OrderDelivery.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Delivery/DeliveryOrderPage.css';

const OrderDelivery = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deliveryIssue, setDeliveryIssue] = useState('');
  const [cannotDeliver, setCannotDeliver] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrderDetails = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data based on orderId
        const mockOrder = {
          id: orderId,
          restaurant: {
            name: 'Pizza Paradise',
            address: '123 Main St, Anytown',
            phone: '(555) 123-4567',
            instructions: 'Enter through the side door and ask for Mike.'
          },
          customer: {
            name: 'John Doe',
            address: '456 Oak Ave, Anytown, Apt 2B',
            phone: '(555) 987-6543',
            instructions: 'Please leave at door. Code for building: 4321'
          },
          items: [
            { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
            { name: 'Garlic Bread', quantity: 1, price: 4.99 },
            { name: 'Soda', quantity: 2, price: 1.99 }
          ],
          status: 'Assigned',
          totalAmount: 34.95,
          deliveryFee: 4.50,
          estimatedPickupTime: '12:30 PM',
          estimatedDeliveryTime: '1:00 PM'
        };
        
        setOrder(mockOrder);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);
  
  // Steps in the delivery process
  const steps = [
    { id: 1, title: 'Head to Restaurant', status: currentStep >= 1 ? 'active' : 'pending' },
    { id: 2, title: 'Arrived at Restaurant', status: currentStep >= 2 ? 'active' : 'pending' },
    { id: 3, title: 'Order Picked Up', status: currentStep >= 3 ? 'active' : 'pending' },
    { id: 4, title: 'On the Way', status: currentStep >= 4 ? 'active' : 'pending' },
    { id: 5, title: 'Delivered', status: currentStep >= 5 ? 'active' : 'pending' }
  ];
  
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      
      // In a real app, make API call to update order status
      console.log(`Updating order ${orderId} to step ${currentStep + 1}`);
      
      // If completed, redirect to dashboard after delay
      if (currentStep + 1 === steps.length) {
        setTimeout(() => {
          navigate('/Delivery/dashboard');
        }, 3000);
      }
    }
  };
  
  const handleCannotDeliver = () => {
    setIsConfirmModalOpen(true);
  };
  
  const confirmCannotDeliver = () => {
    // In a real app, make API call to report delivery issue
    console.log(`Cannot deliver order ${orderId}. Reason: ${deliveryIssue}`);
    setCannotDeliver(true);
    setIsConfirmModalOpen(false);
    
    // Redirect to dashboard after delay
    setTimeout(() => {
      navigate('/Delivery/dashboard');
    }, 3000);
  };
  
  const cancelCannotDeliver = () => {
    setIsConfirmModalOpen(false);
    setDeliveryIssue('');
  };
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="delivery-loading-container">
          <p>Loading order details...</p>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!order) {
    return (
      <>
        <Navbar />
        <div className="order-not-found">
          <h2>Order Not Found</h2>
          <p>The order you're looking for doesn't exist or has been reassigned.</p>
          <button 
            className="return-button"
            onClick={() => navigate('/Delivery/dashboard')}
          >
            Return to Dashboard
          </button>
        </div>
        <Footer />
      </>
    );
  }
  
  if (cannotDeliver) {
    return (
      <>
        <Navbar />
        <div className="delivery-issue-container">
          <div className="delivery-issue-message">
            <h2>Delivery Issue Reported</h2>
            <p>Your report has been submitted. A support agent will contact you shortly.</p>
            <p>Returning to dashboard...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="order-delivery-container">
        <div className="order-delivery-header">
          <h1>Delivery in Progress</h1>
          <p>Order ID: {order.id}</p>
        </div>
        
        <div className="order-progress">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`progress-step ${step.status === 'active' ? 'active' : ''}`}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>
        
        <div className="delivery-info-container">
          <div className="delivery-info-card">
            <h3>Restaurant Information</h3>
            <div className="info-content">
              <p><strong>Name:</strong> {order.restaurant.name}</p>
              <p><strong>Address:</strong> {order.restaurant.address}</p>
              <p><strong>Phone:</strong> {order.restaurant.phone}</p>
              <p><strong>Special Instructions:</strong> {order.restaurant.instructions}</p>
              <p><strong>Estimated Pickup:</strong> {order.estimatedPickupTime}</p>
            </div>
          </div>
          
          <div className="delivery-info-card">
            <h3>Customer Information</h3>
            <div className="info-content">
              <p><strong>Name:</strong> {order.customer.name}</p>
              <p><strong>Address:</strong> {order.customer.address}</p>
              <p><strong>Phone:</strong> {order.customer.phone}</p>
              <p><strong>Delivery Instructions:</strong> {order.customer.instructions}</p>
              <p><strong>Estimated Delivery:</strong> {order.estimatedDeliveryTime}</p>
            </div>
          </div>
        </div>
        
        <div className="order-details-section">
          <h3>Order Details</h3>
          <div className="order-items-list">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-info">
                  <span className="item-quantity">{item.quantity}x</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(order.totalAmount + order.deliveryFee).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="delivery-actions">
          {currentStep < steps.length ? (
            <button 
              className="action-button primary"
              onClick={handleNextStep}
            >
              {currentStep === 1 ? 'Arrived at Restaurant' :
               currentStep === 2 ? 'Order Picked Up' :
               currentStep === 3 ? 'On the Way to Customer' :
               'Order Delivered'}
            </button>
          ) : (
            <button 
              className="action-button complete"
              disabled
            >
              Delivery Completed
            </button>
          )}
          
          {currentStep < steps.length && (
            <button 
              className="action-button secondary"
              onClick={handleCannotDeliver}
            >
              Cannot Deliver
            </button>
          )}
        </div>
        
        {isConfirmModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Cannot Deliver Order</h3>
              <p>Please provide a reason why this order cannot be delivered:</p>
              <select
                value={deliveryIssue}
                onChange={(e) => setDeliveryIssue(e.target.value)}
                className="issue-select"
              >
                <option value="">Select a reason</option>
                <option value="restaurant_closed">Restaurant is closed</option>
                <option value="order_not_ready">Order is not ready</option>
                <option value="cannot_find_restaurant">Cannot find restaurant</option>
                <option value="cannot_find_customer">Cannot find customer location</option>
                <option value="customer_unavailable">Customer is unavailable</option>
                <option value="vehicle_issue">Vehicle/Transportation issue</option>
                <option value="unsafe_conditions">Unsafe delivery conditions</option>
                <option value="other">Other reason</option>
              </select>
              
              <div className="modal-actions">
                <button 
                  className="modal-button primary"
                  onClick={confirmCannotDeliver}
                  disabled={!deliveryIssue}
                >
                  Confirm
                </button>
                <button 
                  className="modal-button secondary"
                  onClick={cancelCannotDeliver}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderDelivery;