import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuClock2 } from "react-icons/lu";
import { LuStar } from "react-icons/lu";

const SuggestedBooks = () => {
  const [suggestedBooks, setSuggestedBooks] = useState(null);

  async function getSuggestedBooks() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested`
    );
    setSuggestedBooks(data);
    console.log(data);
  }

  useEffect(() => {
    getSuggestedBooks();
  }, []);

  return (
    <div className="row">
      <div className="container">
        <div className="for-you__tile">Suggested For You</div>
        <p className="font-thin text-[#394547] text-base font-sans">
          Browse those books
        </p>
        <div className="book__container flex overflow-scroll">
          {suggestedBooks &&
            suggestedBooks.map((books) => (
              <div className="flex flex-col">
                <img
                  src={books.imageLink}
                  className="mx-4 w-[11rem] max-w-none"
                ></img>
                <div className="mx-4">
                  <div>
                    <h1 className="tracking-tight font-bold text-[#032b41] leading-5 font-sans">
                      {books.title}
                    </h1>
                    <p className="text-sm my-1 font-sans font-thin text-[#394547]">
                      {books.author}
                    </p>
                    <p className="text-sm my-1 font-sans text-[#394547]">
                      {books.subTitle}
                    </p>
                    <div className="flex items-center text-[#6b757b]">
                      <LuClock2 className="mr-1" />
                      <p className="text-sm">{`00:00`}</p>{" "}
                      <LuStar className="ml-2" />{" "}
                      <p className="text-sm ml-1">{books.averageRating}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedBooks;
