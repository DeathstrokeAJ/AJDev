// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCCpMQclWkViwHbRV5c06PNnRPOMybg3PQ",
  authDomain: "tidal-cipher-414619.firebaseapp.com",
  projectId: "tidal-cipher-414619",
  storageBucket: "tidal-cipher-414619.appspot.com",
  messagingSenderId: "577034020305",
  appId: "1:577034020305:web:5218adbe7086f5a92d6cf0",
  measurementId: "G-8GC5QP40PM"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const firestore = getFirestore(app)
const provider = new GoogleAuthProvider()

export { app, auth, firestore, provider } 