import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { collection, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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
    console.log(error);
    alert("User Not Found");
  }
};

export const changePasswordService = async ({
  oldPassword,
  newPassword,
  email,
  callback = () => {},
}: {
  oldPassword: string;
  newPassword: string;
  email: string;
  callback?: () => void;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      oldPassword
    );

    const user = userCredential.user;

    await updatePassword(user, newPassword);

    console.log("Password updated successfully");
    callback();
  } catch (error: any) {
    console.error("Password change error:", error);
    alert("Failed to change password: " + error.message);
  }
};

export const updateUserDataService = async ({
  newEmail,
  fullName,
  height = 0,
  weight = 0,
  callback = () => {},
}: {
  newEmail: string;
  fullName: string;
  height: number;
  weight: number;
  callback?: () => void;
}) => {
  try {
    const user = auth.currentUser;
    const uid = (user as any).uid;

    // Get user data from Firestore
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User not found in Firestore.");
    }

    const userData = userDoc.data();
    const currentEmail = userData.email;

    // Update email in Firebase Auth if changed
    if (currentEmail !== newEmail) {
      await updateEmail(user as any, newEmail);
      await sendEmailVerification(user as any);

      console.log("Verification email sent to new address.");

      alert(
        "A verification email has been sent to your new address. Please verify before changes take effect."
      );

      // Skip Firestore + AsyncStorage updates until verified
      return;
    }

    // Update Firestore
    await updateDoc(userRef, {
      fullName,
      email: newEmail,
      weight,
      height,
    });
    console.log("User data updated in Firestore.");

    // Update local storage
    const updatedUserData = {
      ...userData,
      fullName,
      email: newEmail,
      weight,
      height,
    };
    await AsyncStorage.setItem("user", JSON.stringify(updatedUserData));
    console.log("User data updated in AsyncStorage.");

    callback();
  } catch (error: any) {
    console.error("Update user error:", error);
    alert("Failed to update user: " + error.message);
  }
};
