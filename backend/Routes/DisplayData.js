const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // Log both FoodItems and FoodCategory to check if they are set
        console.log("FoodItems:", global.FoodItems);   // Should log array of food items
        console.log("FoodCategory:", global.FoodCategory); // Should log array of categories

        // Send both FoodItems and FoodCategory as a response
        if (global.FoodItems && global.FoodCategory) {
            res.send([global.FoodItems, global.FoodCategory]);
        } else {
            res.status(500).send("Data not found");
        }
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
