import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDecSVQPrmmDIL4j34VWXz8dJpcw3obRiU",
  authDomain: "favourquest-f29f8.firebaseapp.com",
  projectId: "favourquest-f29f8",
  storageBucket: "favourquest-f29f8.appspot.com",
  messagingSenderId: "945330660980",
  appId: "1:945330660980:web:baba37c32dfd9474101321",
  measurementId: "G-4G9Y0E941D",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

//npm install -g firebase-tools
// firebase login
// firebase init
// firebase deploy
