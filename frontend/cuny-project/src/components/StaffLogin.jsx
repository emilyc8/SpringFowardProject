import React, { useState } from 'react';
import '../styles/StaffLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function StaffLogin() {
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    try {
        const response = await axios.post('http://127.0.0.1:5000/stafflogin', credentials);
        localStorage.setItem('userId', response.data.userId); 
        console.log('Login successful:', response.data);
        navigate('/staff/staffProfile');

    } catch (error) {
        if (error.response) {
        // Handle error messages from the server
        console.error('Login error:', error.response.data);
        setError(error.response.data.message);
        } else {
        // Handle network errors or other unexpected errors
        console.error('Error during login:', error.message);
        setError('Error during login, please try again');
        }
    }
  };

  return (
    <div className="login-container">
      <h2 className="welcome-text">Welcome Back</h2>
      <h3 className="sign-in"> Sign in to your account </h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group1">
          <input
            type="text"
            name='email'
            value={credentials.email}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-group2">
          <input
            type="password"
            name='password'
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="error-message">{error && <div style={{ color: 'red' }}>{error}</div>}</div>
        <button type="submit" className="submit-button">Sign In</button>
        <p className="account-text">
        Don’t have an account? <Link to="/staffRegister">Create one</Link>
        </p>
      </form>
    </div>
  );
}
// register reroute isnt created yet, if you click create one itll lead you back to home
export default StaffLogin;
