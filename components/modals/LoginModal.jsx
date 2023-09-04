import Modal from "@mui/material/Modal";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import SignupModal from "@/components/modals/SignupModal";
import ForgotPassModal from "@/components/modals/ForgotPassModal";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Link from "next/link";

export default function LoginModal() {
  const [guestLoading, setGuestLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleClose = () => setIsOpen(false);
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  // use modalSlice functions using dispatch hook
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleGuestSignIn() {
    setGuestLoading(true);
    await signInWithEmailAndPassword(
      auth,
      "guest123321@gmail.com",
      "guest123321@gmail.com"
    );
    console.log("guest");
    setTimeout(() => {
      setGuestLoading(false);
    }, 500);
  }

  async function handleSignIn() {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    // minhleenl@gmail.com
    console.log(email);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

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
            <button
              onClick={handleGuestSignIn}
              className="btn home__cta--btn auth__button--guest"
            >
              {guestLoading ? (
                // <Link> ; route to new page "for-you"
                <AiOutlineLoading3Quarters className="button__loading--spin icon-spin" />
              ) : (
                // </Link>
                <div className="button__loading--center">
                  <FaUserAlt className="guest__user--mask" />
                  {"Log in as Guest"}
                </div>
              )}
            </button>

            <div className="auth__seperator">
              <span className="auth__seperator--text">or</span>
            </div>
            <button className="btn home__cta--btn auth__button--google">
              {/* TODO: Fix spinner loading state by implementing google auth */}
              {googleLoading ? (
                // <Link> ; route to new page "for-you"
                <AiOutlineLoading3Quarters className="button__loading--spin icon-spin" />
              ) : (
                // </Link>
                <div className="button__loading--center">
                  <FcGoogle className="guest__user--mask google__user--mask" />
                  {"Log in with Google"}
                </div>
              )}
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="auth__main--input"
                placeholder="Password"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignIn} className="btn">
                {/* TODO: Stop spinner animation when shown error "Firebase: Error (auth/invalid-email)." */}
              {loading ? (
                // <Link> ; route to new page "for-you"
                <AiOutlineLoading3Quarters className="button__loading--spin icon-spin" />
              ) : (
                // </Link>
                <div className="button__loading--center">
                  {"Login"}
                </div>
              )}
              </button>
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
