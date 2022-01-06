// import firebase from "firebase";
// import "firebase/firestore";

// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";
// import { auth } from "firebase/auth";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGz74xQaL7W1Yg2GGakkZXXKBsC72nEZM",
  authDomain: "whatsapp-clone-16e6f.firebaseapp.com",
  projectId: "whatsapp-clone-16e6f",
  storageBucket: "whatsapp-clone-16e6f.appspot.com",
  messagingSenderId: "718244300155",
  appId: "1:718244300155:web:22f7eb5d60135dda77e9de",
  measurementId: "G-3KLNRE5D2M",
};

initializeApp(firebaseConfig);
const db = getFirestore();
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();

// const auth = firebase.auth();
const auth = getAuth();
// const provider = new firebase.auth.GoogleAuthProvider();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
