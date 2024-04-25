import TextareaAutosize from 'react-textarea-autosize';
import { useState } from "react";


function EventOverlay(){
    const [string_length, set_string_length] = useState(0)

    const countText = () => {
        var string = document.getElementById("textarea").value
        set_string_length(string.length)
    }
    const [change, setChange] = useState("poll");
    const [isOn, setIsOn] = useState(false)

    return(
        <form className="event">
                <p>Event Name*</p>
                <TextareaAutosize id="textarea" maxLength={70} required/>
                <p>Start Date</p>
                <input type='date'required/>
                <p>Start Time</p>
                <input type='time' required/>
                <p>End Date</p>
                <input type='date'required/>
                <p>End Time</p>
                <input type='time' required/>
                
                <p>Event Description</p>
                <TextareaAutosize placeholder="Enter option"/>

                <button name='submit' type='submit'>Post</button>
        </form>
    );
}
export default EventOverlay;