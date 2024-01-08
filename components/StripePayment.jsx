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

const StripePayment = () => {
  const app = initFirebase();
  const auth = getAuth(app);

  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

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

    // invoke hook above if any of these values change; checks if user is currently premium
  }, [app, auth.currentUser?.uid]);

  // set up premiumPlus button upgrade to direct user to stripe payment
      //   const upgradeToPremiumPlus = async () => {
      //     const priceId = "price_1OVHsLF25pFdlPQkt1PUxBwP";
      //     const checkoutUrl = await getCheckoutUrl(app, priceId);
      //     router.push(checkoutUrl);
      //     console.log("Upgrade to Premium");
      //   };
      
      const upgradeToPremium = async () => {
        const priceId = "price_1OVHsLF25pFdlPQkt1PUxBwP";
        const checkoutUrl = await getCheckoutUrl(app, priceId);
        router.push(checkoutUrl);
        console.log("Upgrade to Premium");
      };
      
  return (
    <div>
      {isPremium ? (
        <h1>Here's a 🍪 for being subscribed to us.</h1>
      ) : (
        <button onClick={upgradeToPremium}>Upgrade to Premium</button>
      )}
    </div>
  );
};

export default StripePayment;
