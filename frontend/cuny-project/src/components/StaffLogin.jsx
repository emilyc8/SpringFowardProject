import React, { useState } from 'react';
import '../styles/StaffLogin.css';
import { Link } from 'react-router-dom';


function StaffLogin() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);
  };

  return (
    <div className="login-container">
      <h2 className="welcome-text">Welcome Back</h2>
      <h3 className="sign-in"> Sign in to your account </h3>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group1">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-group2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <Link to="/staff/staffProfile"><button type="submit" className="submit-button">Sign In</button></Link>
        <p className="account-text">
        Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}
// register reroute isnt created yet, if you click create one itll lead you back to home
export default StaffLogin;