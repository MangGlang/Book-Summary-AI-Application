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
import { auth, signInWithGoogle } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignupModal() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const isOpen = useSelector((state) => state.modals.signUpModalOpen);
  const router = useRouter();
  // use modalSlice functions using dispatch hook
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  async function handleSignUp() {
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.reload();
      router.push("/for-you");
      dispatch(closeSignUpModal());
      dispatch(closeLoginModal());
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  async function handleGoogleSignIn() {
    try {
      setGoogleLoading(true);
      await signInWithGoogle().then((result) => {
        // function: Return information of user after they authenticate
        const name = result.user.displayName;
        const email = result.user.email;
        console.log(result);
        setGoogleLoading(false);
        router.push("/for-you");
      });
      dispatch(closeLoginModal());
      dispatch(closeSignUpModal());
    } catch (error) {
      setErrorMessage(error.message);
      setGoogleLoading(false);
    }
  }

  // comment for delete

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
        className="auth__account--creation"
      >
        Don't have an account?
      </div>

      {/* Modal: 2 props, "open={useState to handle open}", "onClose={funct to handle close}" */}
      <Modal
        open={isOpen}
        onClose={() => {
          dispatch(closeSignUpModal());
          clearErrorMessage();
        }}
        className="auth__modal"
      >
        <div className="auth__modal--container signUp__modal--container">
          <div className="auth__content">
            <div className="auth__modal--header signUp__modal--header">
              Sign up to Summarist
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="btn home__cta--btn auth__button--google"
            >
              {googleLoading ? (
                // <Link> ; route to new page "for-you"
                <AiOutlineLoading3Quarters className="button__loading--spin icon-spin" />
              ) : (
                // </Link>
                <div className="button__loading--center">
                  <FcGoogle className="guest__user--mask google__user--mask" />
                  {"Sign up with Google"}
                </div>
              )}
            </button>
            <div className="auth__seperator">
              <span className="auth__seperator--text">or</span>
            </div>

            <div className="w-full text-center mb-3">
              <p className=" text-red-500">{isOpen ? errorMessage : null}</p>
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
            className="auth__account--creation"
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
