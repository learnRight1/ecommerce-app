import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

const products = [
  {
    id: "1",
    name: "Laptop",
    price: 700,
    image: "/images/product1.jpg",
  },
  {
    id: "2",
    name: "Headphones",
    price: 50,
    image: "/images/product2.jpg",
  },
  {
    id: "3",
    name: "Smartphone",
    price: 500,
    image: "/images/product3.jpg",
  },
];

function Home({ addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>E-Commerce App</h1>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/cart">Cart ({cart.length})</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={<Cart cart={cart} removeFromCart={removeFromCart} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
