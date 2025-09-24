import React, {useState} from 'react';
import {callAiChatbot} from '../services/backendService';

const ChatBot = () => {
    const [questionValue, setQuestionValue]= useState("");
    const [conversationId, setConversationId] = useState(1);
    const [chatHistory, setChatHistory] = useState("Welcome to Flight Booking Assistant. How can I help you?");

    const handleQuestionChange = (event) => {
        setQuestionValue(event.target.value);
    };

    const handleSendClick = () => {
        // Logic to send the question to the backend or process it
        console.log("Question sent:", questionValue);
        sendQuestionToBackend();
    }

    const sendQuestionToBackend = async () => {
        let response = "";
        
        try {
            response = await callAiChatbot(questionValue, conversationId);
            console.log("Response from backend:", response);
            setChatHistory(chatHistory + "\nUser: " + questionValue + "\nBot: " + response);
        }
        catch (error) {
            response = "Sorry, there was an error processing your request.";
            setChatHistory(response);
        }
       // setConversationId(conversationId + 1);
       setQuestionValue("");
    }

     const resetChat = () => {
        setQuestionValue("");
        setConversationId(conversationId + 1);
        setChatHistory("Welcome to Flight Booking Assistant. How can I help you?");
    }

    return (
        <div className="container chat-bot">
            <div className=''>
                <h2>Flight Booking Assistant</h2>
                <div className='mt-4 row'>
                    <label>Chat History:</label>
                    <textarea rows="10" value={chatHistory} readOnly />
                </div>
                <div className='row'>
                    <label>Your Message:</label>
                    <textarea value={questionValue} rows="2" onChange={handleQuestionChange} placeholder="Type your message here..." />
                </div>
                <button className='mt-2 btn btn-primary' onClick={() => handleSendClick()}>Send</button>
                <button className='ms-2 mt-2 btn btn-primary' onClick={() => resetChat()}>Reset</button>
            </div>
            
        </div>
    );
}

export default ChatBot;