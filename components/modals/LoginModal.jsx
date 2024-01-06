import Modal from "@mui/material/Modal";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import SignupModal from "@/components/modals/SignupModal";
import ForgotPassModal from "@/components/modals/ForgotPassModal";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

import { signInWithGoogle } from "@/firebase";
import Link from "next/link";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "@/stripe/createCheckoutSession";
import usePremiumStatus from "@/stripe/usePremiumStatus";

import firebase from "@/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import "firebase/firestore";
import "firebase/auth";

export default function LoginModal({ buttonText }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [guestLoading, setGuestLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handleClose = () => setIsOpen(false);
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  // use modalSlice functions using dispatch hook
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  async function handleGuestSignIn() {
    setGuestLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        "guest123321@gmail.com",
        "guest123321@gmail.com"
      );
      dispatch(closeLoginModal());
      if (router.pathname === "/") {
        router.push("/for-you");
      }
    } catch (error) {
      alert(error.message);
    }
    // console.log("guest");
    setTimeout(() => {
      setGuestLoading(false);
    }, 500);
  }

  async function handleSignIn() {
    try {
      setLoading(true);

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user to the 'users' collection
      const userRef = doc(firestore, "users", userCredentials.user.uid);
      await setDoc(userRef, {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        name: userCredentials.user.displayName,
        provider: userCredentials.user.providerData[0].providerId,
        photoUrl: userCredentials.user.photoURL,
      });

      console.log("User added to Firestore using Email:", userCredentials.user);

      setTimeout(() => {
        setLoading(false);
      }, 500);
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
        setGoogleLoading(false);
        if (router.pathname === "/") {
          router.push("/for-you");
        }
      });
      dispatch(closeLoginModal());
    } catch (error) {
      setErrorMessage(error.message);
      setGoogleLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // if user is not signed in, return
      if (!currentUser) return;

      //  if user is signed in, then handle redux actions
      if (router.pathname === "/") {
        router.push("/for-you");
      }
      // console.log(currentUser);
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
    <div>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="btn home__cta--btn"
      >
        {buttonText}
      </button>

      {/* Modal: 2 props, "open={useState to handle open}", "onClose={funct to handle close}" */}
      <Modal
        open={isOpen}
        onClose={() => {
          dispatch(closeLoginModal());
          clearErrorMessage();
        }}
        className="auth__modal"
      >
        <div className="auth__modal--container">
          <div className="auth__content">
            <div className="auth__modal--header">Log in to Summarist</div>
            {/* auth Buttons */}
            <div className="w-full text-center">
              <p className=" text-red-500">{isOpen ? errorMessage : null}</p>
            </div>
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
                  {"Login as a Guest"}
                </div>
              )}
            </button>

            <div className="auth__seperator">
              <span className="auth__seperator--text">or</span>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="btn home__cta--btn auth__button--google"
            >
              {/* TODO: Fix spinner loading state by implementing google auth */}
              {googleLoading ? (
                // <Link> ; route to new page "for-you"
                <AiOutlineLoading3Quarters className="button__loading--spin icon-spin" />
              ) : (
                // </Link>
                <div className="button__loading--center">
                  <FcGoogle className="guest__user--mask google__user--mask" />
                  {"Login with Google"}
                </div>
              )}
            </button>
            <div className="auth__seperator">
              <span className="auth__seperator--text">or</span>
            </div>

            {/* Auth Form */}
            <div className="auth__main--form">
              <input
                className="auth__main--input font-sans"
                placeholder="Email Address"
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="auth__main--input font-sans"
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
                  <div className="button__loading--center">{"Login"}</div>
                )}
              </button>
            </div>
            <ForgotPassModal />
            <SignupModal />
          </div>

          {/* Forgot Password/No Account */}
          {/* <div className="auth__password--forgot auth__account--creation">
            Don't have an account?
          </div> */}

          <AiOutlineCloseCircle
            onClick={() => dispatch(closeLoginModal())}
            className="auth__closeModal"
          />
        </div>
      </Modal>
    </div>
  );
}
