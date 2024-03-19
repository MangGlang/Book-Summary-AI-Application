import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { initFirebase } from "@/firebase";
const auth = firebase;
import { getAuth } from "firebase/auth";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { getCheckoutUrl } from "@/stripe/StripePayment";
import { getPremiumStatus } from "@/stripe/getPremiumStatus";

const Plans = ({
  subPlan,
  costOfPlan,
  trial,
  handleButtonBlur,
  handleButtonClick,
  isActive,
}) => {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();

  // const upgradeToPremium = async () => {
  //   const priceId = "price_1OVHsLF25pFdlPQkt1PUxBwP";
  //   const checkoutUrl = await getCheckoutUrl(app, priceId);
  //   router.push(checkoutUrl);
  //   console.log("Upgrade to Premium!");
  // };

  return (
    <div className="auth__main--form max-w-[668px]">
      <button
        className={`relative plans__style p-6 py-16 border-4 font-sans bg-[#f1f6f4] hover:cursor-pointer
         ${isActive ? "focus-bg-[#20ba68]" : "focus-bg-[#20ba68]"}`}
        onFocus={handleButtonClick}
        onBlur={handleButtonBlur}
      >
        {isActive ? (
          <FaRegDotCircle className="text-2xl absolute top-5" />
        ) : (
          <FaRegCircle className="text-2xl absolute top-5" />
        )}

        <div className="absolute left-[80px] top-4 flex flex-col text-left">
          <div className="text-[#032b41] text-lg font-bold">{subPlan}</div>
          <div className="text-[#032b41] text-2xl font-sans font-bold">
            {costOfPlan}
          </div>
          <div className="text-gray-500 mt-2">{trial}</div>
        </div>
      </button>
    </div>
  );
};

export default Plans;
