// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDql0kVbq_q35tRgnvqDtRo8wK8aFtP7QU",
    authDomain: "house-marketplace-app-884d3.firebaseapp.com",
    projectId: "house-marketplace-app-884d3",
    storageBucket: "house-marketplace-app-884d3.appspot.com",
    messagingSenderId: "1014357089195",
    appId: "1:1014357089195:web:4930d60886eef14f0710ee",
    measurementId: "G-HV3NSXLYZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();