import React from "react";
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";
import LoginModal from "@/components/modals/LoginModal";
import { LuBookOpenCheck } from "react-icons/lu";
import { LuMic } from "react-icons/lu";

const CustomButtons = ({ buttonStyle, logo, customText }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex py-6">
      <button
        className={buttonStyle}
        onClick={() => dispatch(openLoginModal())}
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
