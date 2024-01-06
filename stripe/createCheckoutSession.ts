// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import "firebase/compat/auth";
// import { DocumentSnapshot } from "firebase/firestore";
// import getStripe from "./initializeStripe";
// import initializeStripe from "./initializeStripe";
import firebase from "@/firebase"
import getStripe from "./initializeStripe";



// ... other imports ...

export async function createCheckoutSession(uid: string) {
  try {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      const firestore = firebase.firestore();

      // Create a new checkout session in the subcollection inside this user's document
      const checkoutSessionRef = await firestore
        .collection("users")
        .doc(uid)
        .collection("checkout_sessions")
        .add({
          price: "price_1OUq20F25pFdlPQkfeY0ojsI",
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        });

      // Wait for the CheckoutSession to get attached by the extension
      // essentially, this will listen for changes on the document and check to see if we have a valid session id.
      checkoutSessionRef.onSnapshot(async (snap) => {
        const { sessionId } = snap.data();
        if (sessionId) {
          // We have a session, let's redirect to checkout
          // Init stripe
          const stripe = await getStripe();
          if (stripe) {
            stripe.redirectToCheckout({ sessionId });
          }
        }
      });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    // Handle the error, e.g., show a message to the user
  }
}
