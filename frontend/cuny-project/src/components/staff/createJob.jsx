import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';
import '../../styles/create.css'
import { Link } from "react-router-dom";

function Create_Job(){
    return(
        <div className="createPage">
            <div class="sticky topbar">
                <div className="logo">
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
                            <TextareaAutosize maxLength={40} placeholder='Company Name...' required/>
                        </div>
                        <div className="location">
                            <p>Location: *</p>
                            <TextareaAutosize maxLength={40} placeholder='Location of Company...'/>
                        </div>
                        <div className="workplace">
                            <p>Workplace: *</p>
                            <TextareaAutosize maxLength={40} placeholder='Eg. Remote, In-person, etc.'/>
                        </div>
                        <div className="type">
                            <p>Type: *</p>
                            <select>
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
                        <TextareaAutosize maxLength={40}/>
                    </div>
                    <div className="jobDescription">
                        <p>Description: *</p>
                        <TextareaAutosize maxLength={200}/>
                    </div>
                    <div className="jobQualifications">
                        <p>Qualifications: </p>
                        <TextareaAutosize maxLength={200}/>
                    </div>
                    <div className="salary">
                        <p>Salary:</p>
                        <input type='number' placeholder='Eg. 40,000$'></input> 
                        <select>
                            <option disable selected hidden>Select One</option>
                            <option>Hourly</option>
                            <option>Weekly</option>
                            <option>Bi-weekly</option>
                            <option>Yearly</option>
                        </select>
                    </div>
                    <div className="jobResponsibilities">
                        <p>Responsibilities: *</p>
                        <TextareaAutosize maxLength={200}/>
                    </div>
                    <div className="addSkills">
                        <p>Add keywords that will help your post reach the right students</p>
                        <TextareaAutosize className='skill' placeholder='Add'></TextareaAutosize>
                    </div>

                </div>
                <div className="applications">
                    <h1>Applications</h1>
                    <div className="reciveType">
                        <p>How would you like to recive applications?</p>
                        <select>
                            <option disable hidden>Select One</option> 
                            <option >Website</option> 
                            <option>External Site</option>
                        </select>
                    </div>
                </div>
                <button className='save'>Post</button>
            </div>
        </div>
    );
}

export default Create_Job;