import axios from "axios";

export async function callAiChatbot(question, conversationId) {
    console.log(`### Starting to call ai chatbot...`);

    try {
        const response = await axios.get("/api/chatBot/ask", 
            {  
                params: { 
                    question: question, 
                    conversationId: conversationId 
                }
            });
        return response.data;
    } catch (error) {
        console.error("Error calling AI assistant:", error);
        throw error;
    }
}