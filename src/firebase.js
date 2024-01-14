import firebase from 'firebase/compat/app'; //2. import the firebase dependency,
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// 1. Copy and past the config and run yarn add firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7x40txoWNvOxiG0R-CLc5-mDozuQh-4k",
  authDomain: "linkedin-clone-dfa2d.firebaseapp.com",
  projectId: "linkedin-clone-dfa2d",
  storageBucket: "linkedin-clone-dfa2d.appspot.com",
  messagingSenderId: "570935428549",
  appId: "1:570935428549:web:96299087619f8337d737ac",
  measurementId: "G-J66SQY146X"
};

const firebaseApp = firebase.initializeApp(firebaseConfig) //3. This line connects everything
const db = firebaseApp.firestore(); //4. Get the database.
const auth = firebase.auth(); //5. get the authentication

export {db, auth}; // 6. export the variables