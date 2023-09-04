import Modal from "@mui/material/Modal";
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  closeLoginModal,
  closeSignUpModal,
  openSignUpModal,
} from "@/redux/modalSlice";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signUpModalOpen);
  // use modalSlice functions using dispatch hook
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => dispatch(openSignUpModal())}
        className="auth__password--forgot auth__account--creation"
      >
        Don't have an account?
      </div>

      {/* Modal: 2 props, "open={useState to handle open}", "onClose={funct to handle close}" */}
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        className="auth__modal"
      >
        <div className="auth__modal--container signUp__modal--container">
          <div className="auth__content">
            <div className="auth__modal--header signUp__modal--header">Sign up to Summarist</div>

            <button className="btn home__cta--btn auth__button--google">
              <FcGoogle className="guest__user--mask google__user--mask" />
              Sign up with Google
            </button>
            <div className="auth__seperator">
              <span className="auth__seperator--text">or</span>
            </div>

            {/* Auth Form */}
            <div className="auth__main--form">
              <input
                className="auth__main--input"
                placeholder="Email Address"
                type={"email"}
              />
              <input
                className="auth__main--input"
                placeholder="Password"
                type={"password"}
              />
              <button className="btn">Sign up</button>
            </div>
          </div>

          <div 
          onClick={() => dispatch(closeSignUpModal())}
          className="auth__password--forgot auth__account--creation">
            Already have an account?
          </div>

          {/* Forgot Password/No Account */}
          <AiOutlineCloseCircle
            onClick={() => dispatch(closeSignUpModal())}
            className="auth__closeModal"
          />
        </div>
      </Modal>
    </>
  );
}
