import app from "firebase/app"
import firebase from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyDgzA26EkzmWmVmXIcVFmzJ3R_CS7riPJ8",
  authDomain: "mi-proyecto-en-firebase-a6ea8.firebaseapp.com",
  projectId: "mi-proyecto-en-firebase-a6ea8",
  storageBucket: "mi-proyecto-en-firebase-a6ea8.firebasestorage.app",
  messagingSenderId: "247674507869",
  appId: "1:247674507869:web:309dfd6a9cd5116e6af3b4"
};


firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const db = app.firestore();