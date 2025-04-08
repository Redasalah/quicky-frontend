// src/layouts/DeliveryLayout.jsx
import React from 'react';
import DeliveryNavbar from '../components/DeliveryNavbar';
import Footer from '../components/Footer';

const DeliveryLayout = ({ children }) => {
  return (
    <div className="delivery-layout">
      <DeliveryNavbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryLayout;