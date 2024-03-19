import React, { useEffect, useState } from "react";
import { initFirebase } from "@/firebase";
const auth = firebase;
import { getAuth } from "firebase/auth";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { getCheckoutUrl } from "@/stripe/StripePayment";
import { getPremiumStatus } from "@/stripe/getPremiumStatus";
import LoginModal from "./modals/LoginModal";

// import isUserPremium from "@/stripe/isUserPremium";

// need to get current users action; based on index.tsx file of "choose-plan"
const StripePayment = ({ planPremium, planPremiumPlus }) => {
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

    console.log("current user auth: " + auth.currentUser);
    // invoke hook above if any of these values change; checks if user is currently premium
  }, [app, auth.currentUser?.uid, auth.currrentUser]);

  // TODO: Update subscription plan in "settings" tab once user purchases a new plan.
  // access "firebaseKey" from under stripe invoices metadata and update sub plan.

  // Premium Button Upgrade
  const upgradeToPremium = async () => {
    const priceId = "price_1OVHsLF25pFdlPQkt1PUxBwP";
    setUpgradeOption("Premium");
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium!!");
  };

  // PremiumPlus Button Upgrade
  const upgradeToPremiumPlus = async () => {
    const priceId = "price_1OVHWAF25pFdlPQkTUnxMthk";
    setUpgradeOption("Premium+");
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Upgrade to Premium+");
  };

  const [upgradeOption, setUpgradeOption] = useState(null);

  return (
    <div>
      <>
        {/* {!planPremium || !planPremiumPlus ? <button>Upgrade</button> : null} */}

        {/* {upgradeOption ? "hello" : null} */}

        {planPremium ? (
            <LoginModal buttonText={"Upgrading to Premium"}></LoginModal>
        ) : null}

        {planPremiumPlus ? (
          <LoginModal buttonText={"Upgrading to Premium+"}></LoginModal>
        ) : null}
      </>

      {/* {isPremium ? (
        <h1>Here&apos;s a 🍪 for being subscribed to us.</h1>
      ) : (
        <button onClick={upgradeToPremium}>Upgrade to Premium</button>
      )} */}

      <button onClick={upgradeToPremium}>Upgrade to Premium!</button>

      {/* {isPremiumPlus ? (
        <h1>
          Here&apos;s two 🍪🍪&apos;s for being subscribed to us with Premium+.
        </h1>
      ) : null} */}
    </div>
  );
};

export default StripePayment;
