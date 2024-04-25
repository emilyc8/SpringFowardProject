// import './cssfiles/internships.css'
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Open from './display.jsx';


const Load = ({type, internship, savedInternship}) => {
    const [isOn, setIsOn] = useState(false)

    const [openInternshipId, setOpenInternshipId] = useState(null);

    const handleInternshipClick = (internshipId) => {
      setOpenInternshipId(internshipId === openInternshipId ? null : internshipId);
    };
    console.log(internship);
    console.log(savedInternship);


    if (type === "type1" && internship){        
        return (
            <>
             
                <div key={internship._id}>
                    <button className="job" onClick={() => { setIsOn(!isOn); handleInternshipClick(internship._id); }}>
                        <div className="info">
                            <h1 className='title'>{internship.formData.jobTitle}</h1>
                            <p className='date'>{Date(internship.formData.postTime).toLocaleString()}</p>
                        </div>
                        <div className="sub">
                            <p>Posted By: {internship.firstName + " " + internship.lastName + " - " + internship.formData.company}</p>
                            <p>Location: {internship.formData.location}</p>
                        </div>
                        <div className="desc">
                            <p>Brief Description: {internship.formData.description}</p>
                        </div>
                    </button>
                    {openInternshipId === internship._id && (
                        <div className="openWrap">
                            <Open isOpen={isOn} onClose={() => setIsOn(!isOn)}type={"type1"} internship={internship}/>
                        </div>
                     )}
                </div>
             
            </>
        );
    } else if (type === "type3" && savedInternship){
        return(
            <div key={savedInternship._id}>
                <button className="job" onClick={() => setIsOn(!isOn)}>
                    <div className="info">
                        <h1 className='title'>{savedInternship.formData.jobTitle}</h1>
                        <p className='date'>{savedInternship.postTime}</p>
                    </div>
                    <div className="sub">
                        <p>Posted By: {savedInternship.firstName + " " + savedInternship.lastName + " - " + savedInternship.formData.company}</p>
                        <p>Location: {savedInternship.formData.location}</p>
                    </div>
                    <div className="desc">
                        <p>BRIEF DESCRIPTION: {savedInternship.formData.description}</p>
                    </div>
                    <div className="status">
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>

                    <div className="openWrapS">
                        <Open isOpen={isOn} onClose={() => setIsOn(!isOn)} type={"type3"}/>
                    </div>

                </button>
        </div>
        );
    }
    //else if (type == "type3"){
    //     return(
    //         <button className="job" onClick={() => setIsOn(!isOn)}>
    //             <div className="info">
    //                 <h1 className='title'>TITLE</h1>
    //                 <p className='date'>{today}</p>
    //             </div>
    //             <div className="sub">
    //                 <p>POSTED BY: {name}</p>
    //                 <p>LOCATION: {location}</p>
    //             </div>
    //             <div className="desc">
    //                 <p>BRIEF DESCRIPTION: {description}</p>
    //             </div>
    //             <div className="status">
    //                 <p>{status.posted}</p>
    //                 <FontAwesomeIcon icon={faEye} />
    //             </div>

    //             <div className="openWrapS">
    //                 <Open isOpen={isOn} onClose={() => setIsOn(!isOn)} type={"type3"}/>
    //             </div>

    //         </button>
    //     );
    // }

};
export default Load;