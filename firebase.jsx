// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Enables use of firebases authentication API's
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzMOliX1r2-WoDupyaKPY66ivK5VMOh_o",
  authDomain: "virtual-internship-v2.firebaseapp.com",
  projectId: "virtual-internship-v2",
  storageBucket: "virtual-internship-v2.appspot.com",
  messagingSenderId: "507040429734",
  appId: "1:507040429734:web:a57e20a327847ea9bda667",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// exporting auth = enable use in other codes
export const auth = getAuth(app);

export async function signInWithGoogle() {
  // Google Sign in Pop up will work, but without getting information, cannot access throughout app
  // signInWithPopup: returns a promise, which is handled by accessing result variable
  return signInWithPopup(auth, provider);
};
// export async function signInWithGoogle() {
//   // Google Sign in Pop up will work, but without getting information, cannot access throughout app
//   // signInWithPopup: returns a promise, which is handled by accessing result variable
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // function: Return information of user after they authenticate
//       const name = result.user.displayName;
//       const email = result.user.email;
//       console.log(result)
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode);
//       console.log("\n" + errorMessage);
//       alert(errorCode)
//       alert(errorMessage)
//     });
// };
