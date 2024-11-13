import {
  initializeApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiAIGJnWzyVJqmatNKGiPTwUCXoL3PrAc",
  authDomain: "poolgame-b2766.firebaseapp.com",
  projectId: "poolgame-b2766",
  storageBucket: "poolgame-b2766.appspot.com",
  messagingSenderId: "823661427220",
  appId: "1:823661427220:web:37a364ebb834b8a039c501",
};

// Initialize Firebase if it hasn't been initialized already
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export the app for use in other files
export { app };

// Authentication setup
const auth = getAuth(app);
