import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

const firebaseConfig = {
    apiKey: "AIzaSyDbRqGLmdWqq2GtqGfUPBvC3HUF1SGsYyg",
    authDomain: "react-app-curso-363c3.firebaseapp.com",
    databaseURL: "https://react-app-curso-363c3.firebaseio.com",
    projectId: "react-app-curso-363c3",
    storageBucket: "react-app-curso-363c3.appspot.com",
    messagingSenderId: "329839401304",
    appId: "1:329839401304:web:5f45cb1494d925f179ad2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}