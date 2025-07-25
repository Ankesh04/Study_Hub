import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Save progress
export const saveProgress = async (uid, data) => {
  const userRef = doc(db, "progress", uid);
  await setDoc(userRef, data, { merge: true });
};

// Get progress
export const getProgress = async (uid) => {
  const userRef = doc(db, "progress", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
};
