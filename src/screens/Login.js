import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

function Login() {
  const [Credentials, SetCredentials] = useState({
    email: "",
    password: ""
  });
  let navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: Credentials.email, password: Credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(json.errors);
    } else {
      localStorage.setItem("userEmail", Credentials.email);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userName", Credentials.name);

      navigate("/");
    }
  };

  const onChange = (e) => {
    SetCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={Credentials.email} 
              onChange={onChange} 
              aria-describedby="emailHelp" 
              required 
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={Credentials.password} 
              onChange={onChange} 
              required 
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/createuser" className="btn btn-danger">I am a new User</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
