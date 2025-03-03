document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("userInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

async function sendMessage() {
    let userText = document.getElementById("userInput").value.trim();
    if (!userText) return;

    let messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    document.getElementById("userInput").value = "";
    
    // Auto-scroll to bottom of messages
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
        let response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: "You are a helpful botanist AI." }, 
                    { role: "user", content: userText }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        let botText = data.response || "Sorry, I couldn't process that.";

        messagesDiv.innerHTML += `<p><strong>Bot:</strong> ${botText}</p>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        let speech = new SpeechSynthesisUtterance(botText);
        speech.lang = "en-US";
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    } catch (error) {
        messagesDiv.innerHTML += `<p><strong>Bot:</strong> Error connecting to server. Please try again.</p>`;
        console.error("Error:", error);
    }
}