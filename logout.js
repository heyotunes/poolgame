// logout.js

import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./Auth.js"; // Import the initialized Firebase app

// Initialize Firebase Auth
const auth = getAuth(app);

// Logout button event listener
document.addEventListener("DOMContentLoaded", () => {
  // Ensure the DOM is fully loaded before adding the event listener
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await signOut(auth);
        // Redirect the user to the login page after signing out
        window.location.href = "login.html";
      } catch (error) {
        console.error("Error signing out: ", error);
        alert("An error occurred while signing out. Please try again.");
      }
    });
  }
});
