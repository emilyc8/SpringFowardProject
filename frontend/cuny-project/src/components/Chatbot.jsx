import React, { useState, useRef, useEffect } from 'react';
import { getBotResponse } from './openai';
import "../styles/chatbot.css"

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);

    // Function to scroll to the bottom of the chat container
    const scrollToBottom = () => {
        const scroll = chatContainerRef.current;
        if (scroll) {
            scroll.scrollTop = scroll.scrollHeight;
        }
    };

    // Effect to auto-scroll when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle the submission of the chat form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const userInput = event.target.elements['user-input'].value.trim();
        if (!userInput) return;

        // Add user's message to the state
        setMessages(prev => [...prev, { text: userInput, sender: 'user' }]);
        // Fetch the bot's response and add it to the state
        const botResponse = await getBotResponse(userInput);
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    };

    return (
        <div className="chatbot">
            <div className="welcome">
                <h1>Welcome to the CUNY Connect Chatbot!</h1>
                <p>How can I help you today?</p>
            </div>
            <div id="chat-container" ref={chatContainerRef}>
                <div id="chat-content">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}-message`}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <form id="chat-form" onSubmit={handleFormSubmit}>
                    <input type="text" name="user-input" placeholder="Type a message..." />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;