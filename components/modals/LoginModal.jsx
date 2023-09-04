import Modal from "@mui/material/Modal";
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import SignupModal from "@/components/modals/SignupModal";
import ForgotPassModal from "@/components/modals/ForgotPassModal";

export default function LoginModal() {
  // const [isOpen, setIsOpen] = useState(true);

  // const handleClose = () => setIsOpen(false);
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  // use modalSlice functions using dispatch hook
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="btn home__cta--btn"
      >
        Login
      </button>

      {/* Modal: 2 props, "open={useState to handle open}", "onClose={funct to handle close}" */}
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="auth__modal"
      >
        <div className="auth__modal--container">
          <div className="auth__content">
            <div className="auth__modal--header">Log in to Summarist</div>

            {/* auth Buttons */}
            <button className="btn home__cta--btn auth__button--guest">
              <FaUserAlt className="guest__user--mask" />
              Log in as a Guest
            </button>

            <div className="auth__seperator">
              <span className="auth__seperator--text">or</span>
            </div>
            <button className="btn home__cta--btn auth__button--google">
              <FcGoogle className="guest__user--mask google__user--mask" />
              Log in with Google
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
              <button className="btn">Login</button>
            </div>
          </div>

          {/* Forgot Password/No Account */}
          <ForgotPassModal />
          {/* <div className="auth__password--forgot auth__account--creation">
            Don't have an account?
          </div> */}

          <SignupModal />
          <AiOutlineCloseCircle
            onClick={() => dispatch(closeLoginModal())}
            className="auth__closeModal"
          />
        </div>
      </Modal>
    </>
  );
}
