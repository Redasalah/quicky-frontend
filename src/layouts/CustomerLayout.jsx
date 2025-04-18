// src/layouts/CustomerLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar'; // <-- This is the only change
import Footer from '../components/Footer';

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;