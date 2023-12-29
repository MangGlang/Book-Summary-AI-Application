import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";
import LoginModal from "@/components/modals/LoginModal";
import { LuBookOpenCheck } from "react-icons/lu";
import { LuMic } from "react-icons/lu";
import { useRouter } from "next/router";

const CustomButtons = ({
  buttonStyle,
  logo,
  customText,
  id,
  subRequired,
}) => {
  const router = useRouter();

  function directUserToPlans() {
    // if status = "Premium", route user to player.
    if (user.subscriptionStatus == "Premium") {
      router.push(`/player/${id}`);
    }

    // if status = "Basic", and subRequired == true, then route user to plans.
    else if (
      user.subscriptionStatus == "Basic" &&
      subRequired == true
    ) {
      router.push("/choose-plan");
    }

    // if status = "Basic", and book subRequired == false, then proceed to player
    else router.push(`/player/${id}`);
  }

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("user email: " + user.email);

  return (
    <div className="flex py-6">
      <button
        className={buttonStyle}
        onClick={
          user.email
            ? () => directUserToPlans()
            : () => dispatch(openLoginModal())
        }
      >
        <div className="flex">
          {logo && React.cloneElement(logo, { className: "text-2xl" })}
        </div>
        <div className="flex">
          <p className="ml-2">{customText}</p>
        </div>
      </button>
    </div>
  );
};

export default CustomButtons;
