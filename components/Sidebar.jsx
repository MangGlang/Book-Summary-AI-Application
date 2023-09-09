import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/userSlice";
import { closeLoginModal, closeSignUpModal, openLoginModal } from "@/redux/modalSlice";

export default function Sidebar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);


//   TODO: Upon logging the user out, check to see if user info is logged in. If user is not logged in, change text of "logout" to "login" using ternary {} ? : operator.
  async function handleSignOut() {
    // firebase function
    await signOut(auth);
    dispatch(signOutUser());
    if (!user) {
        dispatch(openLoginModal());
    }
    // sign out user from redux store; reset user info
    // dispatch(closeSignUpModal());
    // dispatch(closeLoginModal());
    console.log(user)
  }

  return (
    <>
      <div>this is the Sidebar</div>
      <button onClick={handleSignOut}>click me</button>
    </>
  );
}
