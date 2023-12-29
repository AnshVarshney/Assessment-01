import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const Home = ({ onLogout }) => {
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice)
    );
  });

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleLogout = () => {
    navigate('/login');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div>
      <div>
        <h2>Welcome to the Shop!</h2>
        <Cart cartItems={cartItems} onClearCart={clearCart} />
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{`Price: $${product.price}`}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
