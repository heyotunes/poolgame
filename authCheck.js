import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./Auth.js";

// Get authentication instance
const auth = getAuth(app);

// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redirect to login page if not authenticated
    window.location.href = "login.html";
  }
});
