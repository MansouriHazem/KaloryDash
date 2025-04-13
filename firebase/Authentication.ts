import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = async ({
  fullName,
  email,
  password,
  callback = () => {},
}: {
  fullName: string;
  email: string;
  password: string;
  callback: any;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    });

    const userDoc = await getDoc(doc(db, "users", user.uid));
    await AsyncStorage.setItem("user", JSON.stringify(userDoc.data()));
    await AsyncStorage.setItem("logged", "true");

    callback();

    console.log("User registered & saved to Firestore");
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email already in use.");
    } else {
      console.error("Register error:", error);
    }
  }
};

export const login = async ({
  email,
  password,
  callback = () => {},
}: {
  email: string;
  password: string;
  callback: any;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      await AsyncStorage.setItem("user", JSON.stringify(userDoc.data()));
      await AsyncStorage.setItem("logged", "true");
      callback();
      console.log("User logged in:", userData);
    } else {
      console.warn("No user data found in Firestore");
    }
  } catch (error: any) {
    alert("User Not Found");
  }
};
