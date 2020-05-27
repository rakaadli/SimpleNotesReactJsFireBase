import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAisKfSEaoVKp4_c0H-OgIaBSu5NieA1Lc",
  authDomain: "simple-notes-firebase-5f3fa.firebaseapp.com",
  databaseURL: "https://simple-notes-firebase-5f3fa.firebaseio.com",
  projectId: "simple-notes-firebase-5f3fa",
  storageBucket: "simple-notes-firebase-5f3fa.appspot.com",
  messagingSenderId: "965623281320",
  appId: "1:965623281320:web:884cf51746e915327ff49d",
  measurementId: "G-3WFF4XQDZM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Get a reference to the database service
export const database = firebase.database();

export default firebase;
