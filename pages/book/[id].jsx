import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { LuClock2 } from "react-icons/lu";
import { LuStar } from "react-icons/lu";
import { LuMic } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";

const Book = () => {
  const [bookData, setBookData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  async function getBookData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    // console.log(await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`))
    setBookData(data);
    // console.log("bookdata " + bookData)
  }

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
                  <div className="flex relative">
                    <div className="for-you__tile font-sans !important text-3xl tracking-normal max-w-[70%] ">
                      {bookData.title}
                      {bookData.subscriptionRequired ? " (Premium)" : null}
                    </div>
                    <figure>
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
                  <div className="text-xl font-[100] max-w-[70%] text-[#3e565e] border-spacing-0.5 py-2 border-b">
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
