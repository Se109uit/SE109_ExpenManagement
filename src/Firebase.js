// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: process.env.REDIRECT_API_KEY,
     authDomain: "face-e4951.firebaseapp.com",
     projectId: "face-e4951",
     storageBucket: "face-e4951.appspot.com",
     messagingSenderId: "921149471053",
     appId: "1:921149471053:web:2638deacf8184eaf305f04",
     measurementId: "G-FJR7EV8YCP",
   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);