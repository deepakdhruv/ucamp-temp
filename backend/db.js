const mongoose = require("mongoose");

const mongourl = "mongodb+srv://dhruvgrover533:Deepak3168@cluster0.wkpl4.mongodb.net/foodDB";

const mongodb = async () => {
    try {
        // Connect to the database
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Fetch the data from both collections
        const foodItemsCollection = mongoose.connection.db.collection("FoodItems");
        const foodCategoriesCollection = mongoose.connection.db.collection("FoodCategory");

        // Get the data
        const foodItems = await foodItemsCollection.find({}).toArray();
        const foodCategories = await foodCategoriesCollection.find({}).toArray();

        // Set them globally
        global.FoodItems = foodItems;
        global.FoodCategory = foodCategories;

        // console.log(global.FoodItems);  // Check if FoodItems has the correct data
        // console.log(global.FoodCategory);  // Check if FoodCategory has the correct data

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};


module.exports = mongodb;
