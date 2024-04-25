import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState, useContext} from "react";
import axios from "axios";



function TextOverlay({isOpen1, onClose1}){
    const [postContent, setPostContent] = useState('');
    const [string_length, set_string_length] = useState(0);
    const [error, setError] = useState('');

    const countText = () => {
        var string = document.getElementById("textarea").value
        set_string_length(string.length)
    } 

    const postType = 'text';
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing errors

        if (!postContent.trim()) {
            setError('Post content cannot be blank');
            return; // Exit the function early if postContent is blank
        }

        try {
            const userId = localStorage.getItem('userId');
            const postTime = new Date().toISOString();
            const response = await axios.post('http://127.0.0.1:5000/createpost', {
                userId,
                postType,
                postTime,
                postContent
            });
    ;
            console.log('Post stored.', response.data);
            onClose1();
            
            
        } catch (error) {
            setError(error.message);
        }
    };
    return(
        <form className="texta" onSubmit={handleSubmit}>

            <TextareaAutosize 
                value={postContent} 
                name="postContent"
                onChange={(e) => setPostContent(e.target.value)} 
                id="textarea" 
                className="area" 
                maxLength={400} 
                placeholder="Write Something..." 
                maxRows={20} 
                onInput={countText}
            />
            <div id="the-count">
                <span id="current">{string_length}</span>
                <span id="maximum">/400</span>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Post</button>
        </form>
    );
}

export default TextOverlay