import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { LuClock2 } from "react-icons/lu";
import { LuStar } from "react-icons/lu";

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
                  <div className="for-you__tile font-sans !important text-3xl tracking-normal max-w-[70%] ">{bookData.title}</div>
                  <figure>
                    <img className="absolute right-0 top-0" src={`${bookData.imageLink}`} width={300} alt="" />
                  </figure>

                  </div>
                  <div>{bookData.author}</div>
                  <div>{bookData.subTitle}</div>
                  <br></br>

                  <div className="flex items-center text-[#6b757b]">
                    <LuClock2 className="mr-1 text-lg" />
                    <p className="text-sm">{`00:00`}</p>{" "}
                    <LuStar className="ml-2 text-lg" />{" "}
                    <p className="text-sm ml-1">{bookData.averageRating}</p>
                  </div>
                  <div className="flex items-center text-[#6b757b]">
                    <LuClock2 className="mr-1 text-lg" />
                    <p className="text-sm">{`00:00`}</p>{" "}
                    <LuStar className="ml-2 text-lg" />{" "}
                    <p className="text-sm ml-1">{bookData.averageRating}</p>
                  </div>

                  <br></br>
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
