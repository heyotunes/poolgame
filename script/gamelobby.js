import { app } from "../Auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

// Extract the game room ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");
document.getElementById("roomId").textContent = roomId;

let userUid;
let playersReady = {};

// Monitor authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userUid = user.uid;

    const roomRef = doc(db, "gameRooms", roomId);

    // Real-time listener to update player list
    onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const roomData = doc.data();
        const players = roomData.players || [];

        // Update player list UI
        const playersList = document.getElementById("playersList");
        playersList.innerHTML = "";
        players.forEach((player) => {
          const li = document.createElement("li");
          li.textContent = player.username + (player.ready ? " (Ready)" : "");
          playersReady[player.uid] = player.ready;
          playersList.appendChild(li);
        });

        // Enable start game button if all players are ready
        const allReady = players.every((player) => player.ready);
        document.getElementById("startGameButton").disabled = !allReady;
      }
    });

    // Handle "Ready" button click
    document
      .getElementById("readyButton")
      .addEventListener("click", async () => {
        const roomDoc = await getDoc(roomRef);

        if (roomDoc.exists()) {
          const players = roomDoc.data().players || [];
          const playerIndex = players.findIndex(
            (player) => player.uid === userUid
          );
          if (playerIndex > -1) {
            players[playerIndex].ready = !players[playerIndex].ready;

            await updateDoc(roomRef, {
              players: players,
            });

            document.getElementById("readyStatus").textContent = players[
              playerIndex
            ].ready
              ? "You are ready!"
              : "You are not ready.";
          }
        }
      });

    // Handle "Start Game" button click
    document.getElementById("startGameButton").addEventListener("click", () => {
      // Redirect players to the game page
      window.location.href = `/game.html?roomId=${roomId}`;
    });

    // Handle "Exit Lobby" button click
    document.getElementById("exitLobbyButton").addEventListener("click", () => {
      // Remove the player from the game room and redirect to the main menu
      leaveLobby();
    });
  } else {
    alert("You must be signed in to join a game lobby.");
    window.location.href = "/login.html";
  }
});

// Function to handle leaving the lobby
async function leaveLobby() {
  const roomRef = doc(db, "gameRooms", roomId);
  const roomDoc = await getDoc(roomRef);
  if (roomDoc.exists()) {
    const players = roomDoc.data().players || [];
    const updatedPlayers = players.filter((player) => player.uid !== userUid);
    await updateDoc(roomRef, { players: updatedPlayers });

    window.location.href = "/friendlist.html";
  }
}
