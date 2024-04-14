// import './cssfiles/internships.css'
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Open from './display.jsx';



const Load = ({type}) => {
    const [isOn, setIsOn] = useState(false)
    const [active, setActive] = useState(false)

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
    const year = currentDate.getFullYear();
    const today = `${month}/${day}/${year}`;
    let description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
    culpa qui officia deserunt mollit anim id est laborum.`

    let name = 'Professor. Name'
    let location = 'Remote'

    let status = {applied : "APPLIED", 
                    none: "NOT APPLIED",
                    posted: "POSTED"};
    if (type === "type1")
        return (
            <div className="uWrap">
                <button className="job" onClick={() => setIsOn(!isOn)}>
                    <div className="info">
                        <h1 className='title'>TITLE</h1>
                        <p className='date'>{today}</p>
                    </div>
                    <div className="sub">
                        <p>POSTED BY: {name}</p>
                        <p>LOCATION: {location}</p>
                    </div>
                    <div className="desc">
                        <p>BRIEF DESCRIPTION: {description}</p>
                    </div>
                </button>
                
                <div className="openWrap">
                    <Open isOpen={isOn} onClose={() => setIsOn(!isOn)}type={"type1"}/>
                </div>
            </div>

        );
    else if (type === "type2"){
        return(
            <button className="job" onClick={() => setIsOn(!isOn)}>
                <div className="info">
                    <h1 className='title'>TITLE</h1>
                    <p className='date'>{today}</p>
                </div>
                <div className="sub">
                    <p>POSTED BY: {name}</p>
                    <p>LOCATION: {location}</p>
                </div>
                <div className="desc">
                    <p>BRIEF DESCRIPTION: {description}</p>
                </div>
                <div className="status">
                    <p>{status.applied}</p>
                    <FontAwesomeIcon icon={faBookmark} />
                </div>

                <div className="openWrapS">
                    <Open isOpen={isOn} onClose={() => setIsOn(!isOn)} type={"type1"}/>
                </div>

            </button>
        );
    }else if (type == "type3"){
        return(
            <button className="job" onClick={() => setIsOn(!isOn)}>
                <div className="info">
                    <h1 className='title'>TITLE</h1>
                    <p className='date'>{today}</p>
                </div>
                <div className="sub">
                    <p>POSTED BY: {name}</p>
                    <p>LOCATION: {location}</p>
                </div>
                <div className="desc">
                    <p>BRIEF DESCRIPTION: {description}</p>
                </div>
                <div className="status">
                    <p>{status.posted}</p>
                    <FontAwesomeIcon icon={faEye} />
                </div>

                <div className="openWrapS">
                    <Open isOpen={isOn} onClose={() => setIsOn(!isOn)} type={"type3"}/>
                </div>

            </button>
        );
    }

};
export default Load;