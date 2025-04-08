// src/layouts/RestaurantLayout.jsx
import React from 'react';
import RestaurantNavbar from '../components/RestaurantNavbar';
import Footer from '../components/Footer';

const RestaurantLayout = ({ children }) => {
  return (
    <div className="restaurant-layout">
      <RestaurantNavbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantLayout;