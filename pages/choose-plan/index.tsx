import Footer from "@/components/Footer";
import Plans from "@/components/Plans";

import PlansFeatures from "@/components/PlansFeatures";
import LoginModal from "@/components/modals/LoginModal";
import { useState } from "react";

import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";

export default function forYou() {
  return (
    <section id="choose-plan">
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

      <div className="plan__features flex flex-col mx-auto items-center h-screen">
        <div className="row">
          <div className="container">
            <div className="flex flex-col items-center justify-center">
              <PlansFeatures />

              <div className="section__header my-4 mb-8 text-[#032b41] text-3xl font-sans font-bold">
                Choose the plan that fits you
              </div>

              <Plans
                subPlan="Premium Plus Yearly"
                costOfPlan="$12.99/year"
                trial="7-day free trial included"
              />

              <Plans
                subPlan={"Premium Monthly"}
                costOfPlan="$1.99/month"
                trial="No trial included"
              />
              {/* <button>hello</button> */}
              <div className="flex flex-col items-center justify-center sticky bottom-0 bg-white p-4 w-[100%]">
                <div className="w-[300px] my-6">
                  {/* Button should not show loginModal, instead it should direct to a stripe payment. */}
                  <LoginModal buttonText="Start your free 7-day trial" />
                </div>
                <p className="text-gray-400 text-xs text-nowrap">
                  Cancel your trial at any time before it ends, and you won’t be
                  charged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
