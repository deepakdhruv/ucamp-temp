const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

// Middleware to validate user input
const validateUser = [
    body('email', "Please enter a valid Email").isEmail(),
    body('password', "Please enter a valid Password").isLength({ min: 5 }),
    body('name', "Please enter a valid Name").isLength({ min: 3 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Route to create a new user
router.post("/createuser", validateUser, async (req, res) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "Email already exists" 
            });
        }

        // Create a new user if email doesn't exist
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location
        });

        res.json({ success: true, message: "User created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


// Route to log in a user
router.post("/loginuser", async (req, res) => {
    let email = req.body.email;
    try {
        let useremail = await User.findOne({ email });
        if (!useremail) {
            return res.status(400).json({ errors: "Email does not exist..." });
        }

        if (req.body.password !== useremail.password) {
            return res.status(400).json({ errors: "Incorrect Password..." });
        }

        return res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

module.exports = router;
