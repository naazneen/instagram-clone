// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAM6BeRfWWtavwDjw4bUgk_FQc2ier2XmM",
    authDomain: "instagram-naazneen.firebaseapp.com",
    databaseURL: "https://instagram-naazneen.firebaseio.com",
    projectId: "instagram-naazneen",
    storageBucket: "instagram-naazneen.appspot.com",
    messagingSenderId: "787925979808",
    appId: "1:787925979808:web:7547d3634fb26cad566fc5",
    measurementId: "G-LD1H4K4WXD"
    });
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


  export {db, auth, storage}; 