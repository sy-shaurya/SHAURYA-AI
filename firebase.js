
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxsrKx-7LI9wViv_9MGTJ4fJKxM0twa-M",
  authDomain: "shaurya-ai-e559a.firebaseapp.com",
  projectId: "shaurya-ai-e559a",
  storageBucket: "shaurya-ai-e559a.firebasestorage.app",
  messagingSenderId: "545458505128",
  appId: "1:545458505128:web:6ce517e8a4d7c02d2f499d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export async function startAuthentication() {
  const result = await signInAnonymously(auth);
  return result.user;
}
