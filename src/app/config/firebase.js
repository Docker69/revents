import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLEJ3ulsnMPzRAj057gXw_qIf1xoW0eGs",
  authDomain: "reventscourse-1ecd5.firebaseapp.com",
  projectId: "reventscourse-1ecd5",
  storageBucket: "reventscourse-1ecd5.appspot.com",
  messagingSenderId: "588340505846",
  appId: "1:588340505846:web:239c2d72ce1d37dbb310d7",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
