import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const SubscriptionDetails = ({ userId, subscriptionId }) => {
  const [firebaseKey, setFirebaseKey] = useState(null);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const db = getFirestore();
        const subscriptionRef = doc(
          db,
          "users",
          userId,
          "subscriptions",
          subscriptionId
        );

        const subscriptionSnapshot = await getDoc(subscriptionRef);
        if (subscriptionSnapshot.exists()) {
          const productMetadata =
            subscriptionSnapshot.data()?.items[0]?.plan?.product?.metadata;
          const key = productMetadata?.firebaseKey || null;
          setFirebaseKey(key);
        } else {
          console.error("Subscription not found");
        }
      } catch (error) {
        console.error("Error fetching subscription details", error);
      }
    };

    fetchSubscriptionDetails();
  }, [userId, subscriptionId]);

  return (
    <div>
      <h1>Subscription Details</h1>
      {firebaseKey && <p>Firebase Key: {firebaseKey}</p>}
    </div>
  );
};

export default SubscriptionDetails;
