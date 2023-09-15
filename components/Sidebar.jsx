import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/userSlice";
import {
  closeLoginModal,
  closeSignUpModal,
  openLoginModal,
} from "@/redux/modalSlice";

import Image from "next/image";
import logo from "@/public/assets/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { BsBookmarkHeart } from "react-icons/bs";
import { PiPencilLineFill } from "react-icons/pi";

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
    console.log(user);
  }

  return (
    <>
      <div className="bg-[#f7faf9] w-100 fixed h-screen">
        <div className="sidebar__wrapper flex flex-col">
          <figure className="m-5">
            <Image src={logo} alt="logo" width={160} height={40} />
          </figure>

          <div className="sidebar__top mt-10 ml-10">
            <a className="sidebar__link--wrapper" href="/for-you">
              <div className="sidebar__icon--wrapper">
                <AiOutlineHome className="sidebar__icon"/>
                <div className="ml-2">For you</div>
              </div>
            </a>
            <a className="sidebar__link--wrapper" href="/for-you">
              <div className="sidebar__icon--wrapper">
                <BsBookmarkHeart className="sidebar__icon"/>
                <div className="ml-2">My Library</div>
              </div>
            </a>
{/* add highlights and search icons */}
            <div className="sidebar__link--wrapper hover:cursor-not-allowed">
              <PiPencilLineFill className="sidebar__icon"/>
              <div className="ml-2">Highlights</div>
            </div>
            <div className="sidebar__link--wrapper hover:cursor-not-allowed">
              Search
            </div>
          </div>
        </div>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </>
  );
}
