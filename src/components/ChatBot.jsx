import React, {useState} from 'react';
import {callAiChatbot} from '../services/backendService';
import './ChatBot.css';

const ChatBot = () => {
    const [questionValue, setQuestionValue]= useState("");
    const [conversationId, setConversationId] = useState(1);
     const [chatHistory, setChatHistory] = useState([
        { sender: "bot", text: "Welcome to Flight Booking Assistant. How can I help you?" }
    ]);

    const handleQuestionChange = (event) => {
        setQuestionValue(event.target.value);
    };

    const handleSendClick = () => {
        if (!questionValue.trim()) return;
        setChatHistory(prev => [
            ...prev,
            { sender: "user", text: questionValue }
        ]);
        console.log("Question sent:", questionValue);
        sendQuestionToBackend();
    }

    const sendQuestionToBackend = async () => {
        try {
            const response = await callAiChatbot(questionValue, conversationId);
            setChatHistory(prev => [
                ...prev,
                { sender: "bot", text: response }
            ]);
        } catch (error) {
            setChatHistory(prev => [
                ...prev,
                { sender: "bot", text: "Sorry, there was an error processing your request." }
            ]);
        }
        // setConversationId(conversationId + 1);
        setQuestionValue("");
    }

     const resetChat = () => {
        setQuestionValue("");
        setConversationId(conversationId + 1);
        setChatHistory([
            { sender: "bot", text: "Welcome to Flight Booking Assistant. How can I help you?" }
        ]);
    }

    return (
        <div className="container chat-bot">
            <div>
                <h2 className='text center'>Flight Booking Assistant</h2>
                <div className='mt-3 ms-1 me-1 row chat-history-area'>
                    <div className="chat-messages">
                        {chatHistory.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mb-2 ms-1 me-1 row'>
                    <label className="form-label">Your Message:</label>
                    <textarea 
                        className="user-message-area"
                        value={questionValue} 
                        rows="2" 
                        onChange={handleQuestionChange} 
                        placeholder="Type your message here..." 
                    />
                </div>
                <div className="d-flex justify-content-start ms-1">
                    <button className='btn btn-primary' onClick={() => handleSendClick()}>Send</button>
                    <button className='ms-2 btn btn-secondary' onClick={() => resetChat()}>Reset</button>
                </div>
                
            </div>
            
        </div>
    );
}

export default ChatBot;