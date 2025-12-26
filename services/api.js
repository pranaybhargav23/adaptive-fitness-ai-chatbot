export const sendChatMessage = async (payload) => {
    try {
        const response = await fetch("http://10.0.2.2:3000/api/chat", {
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