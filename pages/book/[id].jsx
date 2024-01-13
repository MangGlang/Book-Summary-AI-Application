import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { LuClock2 } from "react-icons/lu";
import { LuStar } from "react-icons/lu";
import { LuMic } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { LuBookOpenCheck } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import LoginModal from "@/components/modals/LoginModal";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
// import UserLoginModal from "../../components/wrapper/UserLoginModal";

import CustomButtons from "../../components/CustomButtons";

const Book = () => {
  const [bookData, setBookData] = useState(null);
  const [bookDataTags, setBookDataTags] = useState(null);
  const [bookmark, setBookmark] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const bookTagsArray = bookDataTags;

  // Access redux store and open loginModal if user is not authenticated
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // useSelector hook to get modal state
  const modalState = useSelector((state) => state.modal);
  // console.log("user : " + user.username);
  // console.log("sub status: " + user.subscriptionStatus);

  async function getBookData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBookData(data);
    setBookDataTags(data.tags);
  }

  function manageBookmark() {
    setBookmark((prevBookmark) => !prevBookmark);
  }

  const handleLoginButtonClick = () => {
    dispatch(() => openLoginModal());
  };

  useEffect(() => {
    getBookData();
  }, [id, data]);

  return (
    <section id="book">
      <div className="relative flex">
        <Sidebar />

        <div className="flex-grow ">
          <Search />
          <div className="flex">
            {bookData && (
              <div className="row">
                <div className="container flex">
                  <div className="inner__wrapper w-[100%]">
                    <div className="flex relative flex-wrap">
                      <div className="for-you__tile font-sans !important text-3xl tracking-normal max-w-[100%] ">
                        {bookData.title}
                        {bookData.subscriptionRequired ? " (Premium)" : null}
                      </div>
                    </div>
                    <div className="font-bold text-[#032b41]">
                      {bookData.author}
                    </div>
                    <div className="text-xl font-[100] max-w-[100%] text-[#3e565e] py-4 border-b">
                      {bookData.subTitle}
                    </div>
                    <br></br>
                    <div className="flex flex-wrap items-center max-w-[320px] font-sans text-[#032841]">
                      <div className="flex items-center w-[50%]">
                        <div className="flex">
                          <LuClock2 className="mr-2 text-2xl" />
                        </div>
                        <div className="flex">
                          <p className="text-sm font-bold">{`00:10`}</p>{" "}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex">
                          <LuStar className="ml-0 text-2xl" />{" "}
                        </div>
                        <div className="flex">
                          <p className="text-sm font-bold ml-1 ">
                            {bookData.averageRating}{" "}
                            {`(${bookData.totalRating} ratings)`}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-[50%]">
                        <div className="flex">
                          <LuMic className="mr-2 text-2xl mt-4" />
                        </div>
                        <div className="flex">
                          <p className="text-sm font-bold mt-4">{`Audio & Text`}</p>{" "}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="flex">
                          <LuLightbulb className="ml-0 text-2xl mt-4" />{" "}
                        </div>
                        <div className="flex">
                          <p className="text-sm font-sans font-bold ml-1 mt-4">
                            {`${bookData.keyIdeas} Key ideas`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-[100] max-w-[100%] text-[#3e565e] border-spacing-0.5 py-2 border-b"></div>

                    <div className="flex">
                      {user && (
                        <CustomButtons
                          buttonStyle="flex items-center justify-center p-3 w-[150px] rounded bg-[#032841] text-white hover:opacity-80 transition-all duration-300 ease-in-out"
                          logo={<LuBookOpenCheck className="text-2xl" />}
                          customText="Read"
                          id={id}
                          subRequired={bookData.subscriptionRequired}
                        />
                      )}

                      <CustomButtons
                        buttonStyle="ml-4 flex items-center justify-center p-3 w-[150px] rounded bg-[#032841] text-white hover:opacity-80 transition-all duration-300 ease-in-out"
                        logo={<LuMic className="text-2xl" />}
                        customText="Listen"
                        id={id}
                        subRequired={bookData.subscriptionRequired}
                      />
                    </div>

                    <button
                      className="text-[#0365f2] font-sans font-[600] text-lg flex items-center
                    inner-book__bookmark"
                      onClick={manageBookmark}
                    >
                      {bookmark ? (
                        <>
                          <BsBookmark className="mr-2 text-xl" /> Add title to
                          My Library
                        </>
                      ) : (
                        <>
                          <BsBookmarkCheckFill className="mr-2 text-xl" />
                          Saved in My Library
                        </>
                      )}
                    </button>
                    <div className="font-bold font-sans text-lg text-[#032b41] mt-8">
                      What&apos;s it about?
                    </div>

                    <div className="flex mt-4">
                      {bookTagsArray.map((tags, index) => (
                        <div className="flex items-center mb-4" key={index}>
                          <button
                            className="flex mr-4 justify-center font-sm p-3 w-[100%] rounded bg-[#f1f6f4] text-[#032841] hover:cursor-not-allowed text-sm font-bold whitespace-nowrap"
                            
                          >
                            {tags}
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="text-md text-[#032b41]">
                      {bookData.bookDescription}
                    </div>

                    <div className="font-bold font-sans text-lg text-[#032b41] mt-4">
                      About the author
                    </div>

                    <div className="text-md mt-4 text-[#032b41]">
                      {bookData.authorDescription}
                    </div>
                  </div>

                  {/* <div className="container"> */}

                  <div className="flex">
                    <figure className="flex">
                      <img
                        // When breakpoint of 1024 pixels or so is met, then set position to not absolute.
                        // make img occupy space on the page, bc absolute does not occupy space respective of elements
                        // conditionally render {image above top of components by making it relative}
                        className="w-[425px] h-[300px] md:block ml-8"
                        src={`${bookData.imageLink}`}
                        alt=""
                      />
                    </figure>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* img section */}
        </div>
      </div>
    </section>
  );
};

export default Book;
