// src/pages/RestaurantDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/RestaurantDetail.css';

// Mock data for a single restaurant
const mockRestaurantDetails = {
  id: '1',
  name: 'Pizza Paradise',
  cuisine: 'Italian',
  rating: 4.8,
  deliveryTime: '25-35 min',
  deliveryFee: 2.99,
  imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  priceRange: '$$',
  address: '123 Main St, Anytown, USA',
  hours: '10:00 AM - 10:00 PM',
  description: 'Pizza Paradise offers authentic Italian pizzas made with the freshest ingredients. Our dough is made fresh daily and we use only the finest cheeses and toppings.',
  menu: [
    {
      id: 'm1',
      category: 'Pizzas',
      items: [
        {
          id: 'p1',
          name: 'Margherita',
          description: 'Classic pizza with tomato sauce, mozzarella, fresh basil, salt, and olive oil',
          price: 12.99,
          imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: true
        },
        {
          id: 'p2',
          name: 'Pepperoni',
          description: 'Classic pizza topped with tomato sauce, mozzarella, and pepperoni slices',
          price: 14.99,
          imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: true
        },
        {
          id: 'p3',
          name: 'Vegetarian',
          description: 'Fresh vegetables including bell peppers, mushrooms, onions, and olives on tomato sauce with mozzarella',
          price: 13.99,
          imageUrl: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: false
        },
        {
          id: 'p4',
          name: 'Hawaiian',
          description: 'Ham and pineapple on tomato sauce with mozzarella cheese',
          price: 15.99,
          imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: false
        }
      ]
    },
    {
      id: 'm2',
      category: 'Pasta',
      items: [
        {
          id: 'pa1',
          name: 'Spaghetti Bolognese',
          description: 'Spaghetti served with a rich meat sauce',
          price: 13.99,
          imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: true
        },
        {
          id: 'pa2',
          name: 'Fettuccine Alfredo',
          description: 'Fettuccine pasta tossed with butter and parmesan cheese',
          price: 12.99,
          imageUrl: 'https://images.unsplash.com/photo-1645112222866-101a290c7f7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: false
        }
      ]
    },
    {
      id: 'm3',
      category: 'Sides',
      items: [
        {
          id: 's1',
          name: 'Garlic Bread',
          description: 'Crispy bread with garlic butter and herbs',
          price: 4.99,
          imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: true
        },
        {
          id: 's2',
          name: 'Caesar Salad',
          description: 'Fresh romaine lettuce with Caesar dressing, croutons and parmesan',
          price: 6.99,
          imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: false
        }
      ]
    },
    {
      id: 'm4',
      category: 'Beverages',
      items: [
        {
          id: 'b1',
          name: 'Soda',
          description: 'Coca-Cola, Diet Coke, Sprite, or Fanta',
          price: 2.49,
          imageUrl: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: false
        },
        {
          id: 'b2',
          name: 'Iced Tea',
          description: 'Freshly brewed iced tea, sweetened or unsweetened',
          price: 2.99,
          imageUrl: 'https://images.unsplash.com/photo-1499961524692-a5bdb6o74da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          popular: false
        }
      ]
    }
  ]
};

// Mock function to get restaurant by ID
const getRestaurantById = async (id) => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockRestaurantDetails;
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Use the cart context instead of local state
  const { items, addItem, subtotal, itemCount } = useCart();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const data = await getRestaurantById(id);
        setRestaurant(data);
        setActiveCategory(data.menu[0].id);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  // Handle adding items to cart using the context
  const handleAddToCart = (item) => {
    // Add restaurant info when adding an item
    const restaurantInfo = {
      id: restaurant.id,
      name: restaurant.name,
      imageUrl: restaurant.imageUrl
    };
    
    addItem(item, restaurantInfo);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <p>Loading restaurant details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!restaurant) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <h2>Restaurant Not Found</h2>
          <p>Sorry, the restaurant you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </>
    );
  }

  const activeCategoryItems = restaurant.menu.find(category => category.id === activeCategory)?.items || [];

  return (
    <>
      
      <div className="restaurant-detail-container">
        <div 
          className="restaurant-banner" 
          style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
        >
          <div className="restaurant-banner-content">
            <h1>{restaurant.name}</h1>
            <div className="restaurant-banner-meta">
              <span className="cuisine">{restaurant.cuisine}</span>
              <span className="rating">★ {restaurant.rating}</span>
              <span className="delivery-time">{restaurant.deliveryTime}</span>
              <span className="delivery-fee">${restaurant.deliveryFee.toFixed(2)} delivery</span>
            </div>
            <p className="restaurant-description">{restaurant.description}</p>
          </div>
        </div>

        <div className="restaurant-content">
          <div className="menu-sidebar">
            <h3>Menu</h3>
            <ul className="category-list">
              {restaurant.menu.map(category => (
                <li 
                  key={category.id}
                  className={activeCategory === category.id ? 'active' : ''}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.category}
                </li>
              ))}
            </ul>
            
            {items.length > 0 && (
              <div className="cart-summary">
                <h3>Your Order ({itemCount} items)</h3>
                <p className="cart-total">${subtotal.toFixed(2)}</p>
                <Link to="/checkout" className="checkout-button">
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>

          <div className="menu-content">
            <h2 className="category-title">
              {restaurant.menu.find(category => category.id === activeCategory)?.category}
            </h2>
            
            <div className="menu-items">
              {activeCategoryItems.map(item => (
                <div key={item.id} className="menu-item">
                  <div className="menu-item-info">
                    <h3>{item.name} {item.popular && <span className="popular-tag">Popular</span>}</h3>
                    <p className="menu-item-description">{item.description}</p>
                    <p className="menu-item-price">${item.price.toFixed(2)}</p>
                    <button 
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  {item.imageUrl && (
                    <div 
                      className="menu-item-image" 
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RestaurantDetail;