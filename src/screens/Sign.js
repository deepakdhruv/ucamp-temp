import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Sign.css';  // Import the CSS file

function Sign() {
  const [Credentials, SetCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Credentials.name,
          email: Credentials.email,
          password: Credentials.password,
          location: Credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        console.log(json.message)
        alert(json.message);
      } else {
        //userName
        localStorage.setItem("userEmail", Credentials.email);
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userName", Credentials.name);

        navigate("/");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const onChange = (e) => {
    SetCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="sign-form-container">
        <form onSubmit={HandleSubmit}>
          <h2>Create Account</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={Credentials.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={Credentials.email}
              onChange={onChange}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={Credentials.password}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={Credentials.geolocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/login" className="btn btn-danger">Already a User</Link>
        </form>
      </div>
    </>
  );
}

export default Sign;
