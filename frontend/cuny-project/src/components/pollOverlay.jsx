import TextareaAutosize from 'react-textarea-autosize';
import { useState } from "react";
import axios from 'axios';

const times = [
    "12 Hours",
    "24 Hours",
    "1 week",
    "2 weeks"
]
const postType = "poll";

function PollOverlay({ isOpen1, onClose1 }) {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([
        { id: 0, text: '' },
        { id: 1, text: '' }
    ]);
    const [pollLength, setPollLength] = useState('12h');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = { ...newOptions[index], text: value };
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, { id: options.length + 1, text: '' }]);
        }
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userId = localStorage.getItem('userId');
            const postTime = currentDate.toISOString().split('T')[0].split('-').reverse().join('/')
            const response = await axios.post('http://127.0.0.1:5000/createpost', {
                userId,
                postTime,
                postType,
                postContent: {
                    question,
                    options,
                    pollLength
                }
            });

            console.log('Post stored.', response.data);
            onClose1();

        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form className="poll" onSubmit={handleSubmit}>
            <p>Question*</p>
            <TextareaAutosize value={question} id="textarea" name="question" placeholder="Ask a question.." maxLength={70} onChange={(e) => setQuestion(e.target.value)} required/>

            <p>Options*</p>
            {options.map((option, index) => (
                <div key={option.id}>
                    <TextareaAutosize
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Enter option ${index + 1}`}
                        required
                    />
                    {options.length > 2 && (
                        <button type="button" onClick={() => removeOption(index)}>Remove Option</button>
                    )}
                </div>
            ))}
            {options.length < 5 && (
                <button type="button" onClick={addOption}>Add Option</button>
            )}

            <p>Poll Length</p>
            <select value={pollLength} onChange={(e) => setPollLength(e.target.value)} name="length" id="length">
                {times.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default PollOverlay;