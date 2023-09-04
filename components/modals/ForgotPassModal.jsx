import Modal from "@mui/material/Modal";
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  closeForgotModal,
  closeSignUpModal,
  openForgotModal,
} from "@/redux/modalSlice";

export default function ForgotPassModal() {
  const isOpen = useSelector((state) => state.modals.forgotPasswordModalOpen);
  // use modalSlice functions using dispatch hook
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => dispatch(openForgotModal())}
        className="auth__password--forgot"
      >
        Forgot your password?
      </div>

      {/* Modal: 2 props, "open={useState to handle open}", "onClose={funct to handle close}" */}
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeForgotModal())}
        className="auth__modal"
      >
        <div className="auth__modal--container forgotPassword__modal--container">
          <div className="auth__content">
            <div className="auth__modal--header signUp__modal--header">
              Reset your password
            </div>

            {/* Auth Form */}
            <div className="auth__main--form">
              <input
                className="auth__main--input"
                placeholder="Email Address"
                type={"email"}
              />
            </div>

            <button className="btn">Send reset password link</button>

            {/* Forgot Password/No Account */}
            <AiOutlineCloseCircle
              onClick={() => dispatch(closeForgotModal())}
              className="auth__closeModal"
            />
          </div>
          <div
            onClick={() => dispatch(closeForgotModal())}
            className="auth__password--forgot auth__account--creation"
          >
            Go to login
          </div>
        </div>
      </Modal>
    </>
  );
}
