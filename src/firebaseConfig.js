// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import storage

const firebaseConfig = {
  apiKey: "AIzaSyBkKv2AGeEC9ghTn5cJSrvaqDgEgthU2Ss",
  authDomain: "study-hub-9c460.firebaseapp.com",
  projectId: "study-hub-9c460",
  storageBucket: "study-hub-9c460.appspot.com",
  messagingSenderId: "926419342978",
  appId: "1:926419342978:web:715a7546fdaf572a7a469b",
  measurementId: "G-4HXXQXPEFD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Export storage
