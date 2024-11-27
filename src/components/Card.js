import React, { useState } from 'react';
import { UseDispatchCart } from './ContextReducer'; // Assuming cart context
import './styles.css';

function Card(props) {
  const image = props.foodItem.img;
  const options = props.options;
  const foodName = props.foodItem.name;

  const dispatch = UseDispatchCart();
  const priceOptions = Object.keys(options || {});
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(priceOptions[0] || "");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(""); // Notification state

  const calculateTotalPrice = () => {
    const pricePerUnit = options[selectedOption] || 0;
    return pricePerUnit * selectedQuantity;
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem("authToken")) {
      // Show notification instead of alert if not logged in
      setNotification("Please log in to add items to the cart.");
      
      // Hide notification after 4 seconds
      setTimeout(() => {
        setNotification("");
      }, 4000);  // Changed to 4000ms (4 seconds)

      return; // Don't allow adding if not logged in
    }

    if (selectedOption === "" || !options[selectedOption]) {
      return; // Don't proceed if no valid option is selected
    }

    setIsLoading(true);
    try {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: foodName,
        price: options[selectedOption],
        qty: selectedQuantity,
        size: selectedOption,
      });

      // Show notification when item is successfully added to cart
      setNotification("Item added to cart!");
      
      // Hide notification after 4 seconds
      setTimeout(() => {
        setNotification("");
      }, 4000);  // Changed to 4000ms (4 seconds)
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem', maxHeight: '360px', margin: 'auto' }}>
        <img 
          src={image} 
          className="card-img-top" 
          alt={foodName} 
          style={{ height: "120px", objectFit: "cover" }} 
        />
        <div className="card-body">
          <h5 className="card-title">{foodName}</h5>
          <div className="container w-100">
            {/* Quantity Selector */}
            <select 
              className="m-2 h-100 bg-success"
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
              value={selectedQuantity}
              aria-label="Select Quantity"
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            {/* Option Selector */}
            <select 
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setSelectedOption(e.target.value)}
              value={selectedOption}
              aria-label="Select Option"
              disabled={priceOptions.length === 0}
            >
              {priceOptions.length === 0 ? (
                <option value="">No options available</option>
              ) : (
                priceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} - ₹{options[option]}
                  </option>
                ))
              )}
            </select>

            {/* Total Price Display */}
            <div className="d-inline h-100 fs-5">
              <br />
              Total Price: ₹{calculateTotalPrice()}
            </div>
          </div>

          <hr />
          <button 
            className="btn btn-success justify-center ms-2" 
            onClick={handleAddToCart}
            disabled={isLoading || priceOptions.length === 0}
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>

          {/* Notification Display */}
          {notification && (
            <div className="notification" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px', borderRadius: '5px' }}>
              {notification}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
