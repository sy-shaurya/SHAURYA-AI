
/* =====================================
   SHAURYA AI — GEMINI 3.8 FLASH
   Firebase Connected
   Created by Shaurya
===================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-check.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
    getAI,
    getGenerativeModel,
    GoogleAIBackend
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-ai.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxsrKx-7LI9wViv_9MGTJ4fJKxM0twa-M",
    authDomain: "shaurya-ai-e559a.firebaseapp.com",
    projectId: "shaurya-ai-e559a",
    storageBucket: "shaurya-ai-e559a.firebasestorage.app",
    messagingSenderId: "545458505128",
    appId: "1:545458505128:web:6ce517e8a4d7c02d2f499d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize App Check
initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
        "6Lc74iAuAAAAAFgx9FtPqQ-3hVg5ftqPz9dFH_W5"
    ),
    isTokenAutoRefreshEnabled: true
});

// Authentication and database
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Gemini through Firebase AI Logic
const ai = getAI(app, {
    backend: new GoogleAIBackend()
});

// Gemini model
const model = getGenerativeModel(ai, {
    model: "gemini-3.8-flash"
});

console.log("SHAURYA AI: Firebase initialized");
console.log("SHAURYA AI: Gemini 3.8 Flash configured");

// Generate AI response
export async function generateAIResponse(prompt) {
    try {
        console.log("Sending request to Gemini 3.8 Flash...");

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        if (!response) {
            throw new Error("Gemini returned an empty response.");
        }

        console.log("Gemini response received!");

        return response;

    } catch (error) {
        console.error("GEMINI CONNECTION ERROR:", error);
        throw error;
    }
}

// Anonymous authentication
export async function startAuthentication() {
    try {
        const result = await signInAnonymously(auth);

        console.log("Firebase authentication successful!");

        return result.user;

    } catch (error) {
        console.error("Firebase authentication error:", error);
        throw error;
    }
  }

