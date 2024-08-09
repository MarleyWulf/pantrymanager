// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK3r2WTcnahBrzjsTXDkpHpqNlCXOdCSM",
  authDomain: "pantryapp-e11a6.firebaseapp.com",
  projectId: "pantryapp-e11a6",
  storageBucket: "pantryapp-e11a6.appspot.com",
  messagingSenderId: "300459007676",
  appId: "1:300459007676:web:ed95c971c0ef5fca90bab9",
  measurementId: "G-FQKV5DJ1F0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
