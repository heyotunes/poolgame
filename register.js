import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./Auth.js"; // Import the initialized app

// Get authentication instance
const auth = getAuth(app);

const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
  event.preventDefault();

  // Get email and password values after clicking the submit button
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if email and password are not empty
  if (email.trim() === "" || password.trim() === "") {
    alert("Email and password cannot be empty");
    return;
  }

  // Check if the email is in the correct format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email format");
    return;
  }

  // Check if the password is at least 6 characters long
  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Creating Account.....");
      window.location.href = "profile.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});
