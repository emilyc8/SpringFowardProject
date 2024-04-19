import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdditionalInformation.css'; 

function AdditionalInformation() {
  const [major, setMajor] = useState('');
  const [school, setSchool] = useState('queens'); // default value
  const [degree, setDegree] = useState('');
  const [skills, setSkills] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      major,
      school,
      degree,
      skills,
    });
 //  for when we wanna connect the pages navigate('/student/studentHome');
  };

  const handleSkillChange = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setSkills([...skills, e.target.value]);
      e.target.value = ''; 
    }
  };

  return (
    <div className="additional-info-container">
      <h2 className="info-heading">Additional Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
        <p className="input-label">YOUR MAJOR</p>
          <input
            type="text"
            placeholder="ENTER MAJOR"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </div>
        <div className="input-group">
        <p className="input-label">SELECT YOUR CUNY SCHOOL</p>
          <select 
            value={school} 
            onChange={(e) => setSchool(e.target.value)}
            className="select-style"
          >
            <option value="borough">Borough of Manhattan Community College</option>
<option value="bronx">Bronx Community College</option>
<option value="guttman">Guttman Community College</option>
<option value="hostos">Hostos Community College</option>
<option value="kingsborough">Kingsborough Community College</option>
<option value="laguardia">LaGuardia Community College</option>
<option value="queensborough">Queensborough Community College</option>
<option value="baruch">Baruch College, CUNY</option>
<option value="brooklyn">Brooklyn College, CUNY</option>
<option value="hunter">Hunter College, CUNY</option>
<option value="johnjay">John Jay College of Criminal Justice</option>
<option value="lehman">Lehman College, CUNY</option>
<option value="medgar">Medgar Evers College, CUNY</option>
<option value="citytech">New York City College of Technology</option>
<option value="queens">Queens College, CUNY</option>
<option value="ccny">The City College of New York, CUNY</option>
<option value="statenisland">The College of Staten Island, CUNY</option>
<option value="york">York College, CUNY</option>
          </select>
        </div>
        <div className="input-group">
        <p className="input-label">DEGREE WORKING TOWARDS</p>
          <select 
            value={degree} 
            onChange={(e) => setDegree(e.target.value)}
            className="select-style"
          >
            <option value="" disabled>SELECT DEGREE TYPE</option>
          <option value="associates">Associate's Degree</option>
          <option value="bachelors">Bachelor's Degree</option>
          <option value="masters">Master's Degree</option>
          <option value="doctorate">Doctorate</option>
          <option value="none">None</option>
          <option value="certificate">Certificate</option>
          </select>
        </div>
        <div className="input-group">
        <p className="input-label">ADD SKILLS</p>
          <input
            type="text"
            placeholder="ENTER SKILL"
            onKeyDown={handleSkillChange}
          />
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill">{skill}</span>
            ))}
          </div>
        </div>
        <button type="submit" className="done-button">Done</button>
      </form>
    </div>
  );
}

export default AdditionalInformation;
