import React, { useEffect, useState } from "react";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoginModal from "@/components/modals/LoginModal";
import { FirebaseApp } from "firebase/app";
import SubscriptionDetails from "@/components/SubscriptionDetails";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function Settings() {
  const dispatch = useDispatch();
  const subscriptionStatus = useSelector(
    (state: any) => state.user.subscriptionStatus
  );
  const router = useRouter();

  const user = useSelector((state: any) => state.user);

  function routeUserToPlans() {
    router.push("/choose-plan");
  }

  const [subscriptionId, setSubscriptionId] = useState(null);

  useEffect(() => {
    const fetchSubscriptionId = async () => {
      try {
        // Assuming you have the user's ID available
        const userId = user.uid;

        // Replace this with your actual Firebase setup and logic to fetch subscriptionId
        const db = getFirestore();
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userSubscriptionId = userSnapshot.data()?.subscriptionId;
          setSubscriptionId(userSubscriptionId);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching subscriptionId", error);
      }
    };

    fetchSubscriptionId();
  }, [user.uid]);

  return (
    <section id="for-you">
      <div className="flex">
        <Sidebar />

        <div className="flex-row max-w-[100%] w-full">
          <Search />
          <div className="row">
            <div className="container">
              <div className="text-3xl font-bold max-w-[100%] text-[#032b41] py-4 border-b">
                Settings
              </div>

              {!user.email ? (
                <div className="flex flex-col mx-auto items-center justify-center">
                  <figure>
                    <img
                      src="/assets/login.png"
                      alt=""
                      height={460}
                      width={460}
                    />
                  </figure>
                  <div className="text-2xl font-bold max-w-[100%] text-[#032b41] mb-4">
                    Log in to see your details.
                  </div>
                  <button>
                    <LoginModal buttonText={`Login`} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col border-b py-4">
                    <div className="text-lg font-bold max-w-[100%] text-[#032b41] ">
                      Your Subscription plan
                    </div>
                    <p className="text-[#032b41]">
                      {!user.email ? (
                        "N/A: Please login."
                      ) : (
                        <>
                          {user.subscriptionStatus}
                          {user.subscriptionStatus === "Basic" && (
                            <button
                              onClick={routeUserToPlans}
                              className="flex flex-col text-[#032b41] bg-[#2bd97c] font-medium p-3 mt-2 rounded"
                            >
                              Upgrade to Premium
                            </button>
                          )}
                          {/* Display SubscriptionDetails component */}
                          <SubscriptionDetails
                            userId={user.uid}
                            subscriptionId={subscriptionId}
                          />
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-lg font-bold max-w-[100%] text-[#032b41] pt-6">
                      Email
                    </div>
                    <p className="text-[#032b41]">
                      {!user.email ? "N/A: Please login." : user.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
