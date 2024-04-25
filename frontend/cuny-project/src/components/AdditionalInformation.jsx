import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdditionalInformation.css'; 
import axios from 'axios';

function AdditionalInformation() {

  const schools = [
    "Baruch College",
    "Borough of Manhattan Community College",
    "Brooklyn College",
    "Bronx Community College",
    "Guttman Community College",
    "Hostos Community College",
    "Hunter College",
    "John Jay College of Criminal Justice",
    "Kingsborough Community College",
    "LaGuardia Community College",
    "Lehman College",
    "Medgar Evers College",
    "New York City College of Technology",
    "Queens College",
    "Queensborough Community College",
    "The City College of New York",
    "The College of Staten Island",
    "York College, CUNY"
  ]

  const degrees = [
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
    "None",
    "Certificate"
  ]
  const [details, setDetails] = useState({
    school:'',
    major:'',
    degree:'',
    skills:[],
    experience:[{
      company: '',
      position: '',
      startDate: '',
      endDate: ''
    }]
  })

  const [skills, setSkills] = useState('')
  const [experience, setExperiences]= useState('')

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({
        ...prev,
        [name]: value
    }));
  };

  const handleSkillAdd = () =>{
    if (skills){
        setDetails(prev => ({
            ...prev,
            skills: [...prev.skills, skills]
        }));
        setSkills('');
    }
  };

  const handleRemoveSkill = index => {
    setDetails(prevDetails => ({
      ...prevDetails,
      skills: prevDetails.skills.filter((_, i) => i !== index)
    }));
  };
  const handleExperienceChange = (index, field, value) => {
    setDetails(prevDetails => {
        const newExperience = [...prevDetails.experience];
        newExperience[index][field] = value;
        return {
            ...prevDetails,
            experience: newExperience
        };
    });
  };

  const addExperience = () => {
    setDetails(prevDetails => ({
        ...prevDetails,
        experience: [
            ...prevDetails.experience,
            {
                company: '',
                position: '',
                startDate: '',
                endDate: ''
            }
        ]
    }));
  };


  const userId = localStorage.getItem('userId');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors
    try {
      const response = await axios.post('http://127.0.0.1:5000/details', {
        userId,
        Details: details
      });
      console.log('Additional Information saved:', response.data);
      navigate('/studentLogin')
    } catch (error) {
      if (error.response) {
        console.error('Saving error:', error.response.data);
        setError(error.response.data.message);  // Display error message from server
      } else if (error.request) {
        console.error('Network error:', error.request);
        setError('Network error, please try again');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setError('Error during save');
      }
    }
  };

  return (
    <div className="additional-info-container">
      <h2 className="info-heading">Additional Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group" id='major'>
          <p className="input-label">YOUR MAJOR</p>
          <input type="text" name='major' placeholder="ENTER MAJOR" value={setDetails.major} onChange={handleChange}/>
        </div>
        <div className="input-group">
          <p className="input-label">SELECT YOUR CUNY SCHOOL</p>
          <select name='school' value={setDetails.school}onChange={handleChange} required>
              <option value="">Select your school</option>
                          {schools.map((school, index) => (
                              <option key={index} value={school}>{school}</option>
                          ))}
          </select>
        </div>
        <div className="input-group">
          <p className="input-label">DEGREE WORKING TOWARDS</p>
          <select name='degree' value={setDetails.degree}onChange={handleChange} required>
              <option value="">Select your degree</option>
                          {degrees.map((degree, index) => (
                              <option key={index} value={degree}>{degree}</option>
                          ))}
          </select>
        </div>
        <div className="input-group-skills">
          <p className="input-label">ADD SKILLS</p>
          <input type="text" className="skills"name='skills' value={skills} onChange={(e) => setSkills(e.target.value)}></input>
          <button type="button" className="add" onClick={handleSkillAdd}>Add Skill</button>
          <ul className='skill-list'>
              {details.skills.map((skill, index) => (
              <li className="skill" key={index}>
                {skill}
                <button type="button" className="remove" onClick={() => handleRemoveSkill(index)}>X</button>
              </li>
              ))}
          </ul>
        </div>
        <div className="experience">
            {details.experience.map((exp, index) => (
                  <div key={index} className='fields'>
                    <p className='input-label'>ADD EXPERIENCE</p>
                      <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          placeholder="Company"
                      />
                      <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                          placeholder="Position"
                      />
                      <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                          placeholder="Start Date MM/DD/YYYY"
                      />
                      <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                          placeholder="End Date MM/DD/YYYY"
                      />
                  </div>
              ))}
              <button onClick={addExperience}>Add Experience</button>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className="done-button">Done</button>
      </form>
    </div>
  );
}

export default AdditionalInformation;
