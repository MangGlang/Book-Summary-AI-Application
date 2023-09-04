import Modal from "@mui/material/Modal";
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";

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
      className="btn home__cta--btn">Login</button>

      {/* Modal: 2 props, "open={useState to handle open}", "onClose={funct to handle close}" */}
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="login__modal"
      >
        <div className="login__modal--container">
          <div className="login__content">
            <div className="login__modal--header">Log in to Summarist</div>

            {/* Login Buttons */}
            <button className="btn home__cta--btn login__button--guest">
              <FaUserAlt className="guest__user--mask" />
              Login as a Guest
            </button>

            <div className="login__seperator">
              <span className="login__seperator--text">or</span>
            </div>
            <button className="btn home__cta--btn login__button--google">
              <FcGoogle className="guest__user--mask google__user--mask" />
              Login with Google
            </button>
            <div className="login__seperator">
              <span className="login__seperator--text">or</span>
            </div>

            {/* Login Form */}
            <div className="login__main--form">
              <input
                className="login__main--input"
                placeholder="Email Address"
                type={"email"}
              />
              <input
                className="login__main--input"
                placeholder="Password"
                type={"password"}
              />
              <button className="btn">Login</button>
            </div>
          </div>

          {/* Forgot Password/No Account */}
          <div className="login__password--forgot">Forgot your password?</div>
          <div className="login__password--forgot login__account--creation">
            Don't have an account?
          </div>
          <AiOutlineCloseCircle
          onClick={() => dispatch(closeLoginModal())}
          className="login__closeModal" />
        </div>
      </Modal>
    </>
  );
}
