// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9C4N1D8yofHsAELOCLRPWmVWCm_lS4PA",
  authDomain: "jobboard-2deee.firebaseapp.com",
  projectId: "jobboard-2deee",
  storageBucket: "jobboard-2deee.appspot.com",
  messagingSenderId: "912524121522",
  appId: "1:912524121522:web:32472041ec5f463b83c0ab",
  measurementId: "G-LFW2LK1CP6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// Montassar config :
// const firebaseConfig = {
//   apiKey: "AIzaSyA9C4N1D8yofHsAELOCLRPWmVWCm_lS4PA",
//   authDomain: "jobboard-2deee.firebaseapp.com",
//   projectId: "jobboard-2deee",
//   storageBucket: "jobboard-2deee.appspot.com",
//   messagingSenderId: "912524121522",
//   appId: "1:912524121522:web:32472041ec5f463b83c0ab",
//   measurementId: "G-LFW2LK1CP6"
// };

// oussama config :
// const firebaseConfig = {
//   apiKey: "AIzaSyAd1yTn80sc-UEQrMHSqMyHEwspFqKbcQk",
//   authDomain: "jobboard-36ea6.firebaseapp.com",
//   projectId: "jobboard-36ea6",
//   storageBucket: "jobboard-36ea6.appspot.com",
//   messagingSenderId: "16441470326",
//   appId: "1:16441470326:web:137536d4a48abf53205e57",
//   measurementId: "G-9ZWCYTP668"
// };
