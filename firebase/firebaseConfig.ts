import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBurbwR8y-QcDRmzu2KNu9NSi3FdU9rCEc",
  authDomain: "kalorydash.firebaseapp.com",
  projectId: "kalorydash",
  storageBucket: "kalorydash.firebasestorage.app",
  messagingSenderId: "894286733268",
  appId: "1:894286733268:web:a1f878e674e2758cf38041",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
