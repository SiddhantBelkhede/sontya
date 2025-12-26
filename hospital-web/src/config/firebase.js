import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3GSTcLZHxWlZgQP8Q8hnPK6jydCcL_h0",
  authDomain: "sontya-hackathon.firebaseapp.com",
  projectId: "sontya-hackathon",
  storageBucket: "sontya-hackathon.firebasestorage.app",
  messagingSenderId: "235300153514",
  appId: "1:235300153514:web:a377335372b834720648d3"
};

// Initialize app
const app = initializeApp(firebaseConfig);

// Export auth and db instances
export const auth = getAuth(app);
export const db = getFirestore(app);