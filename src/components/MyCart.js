import React, { useMemo, useState } from 'react';

import { UseCart, UseDispatchCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./cart.css";

function MyCart() {
  const cart = UseCart() || []; // Fallback to an empty array
  const dispatch = UseDispatchCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      alert('User email not found. Please log in again.');
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/api/orders/orderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: cart,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to place the order');
      }

      dispatch({ type: 'DROP' }); // Clear cart on success
      alert('Order placed successfully!');
      navigate('/myOrder'); // Redirect to a thank-you page
    } catch (error) {
      console.error('Checkout Error:', error.message);
      alert(`Error during checkout: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


  const handleRemove = (id) => {
    const item = cart.find((item) => item.id === id || item._id === id);
    if (item?.qty > 1) {
      dispatch({ type: "DECREASE_QTY", id });
    } else {
      dispatch({ type: "REMOVE", id });
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch({ type: "CLEAR" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>My Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center mt-4">
            <h5>Your cart is empty!</h5>
            <p>Add some delicious food to your cart.</p>
          </div>
        ) : (
          <div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Food Name</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id || item._id || index}>
                      <td>{index + 1}</td>
                      <td>{item.name} ({item.size === "half" ? "Half" : "Full"})</td>
                      <td>{item.size}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.price * item.qty}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemove(item.id || item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-end mt-3">
              <h5>
                Grand Total: ₹
                {cart.reduce(
                  (total, item) => total + item.price * item.qty,
                  0
                )}
              </h5>
              <button className="btn btn-warning mt-2" onClick={handleClearCart}>
                Clear Cart
              </button>
              <button
                className="btn btn-success mt-2 ms-3"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                 {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyCart;

