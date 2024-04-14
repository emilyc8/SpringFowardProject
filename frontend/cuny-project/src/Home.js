import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Logo animation
    const animateLogo = () => {
      const logoSpans = document.querySelectorAll('.logo');

      logoSpans.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.add('active');
        }, (idx + 1) * 400);
      });

      setTimeout(() => {
        logoSpans.forEach((span, idx) => {
          setTimeout(() => {
            span.classList.remove('active');
            span.classList.add('fade');
          }, (idx + 1) * 50);
        });
      }, 2000);

      setTimeout(() => {
        const intro = document.querySelector('.intro');
        if (intro) {
          intro.style.top = '-100vh';
        }
      }, 2300);
    };

    animateLogo();
  }, []);
// click handling
  const handleStudentClick = () => {
    navigate('/student');
  };

  const handleStaffClick = () => {
    navigate('/staff');
  };
// button creation 
  return (
    <div>
      <div className="intro">
        <h1 className="logo-header">
          <span className="logo">[ CUNY</span> <span className="logo">Connect ]</span>
        </h1>
      </div>
      <header>
        <h4 className="choose-text">Choose your account type</h4>
        <button onClick={handleStudentClick} className="student-button">STUDENT</button>
        <button onClick={handleStaffClick} className="staff-button">FACULTY & STAFF</button>
      </header>
    </div>
  );
};

export default Home;
