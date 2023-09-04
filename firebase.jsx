// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Enables use of firebases authentication API's 
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzMOliX1r2-WoDupyaKPY66ivK5VMOh_o",
  authDomain: "virtual-internship-v2.firebaseapp.com",
  projectId: "virtual-internship-v2",
  storageBucket: "virtual-internship-v2.appspot.com",
  messagingSenderId: "507040429734",
  appId: "1:507040429734:web:a57e20a327847ea9bda667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// exporting auth = enable use in other codes
export const auth = getAuth(app);