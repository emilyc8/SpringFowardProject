import { useState, useEffect } from "react";
import axios from "axios";

function InteractivePoll({ poll }) {
    const { id, question, options, pollLength, postTime } = poll;
    const [selectedOptions, setSelectedOption] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [voted, setVoted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(postTime+pollLength);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleOptionChange = (optionId) => {
        setSelectedOption(optionId);
    };

    const handleSubmitVote = async () => {
        setIsSubmitting(true);

        try {
            const response = await axios.post(`/polls/${id}/vote`, {
                selectedOptions,
            });
            console.log(response.data);
            // Update the UI to reflect that the user has voted
            setVoted(true);
        } catch (error) {
            console.error("Error submitting vote:", error);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="interactive-poll">
            <h2>{question}</h2>
            {timeLeft > 0 ? (
                <p>Time left: {timeLeft} seconds</p>
            ) : (
                <p>Poll has ended</p>
            )}
            <div className="poll-options">
                {options.map((option) => (
                    <div key={option.id} className="poll-option">
                        <input
                            type="radio"
                            id={`option-${option.id}`}
                            checked={selectedOptions === option.id}
                            onChange={() => handleOptionChange(option.id)}
                            disabled={voted || timeLeft <= 0}
                        />
                        <label htmlFor={`option-${option.id}`}>{option.text}</label>
                    </div>
                ))}
            </div>
            {!voted && timeLeft > 0 && (
                <button onClick={handleSubmitVote} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Vote"}
                </button>
            )}
            {voted && <p>You have already voted in this poll.</p>}
        </div>
    );
}

export default InteractivePoll;