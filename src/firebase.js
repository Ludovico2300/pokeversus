// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYmLf02lMxsAnYrujNmjcW9TTFLj1FZ8Q",
  authDomain: "pokeversus-401a7.firebaseapp.com",
  projectId: "pokeversus-401a7",
  storageBucket: "pokeversus-401a7.appspot.com",
  messagingSenderId: "299685928525",
  appId: "1:299685928525:web:ea7800242344e3a0818604",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  // Initialize Firebase
}

const app = initializeApp(firebaseConfig);
const databaseUser = getAuth(app);
const databaseData = getDatabase();

export { databaseUser, databaseData };
