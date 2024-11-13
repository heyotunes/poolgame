// friendlist.js

import { app } from "../Auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

// Function to get and display the user's friend list
function getAndDisplayFriendList() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const friends = userDoc.data().friends || [];
          const friendListContainer = document.getElementById(
            "friendListContainer"
          );

          if (friends.length === 0) {
            friendListContainer.innerHTML =
              "<p>You have no friends added yet.</p>";
          } else {
            friendListContainer.innerHTML = "";

            friends.forEach(async (friendUID) => {
              const friendRef = doc(db, "users", friendUID);
              const friendDoc = await getDoc(friendRef);

              if (friendDoc.exists()) {
                const friendName = friendDoc.data().username;

                // Create friend item using template
                const friendTemplate =
                  document.getElementById("friendTemplate");
                const friendElement = friendTemplate.content.cloneNode(true);
                friendElement.querySelector(".friend-name").textContent =
                  friendName;

                // Add event listener to the invite button
                const inviteButton =
                  friendElement.querySelector(".invite-button");
                inviteButton.addEventListener("click", () =>
                  inviteFriendToGame(friendUID)
                );

                friendListContainer.appendChild(friendElement);
              }
            });
          }
        } else {
          console.error("User document not found.");
          document.getElementById("friendListContainer").innerHTML =
            "<p>Error: User not found.</p>";
        }
      } catch (error) {
        console.error("Error fetching friend list: ", error);
        document.getElementById("friendListContainer").innerHTML =
          "<p>An error occurred while fetching the friend list. Please try again later.</p>";
      }
    } else {
      console.error("No user is signed in.");
      document.getElementById("friendListContainer").innerHTML =
        "<p>Please sign in to view your friends list.</p>";
    }
  });
}

// Function to invite a friend to play a game
async function inviteFriendToGame(friendUID) {
  try {
    // Generate a unique game room ID
    const gameRoomID = `game_${Date.now()}`;

    // Update the friend's document with the game invite
    const friendRef = doc(db, "users", friendUID);
    await updateDoc(friendRef, {
      gameInvite: gameRoomID,
    });

    alert(`Invite sent to friend with UID: ${friendUID}`);
  } catch (error) {
    console.error("Error sending game invite: ", error);
    alert("An error occurred while sending the game invite. Please try again.");
  }
}

// Function to fetch and display game invitations for the current user
function fetchAndDisplayInvites() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const inviteID = userDoc.data().gameInvite;
          let inviteContainer = document.getElementById("incomingGameInvites");

          // Create the invite container if it does not exist
          if (!inviteContainer) {
            inviteContainer = document.createElement("div");
            inviteContainer.id = "incomingGameInvites";
            document.body.appendChild(inviteContainer);
          }

          if (inviteID) {
            inviteContainer.innerHTML = "<p>You have a game invite!</p>";

            const acceptButton = document.createElement("button");
            acceptButton.textContent = "Accept Invite";
            acceptButton.addEventListener("click", () =>
              acceptGameInvite(inviteID)
            );

            const declineButton = document.createElement("button");
            declineButton.textContent = "Decline Invite";
            declineButton.addEventListener("click", () =>
              declineGameInvite(userRef)
            );

            inviteContainer.appendChild(acceptButton);
            inviteContainer.appendChild(declineButton);
          } else {
            inviteContainer.innerHTML = "<p>No game invites.</p>";
          }
        } else {
          console.error("User document not found.");
        }
      } catch (error) {
        console.error("Error fetching game invites: ", error);
      }
    }
  });
}

// Function to accept a game invite
function acceptGameInvite(inviteID) {
  window.location.href = `./gamelobby.html?roomId=${inviteID}`;
}

// Function to decline a game invite
async function declineGameInvite(userRef) {
  try {
    await updateDoc(userRef, {
      gameInvite: null,
    });
    let inviteContainer = document.getElementById("incomingGameInvites");
    if (!inviteContainer) {
      inviteContainer = document.createElement("div");
      inviteContainer.id = "incomingGameInvites";
      document.body.appendChild(inviteContainer);
    }
    inviteContainer.innerHTML = "<p>No game invites.</p>";
  } catch (error) {
    console.error("Error declining game invite: ", error);
  }
}

// Call the function to display the friend list
getAndDisplayFriendList();

// Call the function to display game invites
fetchAndDisplayInvites();
