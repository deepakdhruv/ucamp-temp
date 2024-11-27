import React from 'react';
import './about.css'; // Assuming you want custom styles for the About page
import Navbar from './Navbar';
function About() {
  return (
   
    <div className="about-container">
   <Navbar/>    <div className="about-header text-center my-5">
        <h1>About UCampus</h1>
        <p>Your go-to platform for campus food delivery</p>
      </div>
      
      <div className="about-content">
        <h3>What is UCampus?</h3>
        <p>
          UCampus is an online platform designed to simplify food ordering for students and staff on campus. 
          With UCampus, you can easily browse food options, place orders, and have them delivered directly to your location.
        </p>

        <h3>Our Mission</h3>
        <p>
          Our mission is to provide a seamless and efficient way for campus communities to access great food, 
          all while supporting local campus eateries and promoting convenience.
        </p>

        <h3>Our Team</h3>
        <p>
          UCampus was founded by a passionate team of tech enthusiasts and food lovers who believe that good food 
          should be easy to get, no matter where you are. We're committed to creating a platform that works for you.
        </p>
      </div>
    </div>
  );
}

export default About;
