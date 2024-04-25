import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


function Open({isOpen, onClose, type, internship}){

    const [savedMessageVisible, setSavedMessageVisible] = useState(false);
    const [error, setError] = useState('');
    const [save, setSaved] = useState('Save');

    const handleSaveInternship = async () => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.post('http://127.0.0.1:5000/saveInternship', {
                internshipId: internship._id,
                userId: userId
            });
            setSavedMessageVisible(true);
            setSaved("Saved")
        } catch (error) {
            console.error('Error saving internship:', error);
            setError(error.response.data.message);
            // Optionally, you can provide error handling or feedback to the user
        }
    };


    if(type === "type1" && isOpen && internship){
        const {formData} = internship;
        const {
            firstName,
            lastName,
            skills,
            company,
            location,
            description,
            workplace,
            jobTitle,
            qualifications,
            responsibilities,
            postTime
        } = formData;
        console.log(internship)
        
        return(
            <div className="open">
                <div className="close">
                    <button className="close" onClick={onClose}>X</button>
                </div>
                <div className="card">
                        <div className="info">
                            <h1 className='title'>{jobTitle}</h1>
                        </div>
                        <div className="sub">
                            <p>POSTED BY: <a>{company}</a> - LOCATION: {location}</p>
                            <p className='date'>{postTime}</p>
                        </div>
                        <div className="desc">
                            <h1>DESCRIPTION:</h1>
                            <p>{description}</p>
                        </div>
                        <div className="qualifications">
                            <h1>QUALIFICATIONS</h1>
                            <p>{qualifications}</p>
                        </div>
                        <div className="responsiblities">
                            <h1>RESPONSIBILITIES</h1>
                            <p>{responsibilities}</p>
                        </div>

                        <div className="skills">
                            <p>SKILLS:</p>
                            <ul>
                                {skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                        {savedMessageVisible && <p>Internship saved successfully!</p>}
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <div className="apply">
                            <button className="apply">Apply</button>
                            <button onClick={handleSaveInternship} className="save">
                                {save}
                            </button>
                        </div>
                    </div>
            </div>
        );
    } 
    // else if(type === "type3"){
    //     return(
    //         <>
    //             {
    //                 isOpen ? (
    //                     <div className="open2">
    //                         <div className="close">
    //                             <button className="close" onClick={onClose}>X</button>
    //                         </div>
    //                         <div className="card">
    //                                 <div className="info">
    //                                     <h1 className='title'>TITLE</h1>
    //                                 </div>
    //                                 <div className="sub">
    //                                     <p>POSTED BY: <a>{name}</a> - LOCATION: {location}</p>
    //                                     <p className='date'>{today}</p>
    //                                 </div>
    //                                 <div className="desc">
    //                                     <h1>DESCRIPTION:</h1>
    //                                     <p>{description}</p>
    //                                 </div>
    //                                 <div className="qualifications">
    //                                     <h1>QUALIFICATIONS</h1>
    //                                     <ul>
    //                                         <li>{list.item1}</li>
    //                                         <li>{list.item2}</li>
    //                                         <li>{list.item3}</li>
    //                                         <li>{list.item4}</li>
    //                                         <li>{list.item5}</li>
    //                                     </ul>
    //                                 </div>
    //                                 <div className="responsiblities">
    //                                     <h1>RESPONSIBILITIES</h1>
    //                                     <p>{description}</p>
    //                                 </div>

    //                                 <div className="edit">
    //                                     <button className="edit">Edit</button>
    //                                 </div>
    //                             </div>
    //                     </div>
    //                 ) :null
    //             }
    //         </>
    //     );
    // }
}

export default Open;