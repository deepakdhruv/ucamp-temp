import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousal from '../components/Carousal';
import "./Home.css";

function Home() {
  const [search, setSearch] = useState('');
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setFoodItem(data[0]);
        setFoodCat(data[1]);
        setLoading(false);
      } else {
        console.error("Error fetching data:", data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <Carousal />

      <div className="container py-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading delicious food options...</p>
          </div>
        ) : (
          foodCat?.map((category) => (
            <div className="row mb-5" key={category._id}>
              <div className="col-12">
                {/* Category Name Header */}
                <h3 className="category-header">{category.CategoryName}</h3>
                <p className="category-description">
                  {category.Description}
                </p>
              </div>
              <div className="food-items-container">
                {foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <div key={item._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={item} options={item.options[0]} />
                    </div>
                  ))}
                {foodItem.filter(
                  (item) =>
                    item.CategoryName === category.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                ).length === 0 && (
                  <div className="col-12 text-center py-4 no-items-message">
                    <p>No items found in this category.</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
