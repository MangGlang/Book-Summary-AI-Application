import Footer from "@/components/Footer";
import Plans from "@/components/Plans";

import PlansFeatures from "@/components/PlansFeatures";
import LoginModal from "@/components/modals/LoginModal";
import BasicAccordion from "@/components/BasicAccordion";
import StripePayment from "@/components/StripePayment";
import { useState } from "react";

// Stripe setup
import firebase from "firebase/app";
import "firebase/firestore";
// import { auth } from "@/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import usePremiumStatus from "@/stripe/usePremiumStatus";


export default function forYou() {
  // const [user, userLoading] = useAuthState(auth);
  // const userIsPremium = usePremiumStatus(user);

  return (
    <section id="choose-plan">
      <div>
        <div className="plan__header--container rounded-b-[240px] bg-[#032b41] w-[100%]">
          <div className="row flex flex-col items-center justify-center plan__header--wrapper">
            <div className="container">
              <div className="flex flex-col text-center mx-auto justify-center items-center">
                <div className="plan__header font-semibold text-white text-5xl leading-[64px]">
                  Get unlimited access to many amazing books to read
                </div>
                <div className="text-white text-xl mt-10">
                  Turn ordinary moments into amazing learning opportunities
                </div>
              </div>
            </div>
            <figure>
              <img
                src="/assets/pricing-top.png"
                alt=""
                width={340}
                className="pricing__top--style"
              />
            </figure>
          </div>
        </div>

        <div className="plan__features flex flex-col mx-auto items-center">
          <div className="row">
            <div className="container">
              <div className="flex flex-col items-center justify-center">
                <PlansFeatures />

                <div className="section__header my-4 mb-8 text-[#032b41] text-3xl font-sans font-bold">
                  Choose the plan that fits you
                </div>

                <Plans
                  subPlan="Premium Plus Yearly"
                  costOfPlan="$99.99/year"
                  trial="7-day free trial included"
                />

                <Plans
                  subPlan={"Premium Monthly"}
                  costOfPlan="$10.00/month"
                  trial="No trial included"
                />
                <div className="flex flex-col items-center justify-center sticky bottom-0 bg-white p-4 w-[100%]">
                  <StripePayment />
                  <p className="text-gray-400 text-xs text-nowrap my-4">
                    Cancel your trial at any time before it ends, and you won’t
                    be charged.
                  </p>
                </div>

                <div className="mx-auto flex flex-col items-center justify-center row">
                  <BasicAccordion
                    title="How does the free 7-day trial work?"
                    body="Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."
                    panelNum="1"
                  />
                  <BasicAccordion
                    title="Can I switch subscriptions from monthly to yearly, or yearly to monthly?"
                    body="While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."
                    panelNum="2"
                  />
                  <BasicAccordion
                    title="What's included in the Premium plan?"
                    body="Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."
                    panelNum="3"
                  />
                  <BasicAccordion
                    title="Can I cancel during my trial or subscription?"
                    body="You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."
                    panelNum="4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
}
