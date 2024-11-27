const express = require("express");
const app = express();
const port = 5000;
const mongodb = require("./db");
const orderRoutes = require('./Routes/OrderRoutes');
const cors = require("cors");

// Enable CORS



// Configure CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from frontend
  methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow 'Authorization' header
}));
// Connect to MongoDB
mongodb();

// Middleware to parse JSON bodies
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Mount Routes
app.use("/api/orders",orderRoutes);
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); // Use backticks for template literals
});