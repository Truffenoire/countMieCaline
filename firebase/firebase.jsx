// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeQ24BQGJUo2h3IimiFBDVh30gUGb35wk",
  authDomain: "premier-projet-18d54.firebaseapp.com",
  projectId: "premier-projet-18d54",
  storageBucket: "premier-projet-18d54.appspot.com",
  messagingSenderId: "709345050116",
  appId: "1:709345050116:web:5177d46a732f80f14b3f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
