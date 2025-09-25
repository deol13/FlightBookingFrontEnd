import React, {useState, useRef, useEffect} from 'react';
import {callAiChatbot} from '../services/backendService';
import './ChatBot.css';

const ChatBot = ({ refreshFlights }) => {
    const [questionValue, setQuestionValue]= useState("");
    const [conversationId, setConversationId] = useState(1);
    // Chat history state, each message has a sender (user or bot) and text in its own index.
    // This is so we can easily map through it and display messages in the chat area
    // with different styles for user and bot messages
    const [chatHistory, setChatHistory] = useState([
        { sender: "bot", text: "Welcome to Flight Booking Assistant. How can I help you?" }
    ]);
    // Loading spinner state
    const [loading, setLoading] = useState(false)
    // Ref for the end of chat messages
    const chatEndRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when chatHistory or loading changes
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory, loading]);

    const handleQuestionChange = (event) => {
        setQuestionValue(event.target.value);
    };

    const handleSendClick = () => {
        if (!questionValue.trim()) return;
        setChatHistory(prev => [
            ...prev,
            { sender: "user", text: questionValue }
        ]);
        
        setLoading(true); // Show loading spinner
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
            checkIfBookingConfirmed(response);
        } catch (error) {
            setChatHistory(prev => [
                ...prev,
                { sender: "bot", text: "Sorry, there was an error processing your request." }
            ]);
        }
        // setConversationId(conversationId + 1);
        setLoading(false); // Hide loading spinner
        setQuestionValue("");
    }

    const checkIfBookingConfirmed = (response) => {
        // Check the latest bot message for booking confirmation
        try {
             if (response.length === 0) return false;
        if(response.toLowerCase().includes("booking confirmed")) {
            console.log("Booking confirmed, refreshing flight list...");
            if (refreshFlights) refreshFlights();
        }  
        else if(response.toLowerCase().includes("successfully booked")) {
            console.log("Booking confirmed, refreshing flight list...");
            if (refreshFlights) refreshFlights();
        }
        console.log("No booking confirmation found in bot response.");
        } catch (error) {
            console.error("Error checking booking confirmation:", error);
        }
       
        return false;
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
                                // Color bot and user's messages differently with the user of CSS classes
                                className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            // Show loading spinner when waiting for bot response
                            <div className="chat-message bot-message">
                                <span className="spinner"></span> Bot is typing...
                            </div>
                        )}
                        {
                        //Dummy div to enable auto-scroll to bottom
                        }
                        <div ref={chatEndRef} />
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