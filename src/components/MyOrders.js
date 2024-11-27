import React, { useEffect, useState } from "react";
import './MyOrders.css';
import Navbar from '../components/Navbar';
import { jsPDF } from "jspdf";

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // Holds all orders
  const [currentOrder, setCurrentOrder] = useState(null); // Current (most recent) order
  const [showPastOrders, setShowPastOrders] = useState(false); // Toggle to show past orders
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [customerDetails, setCustomerDetails] = useState({
    //name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
  });

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const token = localStorage.getItem("authToken"); // Get auth token from localStorage
      const email = localStorage.getItem("userEmail"); // Get email from localStorage

      if (!email) {
        throw new Error("User email not found");
      }

      const response = await fetch("http://localhost:5000/api/orders/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Assuming Bearer token for authentication
        },
        body: JSON.stringify({ email }), // Send email to fetch user's orders
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend Response:", data); // Debugging log

      if (data.orderData && data.orderData.order_data.length > 0) {
        const allOrders = data.orderData.order_data; // Get all orders
        const reversedOrders = allOrders.reverse(); // Reverse the array to have the most recent order first
        setOrders(reversedOrders); // Set reversed orders to state
        setCurrentOrder(reversedOrders[0]); // Set the most recent order as the current order
      } else {
        setError("You have no orders yet.");
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleShowPastOrders = () => {
    setShowPastOrders(!showPastOrders); // Toggle visibility of past orders
  };

  // Function to calculate total amount for the order
  const calculateTotalAmount = (order) => {
    return order.slice(1).reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };

  // Function to generate and download the bill as a PDF file
  const downloadBill = (order) => {
    const orderDate = order[0].Order_date;
    const orderDetails = order.slice(1).map(item => `${item.name} - ${item.price} x ${item.qty} (${item.size})`).join("\n");
    const totalAmount = calculateTotalAmount(order);

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add the header (uCampus)
    doc.setFontSize(18);
    doc.text("uCampus - Order Bill", 14, 20);

    // Add customer details
    doc.setFontSize(12);
   // doc.text(`Customer Name: ${customerDetails.name}`, 14, 30);
    doc.text(`Customer Email: ${customerDetails.email}`, 14, 35);
    doc.text(`Order Date: ${orderDate}`, 14, 40);

    // Add the order items
    doc.text("Order Details:", 14, 50);
    let yPosition = 55;
    order.slice(1).forEach(item => {
      doc.text(`${item.name} - ${item.price} x ${item.qty} (${item.size})`, 14, yPosition);
      yPosition += 6; // Move to the next line for each item
    });

    // Add total amount
    doc.text(`Total: Rs. ${totalAmount}`, 14, yPosition + 10);

    // Add footer (thank you message)
    const footerText = "Thank you for shopping with uCampus!\nFor any queries, contact us at dhruvgrover533@gmail.com";
    doc.text(footerText, 14, yPosition + 20);

    // Download the PDF
    doc.save(`Order_${orderDate.replace(/[^a-zA-Z0-9]/g, "_")}_Bill.pdf`);
  };

  return (
    <div>
      <Navbar />
      <div className="my-orders">
        {loading && <p>Loading your orders...</p>} {/* Show loading message while fetching */}
        {error && <p>{error}</p>} {/* Show error message if any */}

        {/* Display the current (most recent) order */}
        {currentOrder ? (
          <div className="current-order">
            <h3>Current Order</h3>
            <p><strong>Order Date:</strong> {currentOrder[0].Order_date}</p>
            <ul>
              {currentOrder.slice(1).map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price} x {item.qty} ({item.size})
                </li>
              ))}
            </ul>
            {/* Display total amount */}
            <p><strong>Total: </strong>Rs. {calculateTotalAmount(currentOrder)}</p>
            {/* Button to download bill as PDF for the current order */}
            <button onClick={() => downloadBill(currentOrder)}>Download Bill</button>
          </div>
        ) : (
          <p>No current order found</p>
        )}

        {/* Button to toggle past orders */}
        <button onClick={handleShowPastOrders}>
          {showPastOrders ? "Hide Past Orders" : "Show Past Orders"}
        </button>

        {/* Display past orders if toggled */}
        {showPastOrders && orders.length > 1 && (
          <div className="past-orders">
            <h3>Past Orders</h3>
            {orders.slice(1).map((order, index) => (
              <div key={index} className="order">
                <p><strong>Order Date:</strong> {order[0].Order_date}</p>
                <ul>
                  {order.slice(1).map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.name} - {item.price} x {item.qty} ({item.size})
                    </li>
                  ))}
                </ul>
                {/* Display total amount for past orders */}
                <p><strong>Total: </strong>Rs. {calculateTotalAmount(order)}</p>
                {/* Button to download bill as PDF for the past order */}
                <button onClick={() => downloadBill(order)}>Download Bill</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
