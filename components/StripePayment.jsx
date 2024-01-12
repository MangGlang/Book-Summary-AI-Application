import React, { useEffect, useState } from "react";
import firebase, { initFirebase } from "@/firebase";
const auth = firebase;
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { getAuth } from "firebase/auth";

import LoginModal from "./modals/LoginModal";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { getCheckoutUrl } from "@/stripe/StripePayment";
import { getPremiumStatus } from "@/stripe/getPremiumStatus";

// need to get current users action; based on index.tsx file of "choose-plan"
const StripePayment = () => {
  const app = initFirebase();
  const auth = getAuth(app);

  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [isPremiumPlus, setIsPremiumPlus] = useState(false);

  //   async function must be called in a hook
  useEffect(() => {
    // function checks if user is available
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();

    const checkPremiumPlus = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
        setIsPremiumPlus(newPremiumStatus);
    };
    checkPremiumPlus();

    // invoke hook above if any of these values change; checks if user is currently premium
  }, [app, auth.currentUser?.uid]);

  // TODO: Update subscription plan in "settings" tab once user purchases a new plan.
  // access "firebaseKey" from under stripe invoices metadata and update sub plan.


  // Premium Button Upgrade
  const upgradeToPremium = async () => {
    const priceId = "price_1OVHsLF25pFdlPQkt1PUxBwP";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium");
  };
  // PremiumPlus Button Upgrade
  const upgradeToPremiumPlus = async () => {
    const priceId = "price_1OVHWAF25pFdlPQkTUnxMthk";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium+");
  };

  return (
    <div>
      {isPremium ? (
        <h1>Here's a 🍪 for being subscribed to us.</h1>
      ) : (
        <button onClick={upgradeToPremium}>Upgrade to Premium</button>
      )}

      {isPremiumPlus ? (
        <h1>Here's a 🍪 for being subscribed to us with Premium+.</h1>
      ) : (
        null
      )}
    </div>
  );
};

export default StripePayment;
