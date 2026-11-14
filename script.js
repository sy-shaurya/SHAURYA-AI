
/* =====================================
   SHAURYA AI — FIREBASE CONNECTED
   Created by Shaurya
===================================== */

import { db, startAuthentication } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const AI_NAME = "SHAURYA AI";
const CREATOR = "Shaurya";

let currentUser = null;

// Firebase authentication
const authReady = startAuthentication()
    .then((user) => {
        currentUser = user;
        console.log("Firebase authentication successful!");
        console.log("User ID:", user.uid);
        return user;
    })
    .catch((error) => {
        console.error("Firebase authentication failed:", error);
        throw error;
    });

// Save messages to Firestore
async function saveMessage(text, sender) {
    try {
        const user = currentUser || await authReady;

        await addDoc(
            collection(db, "users", user.uid, "messages"),
            {
                text: text,
                sender: sender,
                createdAt: serverTimestamp()
            }
        );

        console.log(sender + " message saved!");
    } catch (error) {
        console.error("Message saving failed:", error);
    }
}

// Remove welcome message
function removeWelcome() {
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

// Demo AI response system
function getDemoResponse(text) {
    const input = text.toLowerCase().trim();

    if (/^(hi|hii|hello|hey|heyy)\b/.test(input)) {
        return `Hello, ${CREATOR}! Welcome to ${AI_NAME}. How can I help you today?`;
    }

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

    if (
        input.includes("your name") ||
        input.includes("who are you")
    ) {
        return `I am ${AI_NAME}, an original AI assistant project created by ${CREATOR}.`;
    }

    if (
        input.includes("who is your owner") ||
        input.includes("who owns you")
    ) {
        return `${CREATOR} is my creator and project owner.`;
    }

    if (input.includes("how are you")) {
        return "All systems operational! I'm ready to assist you.";
    }

    if (
        input.includes("what can you do") ||
        input.includes("your features")
    ) {
        return "I'm being developed to help with questions, coding, learning, creativity, voice interaction and image understanding.";
    }

    if (input.includes("what is shaurya ai")) {
        return "SHAURYA AI is a personal AI assistant project created by Shaurya, with an original futuristic identity.";
    }

    if (
        input.includes("javascript") ||
        input.includes("coding") ||
        input.includes("programming")
    ) {
        return "Coding is exciting! My full coding intelligence feature will arrive when the real AI backend is connected.";
    }

    if (
        input.includes("thank you") ||
        input.includes("thanks")
    ) {
        return "You're welcome, Shaurya! Always ready to help.";
    }

    if (
        input.includes("bye") ||
        input.includes("goodbye")
    ) {
        return "Goodbye, Shaurya! SHAURYA AI will be ready when you return.";
    }

    return `I've received your message, ${CREATOR}! My real AI intelligence connection is coming soon.`;
}

// Send messages
function sendMessage() {
    const text = userInput.value.trim();

    if (!text || sendBtn.disabled) {
        return;
    }

    addMessage(text, "user");
    saveMessage(text, "user");

    userInput.value = "";
    sendBtn.disabled = true;

    const originalText = sendBtn.textContent;
    sendBtn.textContent = "...";

    setTimeout(() => {
        const response = getDemoResponse(text);

        addMessage(response, "ai");
        saveMessage(response, "ai");

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
console.log("FIREBASE: CONNECTING");
console.log("--------------------------------");
       
    
