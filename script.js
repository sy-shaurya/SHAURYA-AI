
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

function addMessage(text, sender) {
    const welcome = messages.querySelector(".welcome");

    if (welcome) {
        welcome.remove();
    }

    const message = document.createElement("div");

    message.classList.add(
        "message",
        sender === "user" ? "user-message" : "ai-message"
    );

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;
}

function getDemoResponse(text) {
    const input = text.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! I'm SHAURYA AI. How can I help you today?";
    }

    if (input.includes("your name")) {
        return "I'm SHAURYA AI, your personal AI assistant.";
    }

    if (input.includes("who created you")) {
        return "I am a project created by Shaurya.";
    }

    if (input.includes("how are you")) {
        return "All systems are ready! What shall we work on?";
    }

    if (input.includes("help")) {
        return "I'm here to help! Ask me something or explore my upcoming features.";
    }

    return "That's interesting! My AI intelligence connection is coming soon. For now, this is a demonstration response.";
}

function sendMessage() {
    const text = userInput.value.trim();

    if (!text) return;

    addMessage(text, "user");

    userInput.value = "";
    sendBtn.disabled = true;

    setTimeout(() => {
        const response = getDemoResponse(text);

        addMessage(response, "ai");

        sendBtn.disabled = false;
        userInput.focus();
    }, 600);
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

console.log("SHAURYA AI interface initialized.");
