import app from "firebase/app"
import firebase from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyDypSkPmu3ow45xkqCYg17soeFw6JfhyJ0",
  authDomain: "proyector-integrador.firebaseapp.com",
  projectId: "proyector-integrador",
  storageBucket: "proyector-integrador.firebasestorage.app",
  messagingSenderId: "44937875659",
  appId: "1:44937875659:web:10c0dcbc9be19add360b4e"}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();