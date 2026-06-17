import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, getDocs, collection, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json"; // Or load via import.meta.env if moved

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
