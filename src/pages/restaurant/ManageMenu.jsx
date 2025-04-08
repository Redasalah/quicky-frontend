// src/pages/restaurant/ManageMenu.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/restaurant/ManageMenu.css';

// Mock menu categories and items
const mockMenuCategories = ['Pizzas', 'Pasta', 'Sides', 'Beverages'];

const mockMenuItems = [
  {
    id: 'p1',
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce, mozzarella, fresh basil, salt, and olive oil',
    price: 12.99,
    category: 'Pizzas',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    available: true,
    popular: true
  },
  {
    id: 'p2',
    name: 'Pepperoni',
    description: 'Classic pizza topped with tomato sauce, mozzarella, and pepperoni slices',
    price: 14.99,
    category: 'Pizzas',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
    available: true,
    popular: true
  },
  {
    id: 'pa1',
    name: 'Spaghetti Bolognese',
    description: 'Spaghetti served with a rich meat sauce',
    price: 13.99,
    category: 'Pasta',
    imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0',
    available: true,
    popular: true
  },
  {
    id: 's1',
    name: 'Garlic Bread',
    description: 'Crispy bread with garlic butter and herbs',
    price: 4.99,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c',
    available: true,
    popular: true
  }
];

const ManageMenu = () => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: 'Pizzas',
    imageUrl: '',
    available: true,
    popular: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch data from API
    const fetchMenuItems = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setMenuItems(mockMenuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuItems();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleAddItem = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.price || !formData.description) {
      alert('Please fill out all required fields');
      return;
    }
    
    // In a real app, this would be an API call
    const newItem = {
      ...formData,
      id: isEditing ? formData.id : `item-${Date.now()}`, // Generate a unique ID for new items
      price: parseFloat(formData.price)
    };
    
    if (isEditing) {
      // Update existing item
      setMenuItems(prevItems => 
        prevItems.map(item => item.id === newItem.id ? newItem : item)
      );
    } else {
      // Add new item
      setMenuItems(prevItems => [...prevItems, newItem]);
    }
    
    // Reset form
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      category: 'Pizzas',
      imageUrl: '',
      available: true,
      popular: false
    });
    
    setIsEditing(false);
    setShowForm(false);
  };
  
  const handleEditItem = (item) => {
    setFormData({
      ...item,
      price: item.price.toString()
    });
    setIsEditing(true);
    setShowForm(true);
  };
  
  const handleDeleteItem = (id) => {
    // In a real app, this would be an API call
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };
  
  const handleToggleAvailability = (id) => {
    // In a real app, this would be an API call
    setMenuItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };
  
  const filterItemsByCategory = (items, category) => {
    if (category === 'All') {
      return items;
    }
    return items.filter(item => item.category === category);
  };
  
  if (loading) {
    return <div className="loading-container">Loading menu...</div>;
  }
  
  const filteredItems = filterItemsByCategory(menuItems, activeCategory);
  
  return (
    <div className="restaurant-dashboard-container">
      <div className="restaurant-sidebar">
        <div className="restaurant-profile">
          <h3>Restaurant Dashboard</h3>
          <p>Welcome, {user?.name || 'Restaurant Manager'}</p>
        </div>
        <nav className="restaurant-nav">
          <Link to="/restaurant-dashboard" className="nav-item">Dashboard</Link>
          <Link to="/restaurant/menu" className="nav-item active">Manage Menu</Link>
          <Link to="/restaurant/orders" className="nav-item">Process Orders</Link>
          <Link to="/restaurant/profile" className="nav-item">Restaurant Profile</Link>
          <Link to="/restaurant/reports" className="nav-item">Reports</Link>
        </nav>
      </div>
      
      <div className="restaurant-main-content">
        <div className="dashboard-header">
          <h1>Manage Menu</h1>
          <button 
            className="add-item-button"
            onClick={() => {
              setIsEditing(false);
              setShowForm(!showForm);
              if (isEditing) {
                setFormData({
                  id: '',
                  name: '',
                  description: '',
                  price: '',
                  category: 'Pizzas',
                  imageUrl: '',
                  available: true,
                  popular: false
                });
              }
            }}
          >
            {showForm ? 'Cancel' : 'Add New Item'}
          </button>
        </div>
        
        {showForm && (
          <div className="menu-item-form-container">
            <h2>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
            <form onSubmit={handleAddItem} className="menu-item-form">
              <div className="form-group">
                <label htmlFor="name">Item Name*</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description*</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price*</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="category">Category*</label>
                  <select 
                    id="category" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange}
                    required
                  >
                    {mockMenuCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input 
                  type="text" 
                  id="imageUrl" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-row checkbox-row">
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="available" 
                    name="available" 
                    checked={formData.available} 
                    onChange={handleInputChange}
                  />
                  <label htmlFor="available">Available</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="popular" 
                    name="popular" 
                    checked={formData.popular} 
                    onChange={handleInputChange}
                  />
                  <label htmlFor="popular">Popular</label>
                </div>
              </div>
              
              <div className="form-actions">
                <button
                  type="button" 
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setFormData({
                      id: '',
                      name: '',
                      description: '',
                      price: '',
                      category: 'Pizzas',
                      imageUrl: '',
                      available: true,
                      popular: false
                    });
                  }}
                >Cancel</button>


              <button type="submit" className="save-button">
                  {isEditing ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="menu-category-tabs">
          <button 
            className={activeCategory === 'All' ? 'active' : ''} 
            onClick={() => setActiveCategory('All')}
          >
            All
          </button>
          {mockMenuCategories.map(category => (
            <button 
              key={category} 
              className={activeCategory === category ? 'active' : ''} 
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="menu-items-grid">
          {filteredItems.length === 0 ? (
            <p className="no-items-message">No menu items found in this category.</p>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className={`menu-item-card ${!item.available ? 'unavailable' : ''}`}>
                <div className="menu-item-image">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                </div>
                
                <div className="menu-item-details">
                  <div className="menu-item-header">
                    <h3>{item.name}</h3>
                    <div className="menu-item-badges">
                      {item.popular && <span className="popular-badge">Popular</span>}
                      <span className={`availability-badge ${item.available ? 'available' : 'unavailable'}`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="menu-item-description">{item.description}</p>
                  <p className="menu-item-price">${item.price.toFixed(2)}</p>
                  <p className="menu-item-category">Category: {item.category}</p>
                  
                  <div className="menu-item-actions">
                    <button 
                      className="edit-button"
                      onClick={() => handleEditItem(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="toggle-button"
                      onClick={() => handleToggleAvailability(item.id)}
                    >
                      {item.available ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;