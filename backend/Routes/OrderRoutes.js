const express = require("express");
const Order = require("../models/OrderModel"); // Import Order model
const router = express.Router();

// *POST*: Save Order (when the user confirms their order)
router.post("/orderData", async (req, res) => {
  const { email, order_data, order_date } = req.body;

  // Validate required fields
  if (!email || !order_data || !order_date) {
    return res.status(400).json({ error: "All fields (email, order_data, order_date) are required" });
  }

  try {
    // Add order date as the first entry in order_data
    const data = [{ Order_date: order_date }, ...order_data];

    // Check if the user already has an order in the database
    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // If no existing order, create a new one
      await Order.create({ email, order_data: [data] });
    } else {
      // If an order exists, update it by appending the new data
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: data } }
      );
    }

    // Respond with success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// *POST*: Fetch User's Order Data
router.post("/myorderData", async (req, res) => {
  const { email } = req.body;

  // Validate required field
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Fetch order data for the user
    const myData = await Order.findOne({ email });

    if (!myData) {
      return res.status(404).json({ error: "No orders found for this email" });
    }

    // Respond with the order data
    res.status(200).json({ orderData: myData });
  } catch (error) {
    console.error("Error fetching order data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;