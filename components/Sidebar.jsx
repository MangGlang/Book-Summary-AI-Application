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
import { BiSearchAlt } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { PiPencilLineFill } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { BiHelpCircle } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();

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
// asdasd
  return (
    <>
    {/* TODO: Smoother hidden animation to hide sdiebar when md breakpoint is met */}
      <div className="bg-[#f7faf9] w-100 h-screen hidden md:block relative">
        <div className="sidebar__wrapper flex flex-col justify-between h-full">
          <figure className="m-5">
            <Image src={logo} alt="logo" width={160} height={40} />
          </figure>

          <div className="flex flex-col justify-between h-full">
          <div className="mt-6">
            <Link
              href="/for-you"
              className="sidebar__link--wrapper hover:bg-gray-200"
            >
              <div className={`sidebar__link--line ${router.pathname == "/for-you" ? "active--tab" : ""}`}></div>
              <div className="ml-5 sidebar__icon--wrapper">
                <AiOutlineHome className="sidebar__icon" />
                <div className="ml-2">For you</div>
              </div>
            </Link>
            <Link
              className="sidebar__link--wrapper hover:bg-gray-200"
              href="/library"
            >
              <div className={`sidebar__link--line ${router.pathname == "/library" ? "active--tab" : ""}`}></div>
              <div className="ml-5 sidebar__icon--wrapper">
                <BsBookmarkHeart className="sidebar__icon" />
                <div className="ml-2">My Library</div>
              </div>
            </Link>
            {/* add highlights and search icons */}
            <div className="ml-5 sidebar__link--wrapper hover:cursor-not-allowed">
              <PiPencilLineFill className="sidebar__icon" />
              <div className="ml-2">Highlights</div>
            </div>
            <div className="ml-5 sidebar__link--wrapper hover:cursor-not-allowed">
              <BiSearchAlt className="sidebar__icon" />
              <div className="ml-2">Search</div>
            </div>
          </div>
          <div className="sidebar__bottom bottom-2">
            {/* TODO: Implement Settings Page */}
            <Link
              className="sidebar__link--wrapper group hover:bg-gray-200"
              href="/settings"
            >
              <div className={`sidebar__link--line ${router.pathname == "/settings" ? "active--tab" : ""}`}></div>
              <div className="ml-5 sidebar__icon--wrapper">
                <BsGear className="sidebar__icon" />
                <div className="ml-2">Settings</div>
              </div>
            </Link>

            <div className="ml-5 sidebar__link--wrapper hover:cursor-not-allowed">
              <BiHelpCircle className="sidebar__icon" />
              <div className="ml-2">Help & Support</div>
            </div>

            {/* TODO: Create ternary operator to decide whether user can login/logout and display modal */}
            {/* onClick={() => dispatch(openLoginModal())} */}
            <div
              onClick={handleSignOut}
              className="sidebar__link--wrapper group hover:bg-gray-200 w-[100%] hover:cursor-pointer"
            >
              <button className="ml-5 sidebar__link--wrapper">
                <FiLogOut className="sidebar__icon" />
                {/* <div className="ml-2">Logout</div> */}
                <div className="ml-2">Logout</div>
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
