// Stripe must be PCI compliant; loaded from Stripe.js ES Module
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51OUpT7F25pFdlPQkJlcasnHmiXBNWs2cX75Re51P1y366BlnBeNjE96d2KhdBOS46zRSI14hfMEqTdpluiBAbXsO00qvGOOrhj"
    );
  }
  return stripePromise;
};

export default initializeStripe;
