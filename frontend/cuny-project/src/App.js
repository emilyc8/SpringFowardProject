import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
// MAKE SURE YOU DO npm install react-router-dom in your console if errors
import StudentLogin from './StudentLogin';
import StaffLogin from './StaffLogin';
import Home from './Home';

// routes, add more reroutes here if needed - this is using react router dom so make sure its installed
const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<StudentLogin />} />
          <Route path="/staff" element={<StaffLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
