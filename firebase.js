
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

const firebaseConfig = {
  apiKey: "AIzaSyDxsrKx-7LI9wViv_9MGTJ4fJKxM0twa-M",
  authDomain: "shaurya-ai-e559a.firebaseapp.com",
  projectId: "shaurya-ai-e559a",
  storageBucket: "shaurya-ai-e559a.firebasestorage.app",
  messagingSenderId: "545458505128",
  appId: "1:545458505128:web:6ce517e8a4d7c02d2f499d"
};

const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LfB2yAuAAAAAMmn9xKLgiPfxq-ZUrsWPpyxWyQj"
  ),
  isTokenAutoRefreshEnabled: true
});

export const auth = getAuth(app);
export const db = getFirestore(app);

// Gemini Developer API
const ai = getAI(app, {
  backend: new GoogleAIBackend()
});

const model = getGenerativeModel(ai, {
  model: "gemini-2.5-flash"
});

export async function generateAIResponse(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function startAuthentication() {
  const result = await signInAnonymously(auth);
  return result.user;
}

