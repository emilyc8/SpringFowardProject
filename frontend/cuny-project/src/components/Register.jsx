import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';
import axios from 'axios'

function Register() {
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    type: 'Student'
  });

  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', formData);
      console.log('Registration successful:', response.data);
      localStorage.setItem('userId', response.data.userId);  
      navigate('/additionalInformation');
      
    } catch (error) {
      if (error.response) {
        console.error('Registration error:', error.response.data);
        setError(error.response.data.message);  // Display error message from server
      } else if (error.request) {
        console.error('Network error:', error.request);
        setError('Network error, please try again');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setError('Error during registration');
      }
    }
  };


  return (
    <div className="register-container">
      <h2 className="welcome-text1">Create An Account</h2>
      <h3 className="sign-in1">Begin making connections today</h3>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" name='firstName' placeholder="First Name"  value={formData.firstName} onChange={handleChange} required/>
        </div>
        <div className="input-group">
          <input type="text" name='lastName' placeholder="Last Name"  value={formData.lastName} onChange={handleChange} required/>
        </div>
        <div className="input-group">
        <p className="input-label">EMAIL</p>
          <input type="email" name='email' placeholder="Enter Email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div className="input-group">
        <p className="input-label">PASSWORD</p>
          <input type="password" name='password' placeholder="Password"  value={formData.password} onChange={handleChange} required/>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className="submit-button1">Next</button>
      </form>
      <div className="account-text1">
        Already have an account?
        <div className="navigation-buttons">
          <Link to="/staffLogin"><button className="navigation-button1">Staff?</button></Link>
          <Link to="/studentLogin"><button className="navigation-button2">Student?</button></Link>
        </div>
        </div>
    </div>
  );
}

export default Register;
