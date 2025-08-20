// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCdqajo3cUTv5rq9p8M6sWv2SGZqJvvEo8",
  authDomain: "freelancer-student.firebaseapp.com",
  projectId: "freelancer-student",
  storageBucket: "freelancer-student.firebasestorage.app",
  messagingSenderId: "242073459318",
  appId: "1:242073459318:web:ac9213feb6036b7b065d57",
  measurementId: "G-10MT8JGJGW"
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const firestore = getFirestore(app)
const provider = new GoogleAuthProvider()

export { app, auth, firestore, provider } 