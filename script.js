
/* =====================================
   SHAURYA AI — MAIN JAVASCRIPT
   Created by Shaurya
===================================== */

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

// SHAURYA AI identity
const AI_NAME = "SHAURYA AI";
const CREATOR = "Shaurya";

// Remove welcome message
function removeWelcome() {
    const welcome = messages.querySelector(".welcome");

    if (welcome) {
        welcome.remove();
    }
}

// Display messages
function addMessage(text, sender) {
    removeWelcome();

    const message = document.createElement("div");

    message.classList.add(
        "message",
        sender === "user" ? "user-message" : "ai-message"
    );

    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

// AI response system (demo version)
function getDemoResponse(text) {

    const input = text.toLowerCase().trim();

    // Greetings
    if (/^(hi|hii|hello|hey|heyy)\b/.test(input)) {
        return `Hello, ${CREATOR}! Welcome to ${AI_NAME}. How can I help you today?`;
    }

    // Creator recognition
    if (
        input.includes("who created you") ||
        input.includes("who is your creator") ||
        input.includes("your creator") ||
        input.includes("i am shaurya") ||
        input.includes("i'm shaurya") ||
        input.includes("my name is shaurya") ||
        input.includes("i am the creator") ||
        input.includes("i created you") ||
        input.includes("owner of shaurya ai") ||
        input.includes("creator of shaurya ai") ||
        input.includes("i am shaurya owner")
    ) {
        return `Welcome, ${CREATOR}! You are the creator and owner of ${AI_NAME}. This project belongs to you!`;
    }

    // AI identity
    if (
        input.includes("your name") ||
        input.includes("who are you")
    ) {
        return `I am ${AI_NAME}, an original AI assistant project created by ${CREATOR}.`;
    }

    // Owner
    if (
        input.includes("who is your owner") ||
        input.includes("who owns you")
    ) {
        return `${CREATOR} is my creator and project owner.`;
    }

    // Greetings and status
    if (input.includes("how are you")) {
        return "All systems operational! I'm ready to assist you.";
    }

    if (
        input.includes("what can you do") ||
        input.includes("your features")
    ) {
        return "I'm being developed to help with questions, coding, learning, creativity, voice interaction and image understanding.";
    }

    // About the project
    if (input.includes("what is shaurya ai")) {
        return "SHAURYA AI is a personal AI assistant project created by Shaurya, with an original futuristic identity.";
    }

    // Coding
    if (
        input.includes("javascript") ||
        input.includes("coding") ||
        input.includes("programming")
    ) {
        return "Coding is exciting! My full coding intelligence feature will arrive when the real AI backend is connected.";
    }

    // Thanks
    if (
        input.includes("thank you") ||
        input.includes("thanks")
    ) {
        return "You're welcome, Shaurya! Always ready to help.";
    }

    // Goodbye
    if (
        input.includes("bye") ||
        input.includes("goodbye")
    ) {
        return "Goodbye, Shaurya! SHAURYA AI will be ready when you return.";
    }

    // Default response
    return `I've received your message, ${CREATOR}! My real AI intelligence connection is coming soon.`;
}

// Send messages
function sendMessage() {

    const text = userInput.value.trim();

    if (!text || sendBtn.disabled) {
        return;
    }

    addMessage(text, "user");

    userInput.value = "";
    sendBtn.disabled = true;

    const originalText = sendBtn.textContent;
    sendBtn.textContent = "...";

    setTimeout(() => {

        const response = getDemoResponse(text);

        addMessage(response, "ai");

        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
        userInput.focus();

    }, 500);
}

// Button click
sendBtn.addEventListener("click", sendMessage);

// Enter key
userInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }

});

// Startup
console.log("--------------------------------");
console.log("SHAURYA AI INITIALIZED");
console.log("CREATOR:", CREATOR);
console.log("STATUS: ONLINE");
console.log("--------------------------------");
    
        
