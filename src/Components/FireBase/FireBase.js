// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnkebZNQEbejPeLviBVMgEm54v0ZRblzA",
    authDomain: "filmyverse-eaeae.firebaseapp.com",
    projectId: "filmyverse-eaeae",
    storageBucket: "filmyverse-eaeae.appspot.com",
    messagingSenderId: "950130152748",
    appId: "1:950130152748:web:25978b226b2f6bc55bc889",
    measurementId: "G-E1755NCRR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
export default app;
