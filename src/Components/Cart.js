import React from 'react';

const Cart = ({ cartItems, onClearCart }) => {
  const cartCount = cartItems.length;
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Cart Count: {cartCount}</p>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <button onClick={onClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
