import React, { useEffect, useState } from 'react';
import { UseCart, UseDispatchCart } from './ContextReducer';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
function Checkout() {
  
  const cart = UseCart(); // Fetch cart items
  const dispatch = UseDispatchCart(); // Dispatch actions
  const navigate = useNavigate();
  const user=localStorage.getItem("authToken");
  // const [user, setUser] = useState(null); // State to hold user info
  // useEffect(() => {
  //   // Check if user data exists in localStorage
  //   const storedToken = localStorage.getItem("authToken");
  //   if (storedToken) {
  //     try {
  //       const parsedUser = JSON.parse(storedToken);
  //       setUser(parsedUser); // Set user if JSON parsing is successful
  //     } catch (error) {
  //       console.error("Failed to parse authToken:", error);
  //     }
  //   } else {
  //     console.warn("authToken not found in localStorage.");
  //   }
  // }, []);

  // Function to generate bill as a PDF
  const generateBill = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.text("Order Summary", 10, y);
    y += 10;
    cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} (${item.size}) x ${item.qty} - ₹${item.price * item.qty}`, 10, y);
      y += 10;
    });

    const grandTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
    doc.text(`Grand Total: ₹${grandTotal}`, 10, y + 10);

    doc.save("bill.pdf"); // Download the PDF
  };

  // Function to handle order confirmation
  const handleConfirmOrder = async () => {
    if (!user) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const orderData = {
      userId: user.id, // Use user id from state
      items: cart, // The cart data you want to save
      totalAmount: cart.reduce((total, item) => total + item.price * item.qty, 0),
    };

    try {
      // Send POST request to backend API to save the order
      const response = await axios.post('/api/orders/save', orderData);
      console.log('Order saved:', response.data);

      // Optionally, clear the cart after confirming the order
      dispatch({ type: "CLEAR" });

      // Optionally, redirect to another page (like "My Orders" or home page)
      navigate('/Home');
    } catch (error) {
      navigate('/');
      console.error('Failed to save order:', error);
      //alert("Failed to confirm order. Please try again.");
    }
  };

  

  return (
    <div className="container mt-5">
      <Navbar/>
      <h2>Checkout</h2>
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
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.size}</td>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-end mt-3">
        <h5>
          Grand Total: ₹{cart.reduce((total, item) => total + item.price * item.qty, 0)}
        </h5>
        <button
          className="btn btn-warning mt-2"
          onClick={() => {
            generateBill();
            handleConfirmOrder();
          }}
        >
          Confirm Order & Download Bill
        </button>
      </div>
    </div>
  );
}

export default Checkout;
