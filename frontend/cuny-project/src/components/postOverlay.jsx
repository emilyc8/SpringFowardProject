import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faCalendar,  faBarsStaggered, faFont} from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState, useContext} from "react";
import axios from "axios";
import PollOverlay from "./pollOverlay";
import EventOverlay from "./eventOverlay";
import TextOverlay from "./textOverlay";


function PostOverlay({isOpen, onClose}) {
    // const [user, setUser] = useState(null);
    const [error, setError] = useState('');


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [type, setType] = useState('');
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/home?userId=${userId}`);
                const { firstName, lastName, type } = response.data.user;
                setFirstName(firstName);
                setLastName(lastName);
                setType(type);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        if (userId) {
            fetchUserInfo();
        }
    }, [userId]);

    const [change, setChange] = useState("text");
    const [isOn1, setIsOn1] = useState(false)
    return(
        <>
            { isOpen && (
                <div className="back" >
                    
                    <div className="card">
                        <div className="close">
                            <button onClick={onClose} onClose={() => setIsOn(!isOn)}>⨉</button>
                        </div>
                        <div className="top">
                            <img src="../pfp.png"></img>
                            <p>{firstName + " " + lastName} - {type}</p>
                        </div>
                        
                            {change === "text" && <TextOverlay isOpen1={true} onClose1={onClose}/>}
                            {change === "poll" && <PollOverlay/>}
                            {change === "event" && <EventOverlay/>}

                        <div className="media">
                            <button className="text" onClick={() => setChange("text")}><FontAwesomeIcon icon={faFont} /></button>
                            <button className="insertImage"><FontAwesomeIcon icon={faImage}/></button>
                            <button className="eventb" onClick={() => setChange("event")}><FontAwesomeIcon icon={faCalendar} /></button>
                            <button className="pollb" onClick={() => setChange("poll")}><FontAwesomeIcon icon={faBarsStaggered} /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default PostOverlay