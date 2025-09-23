import React, {useState} from 'react';
import {callAiChatbot} from '../services/backendService';

const ChatBot = () => {
    const [questionValue, setQuestionValue]= useState("");
    const [conversationId, setConversationId] = useState(100);
    const [chatHistory, setChatHistory] = useState("Welcome to Flight Booking Assistant. How can I help you?");

    const handleQuestionChange = (event) => {
        setQuestionValue(event.target.value);
    };

    const resetChat = () => {
        setQuestionValue("");
        setConversationId(100);
        setChatHistory("Welcome to Flight Booking Assistant. How can I help you?");
    }

    const handleSendClick = () => {
        // Logic to send the question to the backend or process it
        console.log("Question sent:", questionValue);
        chatHistory = sendQiuestionToBackend();
    }

    const sendQiuestionToBackend = async () => {
        await callAiChatbot(questionValue, conversationId);
    }

    return (
        <div className="container chat-bot">
            <div className=''>
                <h2>Flight Booking Assistant</h2>
                <div className='mt-4 row'>
                    <p>{chatHistory}</p>
                </div>
                <div className='row'>
                    
                    <textarea rows="2" onChange={handleQuestionChange} placeholder="Type your message here..." />
                </div>
                <button className='mt-2 btn btn-primary' onClick={() => handleSendClick()}>Send</button>
                <button className='ms-2 mt-2 btn btn-primary' onClick={() => resetChat()}>Reset</button>
            </div>
            
        </div>
    );
}

export default ChatBot;