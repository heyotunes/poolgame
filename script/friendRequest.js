// friendRequests.js

// Import Firebase and Firestore libraries
import { app } from "../Auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

// Function to send a friend request
export async function sendFriendRequest(targetUsername) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No user is signed in.");
    return;
  }

  try {
    // Query Firestore for the target user's document by their username
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", targetUsername));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("User not found.");
      return;
    }

    // Assume usernames are unique, get the target user document
    const targetUserDoc = querySnapshot.docs[0];
    const targetUserId = targetUserDoc.id;

    // Get the current user's document to retrieve the username
    const currentUserDoc = await getDoc(doc(db, "users", currentUser.uid));
    let senderUsername = "Unknown User";

    if (currentUserDoc.exists()) {
      senderUsername = currentUserDoc.data().username || "Unknown User";
    }

    // Add the friend request to the target user's 'friendRequests' field
    await updateDoc(doc(db, "users", targetUserId), {
      friendRequests: arrayUnion({
        senderUID: currentUser.uid,
        senderUsername: senderUsername,
      }),
    });

    alert("Friend request sent successfully!");
  } catch (error) {
    console.error("Error sending friend request: ", error);
  }
}

// Function to get the list of pending friend requests for the current user
export function getPendingFriendRequests(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const currentUserRef = doc(db, "users", user.uid);
        const currentUserDoc = await getDoc(currentUserRef);

        if (!currentUserDoc.exists()) {
          console.error("Current user document not found.");
          callback([]);
          return;
        }

        const friendRequests = currentUserDoc.data().friendRequests || [];
        callback(friendRequests);
      } catch (error) {
        console.error("Error getting friend requests: ", error);
        callback([]);
      }
    } else {
      console.error("No user is signed in.");
      callback([]);
    }
  });
}

// Function to accept a friend request
export async function acceptFriendRequest(senderUID) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No user is signed in.");
    return;
  }

  try {
    const currentUserRef = doc(db, "users", currentUser.uid);
    const senderUserRef = doc(db, "users", senderUID);

    // Remove the friend request from the 'friendRequests' array
    await updateDoc(currentUserRef, {
      friendRequests: arrayRemove({
        senderUID: senderUID,
        senderUsername: (await getDoc(senderUserRef)).data().username,
      }),
      friends: arrayUnion(senderUID), // Add sender to the current user's friends list
    });

    // Add the current user to the sender's friends list
    await updateDoc(senderUserRef, {
      friends: arrayUnion(currentUser.uid),
    });

    alert("Friend request accepted!");
  } catch (error) {
    console.error("Error accepting friend request: ", error);
  }
}

// Function to deny a friend request
export async function denyFriendRequest(senderUID) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No user is signed in.");
    return;
  }

  try {
    const currentUserRef = doc(db, "users", currentUser.uid);
    const senderUserRef = doc(db, "users", senderUID);

    // Remove the friend request from the 'friendRequests' array
    await updateDoc(currentUserRef, {
      friendRequests: arrayRemove({
        senderUID: senderUID,
        senderUsername: (await getDoc(senderUserRef)).data().username,
      }),
    });

    alert("Friend request denied!");
  } catch (error) {
    console.error("Error denying friend request: ", error);
  }
}
