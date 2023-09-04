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

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "@/redux/userSlice";

export default function SignupModal() {
  const [loading, setLoading] = useState(false);
  const isOpen = useSelector((state) => state.modals.signUpModalOpen);
  // use modalSlice functions using dispatch hook
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    setLoading(true);
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // if user is not signed in, return
      if (!currentUser) return;

      //  if user is signed in, then handle redux actions
      console.log(currentUser);
      dispatch(
        setUser({
          // pass in user object
          // name: currentUser.displayName,
          email: currentUser.email,
          username: currentUser.email.split("@")[0],
          subscriptionStatus: "Basic",
        })
      );
    });

    // Stop listener from using additional resources
    return unsubscribe;
  }, []);

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
            <div className="auth__modal--header signUp__modal--header">
              Sign up to Summarist
            </div>

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
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="auth__main--input"
                placeholder="Password"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSignUp} className="btn">
                {loading ? (
                  // <Link> ; route to new page "for-you"
                  <AiOutlineLoading3Quarters className="button__loading--spin icon-spin" />
                ) : (
                  // </Link>
                  <div className="button__loading--center">{"Sign up"}</div>
                )}
              </button>
            </div>
          </div>

          <div
            onClick={() => dispatch(closeSignUpModal())}
            className="auth__password--forgot auth__account--creation"
          >
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
