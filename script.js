
/* =====================================
   SHAURYA AI — Personal AI Module CONNECTED
   Created by Shaurya
===================================== */

import {
    db,
    startAuthentication,
    generateAIResponse
} from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

const AI_NAME = "SHAURYA AI";
const CREATOR = "Shaurya";

let currentUser = null;
let isSending = false;
let conversationHistory = [];

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

        const messagesRef = collection(
            db,
            "users",
            user.uid,
            "messages"
        );

        await addDoc(messagesRef, {
            text,
            sender,
            createdAt: serverTimestamp()
        });

        console.log(sender + " message saved!");
        return true;

    } catch (error) {
        console.error("Message saving failed:", error);
        return false;
    }
}

// Load previous chat history
async function loadChatHistory() {
    try {
        const user = currentUser || await authReady;

        const messagesRef = collection(
            db,
            "users",
            user.uid,
            "messages"
        );

        const chatQuery = query(
            messagesRef,
            orderBy("createdAt", "asc")
        );

        const snapshot = await getDocs(chatQuery);

        snapshot.forEach((doc) => {
            const data = doc.data();

            if (data.text && data.sender) {
                addMessage(data.text, data.sender);

                conversationHistory.push({
                    sender: data.sender,
                    text: data.text
                });
            }
        });

        console.log("Chat history loaded successfully!");

    } catch (error) {
        console.error("Chat history loading failed:", error);
    }
}

// Remove welcome message
function removeWelcome() {
    const welcome = document.getElementById("welcomeMessage");
    if (welcome) welcome.remove();
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

// Build Gemini prompt
function buildPrompt() {
    const recentMessages = conversationHistory.slice(-12);

    const history = recentMessages.map((message) => {
        const role = message.sender === "user" ? "User" : AI_NAME;
        return `${role}: ${message.text}`;
    }).join("\n");

    return `
You are ${AI_NAME}, an intelligent AI assistant created by ${CREATOR}.

Your identity:
- Your name is ${AI_NAME}.
- Your creator and owner is ${CREATOR}.
- You are friendly, helpful, creative and intelligent.
- Help with learning, coding, technology, writing and everyday questions.
- Give clear and useful answers.
- Remember the recent conversation context provided below.
- Never pretend to have abilities you do not have.

Recent conversation:
${history}

Now respond to the latest user message naturally.
`;
}

// Send messages
async function sendMessage() {
    const text = userInput.value.trim();

    if (!text || isSending) return;

    isSending = true;

    const originalText = sendBtn.textContent;

    sendBtn.disabled = true;
    sendBtn.textContent = "...";

    userInput.value = "";

    try {
        await historyReady;

        // Display user message
        addMessage(text, "user");

        // Save user message
        await saveMessage(text, "user");

        conversationHistory.push({
            sender: "user",
            text
        });

        // Generate real Gemini response
        const response = await generateAIResponse(buildPrompt());

        if (!response) {
            throw new Error("Gemini returned an empty response.");
        }

        // Display AI response
        addMessage(response, "ai");

        // Save AI response
        await saveMessage(response, "ai");

        conversationHistory.push({
            sender: "ai",
            text: response
        });

        console.log("Gemini response generated successfully!");

    } catch (error) {
    console.error("FULL GEMINI ERROR:", error);
    console.error("ERROR MESSAGE:", error.message);
    console.error("ERROR CODE:", error.code);
    console.error("ERROR DETAILS:", error.customData);

    addMessage(
        "GEMINI ERROR: " +
        (error.message || String(error)),
        "ai"
    );

    } finally {
        isSending = false;
        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
        userInput.focus();
    }
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

// Load previous conversations
const historyReady = authReady.then(() => loadChatHistory());

// Startup
console.log("--------------------------------");
console.log("SHAURYA AI INITIALIZED");
console.log("CREATOR:", CREATOR);
console.log("STATUS: ONLINE");
console.log("GEMINI: CONNECTING");
console.log("FIREBASE: CONNECTING");
console.log("--------------------------------");
   
