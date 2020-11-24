import firebase from 'firebase/app';
import 'firebase/database';

// Firebase Configuration
var firebaseConfig = {
  apiKey: "AIzaSyDGavUdzwBfqEVhF7FCZg4UI4y8zSspI0A",
  authDomain: "taboo-ba4b2.firebaseapp.com",
  databaseURL: "https://taboo-ba4b2.firebaseio.com",
  projectId: "taboo-ba4b2",
  storageBucket: "taboo-ba4b2.appspot.com",
  messagingSenderId: "524550543168",
  appId: "1:524550543168:web:9f8086719b706d21d28ca5",
  measurementId: "G-CG62TLYEWN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

export default db;