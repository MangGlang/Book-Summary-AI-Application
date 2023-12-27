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
// import UserLoginModal from "../../components/wrapper/UserLoginModal";

import CustomButtons from "../../components/CustomLoginButton";

const Book = () => {
  const [bookData, setBookData] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  // Access redux store and open loginModal if user is not authenticated
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // useSelector hook to get modal state
  const modalState = useSelector((state) => state.modal);
  console.log(user);

  async function getBookData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    // console.log(await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`))
    setBookData(data);
    // console.log("bookdata " + bookData)
  }

  const handleLoginButtonClick = () => {
    dispatch(() => openLoginModal());
  };

  useEffect(() => {
    getBookData();
  }, [id]);

  return (
    <section id="book">
      <div className="relative flex">
        <Sidebar />

        <div className="flex-grow ">
          <Search />
          <div>
            {bookData && (
              <div className="row">
                <div className="container">
                  <div className="flex relative flex-wrap">
                    <div className="for-you__tile font-sans !important text-3xl tracking-normal max-w-[70%] ">
                      {bookData.title}
                      {bookData.subscriptionRequired ? " (Premium)" : null}
                    </div>
                    <figure className="flex flex-wrap">
                      helo
                      <img
                        className="absolute right-0 top-0"
                        src={`${bookData.imageLink}`}
                        width={300}
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="font-bold text-[#032b41]">
                    {bookData.author}
                  </div>
                  <div className="text-xl font-[100] max-w-[70%] text-[#3e565e] border-spacing-0.5 py-4 border-b">
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
                  <div className="text-xl font-[100] max-w-[70%] text-[#3e565e] border-spacing-0.5 py-2 border-b"></div>

                  <div className="flex">
                    <CustomButtons
                      buttonStyle="flex items-center justify-center p-3 w-[150px] rounded bg-[#032841] text-white hover:opacity-80 transition-all duration-300 ease-in-out"
                      logo={<LuBookOpenCheck className="text-2xl" />}
                      customText="Read"
                    />
                    <CustomButtons
                      buttonStyle="ml-4 flex items-center justify-center p-3 w-[150px] rounded bg-[#032841] text-white hover:opacity-80 transition-all duration-300 ease-in-out"
                      logo={<LuMic className="text-2xl" />}
                      customText="Listen"
                    />
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
