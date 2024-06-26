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

import { TbTransitionLeft } from "react-icons/tb";
import { TbTransitionRight } from "react-icons/tb";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginModal from "./modals/LoginModal";
import axios from "axios";
import { useParams } from "next/navigation";
import { RxLetterCaseCapitalize } from "react-icons/rx";

// Instead of passing expanded transition as a prop to sidebar links
// we can utilize a context to convey the expanded state to all links
// ** In this case, since we aren't passing it as a prop into another component, there is no need**

// "Context lets components pass information deep down without explicitly passing props"
// const SidebarContext = createContext()

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
    // make sure to add sign out modal here in order to sign users out
    // dispatch(closeLoginModal());
    // console.log(user);
  }
  // states of sidebar elements
  const [expanded, setExpanded] = useState(true);
  const expandedStyling = `overflow-hidden truncate ease-in-out
  ${expanded ? "" : "hidden duration-0"}`;

  const [bookData, setBookData] = useState(null);

  async function getBookData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBookData(data);
  }

  const { id } = router.query;
  // const { id } = useParams();

  useEffect(() => {
    getBookData();
  }, [id, bookData]);

  const [display, setDisplay] = useState(false); 

  const handleClick = () => {
    setDisplay(!display); // Toggle isActive state on click
  };

  return (
    <>
      {/* TODO: Smoother hidden animation to hide sdiebar when md breakpoint is met */}
      <div className="bg-[#f7faf9] logo__style h-screen md:block border-r shadow-sm sticky top-0">
        <div className="sidebar__wrapper flex flex-col justify-between h-full">
          <div
            className={`flex p-3 ${expanded ? "space-x-4" : "items-center"}`}
          >
            <figure className={expandedStyling}>
              <Link href={`/for-you`}>
                <img
                  src="/assets/logo.png"
                  alt="logo"
                  width={128}
                  height={40}
                  className="max-w-none hover:scale-95 ease-in-out duration-300"
                />
              </Link>
            </figure>

            {/* Toggle Sidebar to Open/Collapse */}
            <button
              onClick={user.email ? () => setExpanded((curr) => !curr) : null}
              className={`flex-end text-[#032b41] hover:scale-125 transition-all ease-in-out duration-300 ${
                !user.email ? "hover:cursor-not-allowed opacity-50" : ""
              }`}
              disabled={!user.email}
            >
              {expanded ? (
                <TbTransitionLeft className="w-10 h-6" />
              ) : (
                <TbTransitionRight className="w-10 h-6" />
              )}
            </button>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="mt-6">
              <Link
                href="/for-you"
                className="sidebar__link--wrapper hover:bg-gray-200"
              >
                <div
                  className={`sidebar__link--line ${
                    router.pathname == "/for-you" ? "active--tab" : ""
                  }`}
                ></div>
                <div className="ml-5 sidebar__icon--wrapper">
                  <AiOutlineHome className="sidebar__icon hover:scale-125 transition-all ease-in-out" />
                  <div className={expanded ? expandedStyling : "text-popup"}>
                    For you
                  </div>
                </div>
              </Link>
              <Link
                className="sidebar__link--wrapper hover:bg-gray-200"
                href="/library"
              >
                <div
                  className={`sidebar__link--line ${
                    router.pathname == "/library" ? "active--tab" : ""
                  }`}
                ></div>
                <div className="ml-5 sidebar__icon--wrapper">
                  <BsBookmarkHeart className="sidebar__icon hover:scale-125 transition-all ease-in-out" />
                  <div className={expanded ? expandedStyling : "text-popup"}>
                    My Library
                  </div>
                </div>
              </Link>
              {/* add highlights and search icons */}
              <div className="ml-5 sidebar__link--wrapper hover:cursor-not-allowed">
                <PiPencilLineFill className="sidebar__icon hover:scale-125 transition-all ease-in-out" />
                <div className={expanded ? expandedStyling : "text-popup"}>
                  Highlights
                </div>
              </div>
              <div className="ml-5 sidebar__link--wrapper hover:cursor-not-allowed">
                <BiSearchAlt className="sidebar__icon hover:scale-125 transition-all ease-in-out" />
                <div className={expanded ? expandedStyling : "text-popup"}>
                  Search
                </div>
              </div>
              <div className="ml-5 sidebar__link--wrapper hover:cursor-pointer items-center">
                <RxLetterCaseCapitalize className={`sidebar__icon hover:scale-125 transition-all ease-in-out
              ${display ? 'sidebar__font--size-icon--active' : ''}
              }`} 
              onClick={handleClick}/>
                
              </div>

              {/* {
              router.pathname == "/player/:id" && bookData ? (
                <div className="summary">
                  <h1>{bookData.title}</h1>
                  <p>{bookData.summary}</p>
                </div>
              ) : (
                <div className="summary">
                  {id}
                </div>
              )} */}
              
            </div>
            <div className="sidebar__bottom bottom-2">
              {/* TODO: Implement Settings Page */}
              <Link
                className="sidebar__link--wrapper group hover:bg-gray-200"
                href="/settings"
              >
                <div
                  className={`sidebar__link--line ${
                    router.pathname == "/settings" ? "active--tab" : ""
                  }`}
                ></div>
                <div className="ml-5 sidebar__icon--wrapper">
                  <BsGear className="sidebar__icon hover:scale-125 transition-all ease-in-out" />
                  <div className={expanded ? expandedStyling : "text-popup"}>
                    Settings
                  </div>
                </div>
              </Link>

              <div className="ml-5 sidebar__link--wrapper hover:cursor-not-allowed">
                <BiHelpCircle className="sidebar__icon hover:scale-125 transition-all ease-in-out " />
                <div className={expanded ? expandedStyling : "text-popup"}>
                  Help & Support
                </div>
              </div>

              {user && (
                <div
                  onClick={handleSignOut}
                  className=" hover:bg-gray-200 hover:cursor-pointer"
                >
                  {!user.email ? (
                    <LoginModal className="flex grow" buttonText={`Login`} />
                  ) : (
                    <button className="ml-5 sidebar__logout--wrapper text-left">
                      <FiLogOut className="sidebar__icon hover:scale-125 transition-all ease-in-out" />
                      <div className={expandedStyling}>
                        {!user.email ? (
                          <LoginModal className="" buttonText={`Login`} />
                        ) : (
                          <div>Logout</div>
                        )}
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
