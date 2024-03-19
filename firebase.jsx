// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Enables use of firebases authentication API's
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "firebase/firestore";
import "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
}

const firestore = getFirestore(app);
export { firestore };

const provider = new GoogleAuthProvider();

// exporting auth = enable use in other codes
export const auth = getAuth(app);

export async function signInWithGoogle() {
  try {
    // Sign in with Google and get user credentials
    const userCredentials = await signInWithPopup(auth, provider);

    // Add user to the 'users' collection
    const userRef = doc(firestore, "users", userCredentials.user.uid);
    await setDoc(userRef, {
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
      name: userCredentials.user.displayName,
      provider: userCredentials.user.providerData[0].providerId,
      photoUrl: userCredentials.user.photoURL,
    });

    console.log("User added to Firestore:", userCredentials.user);

    return userCredentials;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function signUpWithEmail(email, password) {
  try {
    // Sign in with Google and get user credentials
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Add user to the 'users' collection
    const userRef = doc(firestore, "users", userCredentials.user.uid);
    await setDoc(userRef, {
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
      name: userCredentials.user.displayName,
      provider: userCredentials.user.providerData[0].providerId,
      photoUrl: userCredentials.user.photoURL,
    });

    console.log("User added to Firestore using Email:", userCredentials.user);

    return userCredentials;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

// Updated Changes