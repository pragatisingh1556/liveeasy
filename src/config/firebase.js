// firebase config - connect our app to firebase
// get these values from Firebase Console > Project Settings

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// initialize firebase
var app = initializeApp(firebaseConfig);

// auth and database
var auth = getAuth(app);
var db = getFirestore(app);

export { auth, db };
