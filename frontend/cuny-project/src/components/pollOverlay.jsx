import TextareaAutosize from 'react-textarea-autosize';
import { useState } from "react";

let types = {
    type1: "Student", 
    type2: "Professor"
};


function PollOverlay(){
    const [string_length, set_string_length] = useState(0)

    const countText = () => {
        var string = document.getElementById("textarea").value
        set_string_length(string.length)
    }
    const [change, setChange] = useState("poll");
    const [isOn, setIsOn] = useState(false)
    return(
        <div className="poll">
                <p>Question*</p>
                <TextareaAutosize id="textarea" placeholder="Ask a question.." maxLength={70}/>
                <p>Option 1*</p>
                <TextareaAutosize placeholder="Enter option"/>
                <p>Option 2*</p>
                <TextareaAutosize placeholder="Enter option"/>
                <p>Poll Length</p>
                <form>
                    <select name="length" id="length">
                        <option value="12h">12 Hours</option>
                        <option value="24h">24 Hours</option>
                        <option value="week">1 Week</option>
                        <option value="week2">2 Weeks</option>
                    </select>
                </form>
        </div>
    );
}
export default PollOverlay;