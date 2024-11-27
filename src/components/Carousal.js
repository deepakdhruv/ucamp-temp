import React, { useState } from "react";
import burgerimg from "./burger.png";
import momosimg from "./momos.jpg";
import pizzaimg from "./pizza.jpg";

function Carousal() {
  const [search, setSearch] = useState(""); // State for search input

  return (
    <div id="carouselExampleCaptions" className="carousel slide custom-carousel" data-bs-ride="carousel">
      <div className="carousel-inner">
        {/* First Item */}
        <div className="carousel-item active">
          <img src={burgerimg} className="d-block w-100" alt="Burger" />
          <div className="carousel-caption">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Second Item */}
        <div className="carousel-item">
          <img src={momosimg} className="d-block w-100" alt="Momos" />
          <div className="carousel-caption">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Third Item */}
        <div className="carousel-item">
          <img src={pizzaimg} className="d-block w-100" alt="Pizza" />
          <div className="carousel-caption">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousal;