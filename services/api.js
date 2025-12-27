export const sendChatMessage = async (payload) => {
    try {
        const response = await fetch("https://adaptive-fitness-ai-chatbot-1.onrender.com/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });



        return await response.json();


    } catch (error) {
        console.error("Error sending chat message:", error);
    }

}