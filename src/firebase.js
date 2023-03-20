// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAdCEwTbnH9HVlJ8sOnislMxzW5K7R7HSQ",
    authDomain: "doe-tempo-50ccb.firebaseapp.com",
    projectId: "doe-tempo-50ccb",
    storageBucket: "doe-tempo-50ccb.appspot.com",
    messagingSenderId: "74245774231",
    appId: "1:74245774231:web:6051054ee9e590160342d2",
    measurementId: "G-5JPFNPSH7Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
