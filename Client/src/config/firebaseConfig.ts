// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd1yTn80sc-UEQrMHSqMyHEwspFqKbcQk",
  authDomain: "jobboard-36ea6.firebaseapp.com",
  projectId: "jobboard-36ea6",
  storageBucket: "jobboard-36ea6.appspot.com",
  messagingSenderId: "16441470326",
  appId: "1:16441470326:web:137536d4a48abf53205e57",
  measurementId: "G-9ZWCYTP668"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const analytics = getAnalytics(app);

export {app,auth,analytics}