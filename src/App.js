import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import RestaurantListing from './pages/RestaurantListing';
import RestaurantDetail from './pages/RestaurantDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';

// Delivery Pages
import DeliveryDashboard from './pages/Delivery/DeliveryDashboard';
import AvailableOrders from './pages/Delivery/AvailableOrders';
import DeliveryOrderPage from './pages/Delivery/DeliveryOrderPage';

// Restaurant Pages
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import ManageMenu from './pages/restaurant/ManageMenu';
import OrderProcessing from './pages/restaurant/OrderProcessing';


// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import RestaurantSettings from './pages/restaurant/RestaurantSettings';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes - Customer */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/restaurants" 
                element={
                  <ProtectedRoute>
                    <RestaurantListing />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/restaurants/:id" 
                element={
                  <ProtectedRoute>
                    <RestaurantDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Cart />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/order-confirmation" 
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected routes - Delivery */}
              <Route 
                path="/Delivery/dashboard" 
                element={
                  <ProtectedRoute>
                    <DeliveryDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/Delivery/available-orders" 
                element={
                  <ProtectedRoute>
                    <AvailableOrders />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/Delivery/order/:orderId" 
                element={
                  <ProtectedRoute>
                    <DeliveryOrderPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected routes - Restaurant */}
              <Route 
                path="/Restaurant/dashboard" 
                element={
                  <ProtectedRoute>
                    <RestaurantDashboard />
                  </ProtectedRoute>
                } 
              /><Route 
              path="/Restaurant/menu" 
              element={
                <ProtectedRoute>
                  <ManageMenu />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/Restaurant/orders" 
              element={
                <ProtectedRoute>
                  <OrderProcessing />
                </ProtectedRoute>
              } 
            />
                <Route 
              path="/Restaurant/settings" 
              element={
                <ProtectedRoute>
                  <RestaurantSettings />
                </ProtectedRoute>
              } 
            />
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;