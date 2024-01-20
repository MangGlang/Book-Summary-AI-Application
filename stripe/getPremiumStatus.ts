import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
// import { useEffect, useState } from "react";
// import isUserPremium from "./isUserPremium";

// const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

// pass in an instance of the app, and retrieve user info from that instance
export const getPremiumStatus = async (app: FirebaseApp) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User not logged in");

//   use reference of current database in cloudstore and basically check to see subscriptions item to see if a subscription is active.
  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "users", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  // useEffect(() => {
  //   if (auth.currentUser) {
  //     const checkPremiumStatus = async function () {
  //       setPremiumStatus(await isUserPremium());
  //     }
  //     checkPremiumStatus();
  //   }
  // }, [auth.currentUser]
  // )

// waits for response to see if user is current trialing or active; once found, prompts whether user has either.
  return new Promise<boolean>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // In this implementation we only expect one active or trialing subscription to exist.
        console.log("Subscription snapshot", snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          console.log("No active or trialing subscriptions found");
          resolve(false);
        } else {
          console.log("Active or trialing subscription found");
          resolve(true);
        }
        unsubscribe();
      },
      reject
    );
  });
};