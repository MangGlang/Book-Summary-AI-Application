// Stripe must be PCI compliant; loaded from Stripe.js ES Module
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { setSubscriptionStatus } from "@/redux/userSlice";

let stripePromise: Stripe | null = null;

const initializeStripe = async () => {
  const dispatch = useDispatch();

  if (!stripePromise) {
    try {
      stripePromise = await loadStripe(
        "pk_test_51OUpT7F25pFdlPQkJlcasnHmiXBNWs2cX75Re51P1y366BlnBeNjE96d2KhdBOS46zRSI14hfMEqTdpluiBAbXsO00qvGOOrhj"
      );

      if (stripePromise) {
        // Set up Stripe event listener for checkout.session.completed
        window.addEventListener(
          "stripe-checkout.session.completed",
          async (event: any) => {
            // Handle the completion event, e.g., update subscription status on the server
            const sessionId = event.detail.id;
            try {
              // Fetch session details from your Cloud Function
              const sessionDetails = await fetch(
                `https://virtual-internship-v2.cloudfunctions.net/updateSessionDetails?sessionId=${sessionId}`
              );
              const { subscriptionType } = await sessionDetails.json();

              // Example: Dispatch actions based on subscriptionType
              if (subscriptionType === "premium") {
                dispatch(setSubscriptionStatus("premium"));
              } else if (subscriptionType === "premium-plus") {
                dispatch(setSubscriptionStatus("premium-plus"));
              } else {
                console.error("Unknown subscription type:", subscriptionType);
              }
            } catch (error) {
              console.error("Error updating subscription status:", error);
            }
          }
        );
      }
    } catch (error) {
      console.error("Error setting up Stripe:", error);
    }
  }

  return stripePromise;
};

export default initializeStripe;
