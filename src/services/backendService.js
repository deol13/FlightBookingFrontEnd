const todoAPIEndpoint = "http://localhost:8080/api/chatBot/ask";
const todoAPIEndpoint2 = "http://localhost:5173/api/chatBot/ask";

import axios from "axios";

export async function callAiChatbot(question, conversationId) {
    console.log(`### Starting to call ai chatbot...`);

    try {
        const response = await axios.get(todoAPIEndpoint, 
            {  
                params: { 
                    question: question, 
                    conversationId: conversationId 
                }
            });
        console.log("Response from AI assistant successful.", response.data);
        return response.data;
    } catch (error) {
        console.error("Error calling AI assistant:", error);
        throw error;
    }
}

export async function getAllAvailableFlights() {
    console.log(`### Starting to get all available flights...`);

    try {
        const response = await axios.get("http://localhost:8080/api/flights/available");
        console.log("Response from getAllAvailableFlights successful.", response.data);
        return response.data;
    } catch (error) {
        console.error("Error calling getAllAvailableFlights:", error);
        throw error;
    }
}
