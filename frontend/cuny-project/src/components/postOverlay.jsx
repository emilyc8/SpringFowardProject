import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faCalendar,  faBarsStaggered, faFont} from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from "react";
import PollOverlay from "./pollOverlay";

const name = "Full Name";
let types = {
    type1: "Student", 
    type2: "Professor"
};


function PostOverlay({isOpen, onClose}){
    const [string_length, set_string_length] = useState(0)

    const countText = () => {
        var string = document.getElementById("textarea").value
        set_string_length(string.length)
    }
    const [change, setChange] = useState("text");
    return(
        <>{
                isOpen ? (
                    <div className="back">
                        
                        <div className="card">
                            <div className="close">
                                <button onClick={onClose} onClose={() => setIsOn(!sOn)}>⨉</button>
                            </div>
                            <div className="top">
                                <img src="../pfp.png"></img>
                                <p>{name} - {types.type1}</p>
                            </div>

                            {change === "text" && 
                                <div className="texta" >
                                    <TextareaAutosize id ="textarea" className="area" maxLength={400} placeholder="Write Something..." maxRows={20} onInput={() => countText()}/>
                                    <div id="the-count">
                                        <span id="current">{string_length}</span>
                                        <span id="maximum">/400</span>
                                    </div>
                                </div>
                            }
                            {change === "poll" && <PollOverlay/>}
                            {/* {change === "event && <EventOverlay/>"} */}
                            
                            <div className="media">
                                <button className="text" onClick={() => setChange("text")}><FontAwesomeIcon icon={faFont} /></button>
                                <button className="insertImage"><FontAwesomeIcon icon={faImage}/></button>
                                <button className="event"><FontAwesomeIcon icon={faCalendar} /></button>
                                <button className="pollb" onClick={() => setChange("poll")}><FontAwesomeIcon icon={faBarsStaggered} /></button>
                            </div>
                        </div>
                    </div>
                ) : null
            }   
        </>
    );
}
export default PostOverlay;