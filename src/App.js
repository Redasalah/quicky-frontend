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
import RestaurantSettings from './pages/restaurant/RestaurantSettings';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';

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
                    <Navbar />
                    <Dashboard />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/restaurants" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <RestaurantListing />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/restaurants/:id" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <RestaurantDetail />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Checkout />
                    <Footer />
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
                    <Navbar />
                    <OrderConfirmation />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected routes - Delivery */}
              <Route 
                path="/Delivery/dashboard" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <DeliveryDashboard />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/Delivery/available-orders" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <AvailableOrders />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/Delivery/order/:orderId" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <DeliveryOrderPage />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected routes - Restaurant */}
              <Route 
                path="/Restaurant/dashboard" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <RestaurantDashboard />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/Restaurant/menu" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <ManageMenu />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/Restaurant/orders" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <OrderProcessing />
                    <Footer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/Restaurant/settings" 
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <RestaurantSettings />
                    <Footer />
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