import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';
import '../../styles/create.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

function Create_Job(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        location: '',
        workplace: '',
        type: '',
        jobTitle: '',
        description: '',
        qualifications: '',
        salary: '',
        salaryType: '',
        responsibilities: '',
        skills: [],
        applicationType: '',
        postTime:  new Date().toISOString()
    });

    const [skills, setSkills] = useState('')
    const handleSkillAdd = () =>{
        if (skills){
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, skills]
            }));
            setSkills('');
        }
      };
    
      const handleRemoveSkill = index => {
        setFormData(prevformData => ({
          ...prevformData,
          skills: prevformData.skills.filter((_, i) => i !== index)
        }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post('http://127.0.0.1:5000/internshipsPost', {
                userId,
                formData
                });
            console.log('Internship posted:', response.data);
            navigate('/staff/staffInternships')
        } catch (error) {
            console.error('Error posting internship:', error);
            // Optionally handle error
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return(
        <form className="createPage" onSubmit={handleSubmit}>
            <div class="sticky topbar">
                <div className="logo1">
                    CUNY Connect
                </div>
            </div>
            <div className="create">
                <Link to="/staff/staffProfile"><button className='exit'>Exit</button></Link>
                <div className="basicInfo">
                    <h1>Basic Information</h1>
                    <div className="one">
                        <div className="company">
                            <p>Company: *</p>
                            <TextareaAutosize name="company" value={formData.company} onChange={handleChange} maxLength={40} placeholder='Company Name...' required/>
                        </div>
                        <div className="location">
                            <p>Location: *</p>
                            <TextareaAutosize name="location" value={formData.location} onChange={handleChange} maxLength={40} placeholder='Location of Company...'/>
                        </div>
                        <div className="workplace">
                            <p>Workplace: *</p>
                            <TextareaAutosize name="workplace" value={formData.workplace} onChange={handleChange} maxLength={40} placeholder='Eg. Remote, In-person, etc.'/>
                        </div>
                        <div className="type">
                            <p>Type: *</p>
                            <select name='type' value={formData.type} onChange={handleChange}>
                                <option className="hid"value=""disable selected hidden>Select type</option>
                                <option>Volunteer</option>
                                <option>Internship</option>
                                <option>Part-Time</option>
                                <option>Full-Time</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="jobInfo">
                    <h1>Job Details</h1>
                    <div className="jobTitle">
                        <p>Job Title: *</p>
                        <TextareaAutosize name="jobTitle" value={formData.jobTitle} onChange={handleChange} maxLength={40}/>
                    </div>
                    <div className="jobDescription">
                        <p>Description: *</p>
                        <TextareaAutosize name="description" value={formData.description} onChange={handleChange} maxLength={200}/>
                    </div>
                    <div className="jobQualifications">
                        <p>Qualifications: </p>
                        <TextareaAutosize name="qualifications" value={formData.qualifications} onChange={handleChange} maxLength={200}/>
                    </div>
                    <div className="salary">
                        <p>Salary:</p>
                        <input type='number' placeholder='Eg. 40,000$' name='salary' value={formData.salary} onChange={handleChange}></input> 
                        <select name='salaryType' value={formData.salaryType} onChange={handleChange}>
                            <option disable selected hidden>Select One</option>
                            <option>Hourly</option>
                            <option>Weekly</option>
                            <option>Bi-weekly</option>
                            <option>Yearly</option>
                        </select>
                    </div>
                    <div className="jobResponsibilities">
                        <p>Responsibilities: *</p>
                        <TextareaAutosize name="responsibilities" value={formData.responsibilities} onChange={handleChange} maxLength={200}/>
                    </div>
                    <div className="addSkills">
                        <p>Add keywords that will help your post reach the right students</p>
                        <TextareaAutosize name="skills" value={skills} onChange={(e) => setSkills(e.target.value)} className='skill' placeholder='Add'></TextareaAutosize>
                        <button type="button" className="add" onClick={handleSkillAdd}>Add Skill</button>
                        <ul className='skill-list'>
                            {formData.skills.map((skill, index) => (
                            <li className="skill" key={index}>
                                {skill}
                                <button type="button" className="remove" onClick={() => handleRemoveSkill(index)}>X</button>
                            </li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div className="applications">
                    <h1>Applications</h1>
                    <div className="reciveType">
                        <p>How would you like to recive applications?</p>
                        <select name='applicationType' value={formData.applicationType} onChange={handleChange}>
                            <option disable hidden>Select One</option> 
                            <option >Website</option> 
                            <option>External Site</option>
                        </select>
                    </div>
                </div>
                <button type= "submit" className='save'>Post</button>
            </div>
        </form>
    );
}

export default Create_Job;