import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({
      firstName,
      lastName,
      birthDate: `${birthMonth}/${birthDay}/${birthYear}`,
      email,
      password,
    });
    
    navigate('/AdditionalInformation'); 
  };


  return (
    <div className="register-container">
      <h2 className="welcome-text1">Create An Account</h2>
      <h3 className="sign-in1">Begin making connections today</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="input-group input-group-birthday">
          <input type="text" placeholder="MM" required value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} />
          <input type="text" placeholder="DD" required value={birthDay} onChange={(e) => setBirthDay(e.target.value)} />
          <input type="text" placeholder="YYYY" required value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="email" placeholder="Enter Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
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
