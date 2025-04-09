// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA0dehHnDliznK8K7UQlKG0TtWyzn-JJ2w",
  authDomain: "codepractica.firebaseapp.com",
  projectId: "codepractica",
  storageBucket: "codepractica.firebasestorage.app",
  messagingSenderId: "361160359096",
  appId: "1:361160359096:web:01bde3962398863fea484d",
  measurementId: "G-E9GDWZEKWS"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
