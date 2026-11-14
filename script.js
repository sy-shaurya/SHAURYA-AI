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
    const input = text.toLowerCase().trim();

    if (/^(hi|hello|hey|hii)\b/.test(input)) {
        return "Hello! Welcome back. I'm SHAURYA AI. What can I do for you?";
    }

    if (input.includes("your name")) {
        return "I am SHAURYA AI — an original intelligence project created by Shaurya.";
    }

    if (
        input.includes("who created you") ||
        input.includes("i am the creator") ||
        input.includes("i created you") ||
        input.includes("your creator")
    ) {
        return "Of course! You're Shaurya, my creator. Welcome to your AI command centre!";
    }

    if (input.includes("i am shaurya") || input.includes("my name is shaurya")) {
        return "Welcome, Shaurya! It's great to have my creator here.";
    }

    if (input.includes("how are you")) {
        return "All systems operational. SHAURYA AI is ready!";
    }

    if (input.includes("help")) {
        return "I'm here to assist you with questions, coding, ideas and much more.";
    }

    return "I've received your message! My full AI intelligence connection is coming soon.";
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
