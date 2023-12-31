import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";

import AudioPlayer from "../../components/AudioPlayer";

const Player = () => {
  // State variables
  const [bookData, setBookData] = useState(null);

  async function getBookData() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBookData(data);
  }

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getBookData();
  }, [id]);

  return (
    <section id="player">
      <div className="flex flex-row overscroll-y-auto">
        <Sidebar />
        {/* TODO: Implement increasing text sizes */}

        <div className="flex-row max-w-[100%] w-full">
          <div className="sticky top-0 bg-[#ffffff]">
            <Search />
          </div>
          <div className="summary max-w-[948px] mx-auto px-24 py-8">
            {/* <div>{bookData.title}</div> */}
            {bookData && (
              <div className="flex-col">
                <div className="for-you__tile whitespace-nowrap leading-6 font-sans !important text-2xl max-w-[100%] tracking-tight border-b pb-6">
                  {bookData.title}
                </div>
                <div className="text-[#032b41] py-2 whitespace-pre-line leading-5 font-md">
                  {bookData.summary}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* TODO: Implement audio player below sidebar and summary; "Logout feature is currently shown on overscroll" */}
      {bookData && (
        <div className="bg-[#042330] h-[80px] sticky w-full bottom-0 flex items-center justify-center px-10">
          <div className="flex  w-[33%]">
            <figure>
              <img src={bookData.imageLink} width={48} height={48} alt="" />
            </figure>
            <div className="flex-row pl-3">
              <div className="text-white font-sans text-sm font-semibold">
                {bookData.title}
              </div>
              <div className="text-[#bac8ce] text-sm font-sans font-semibold">
                {bookData.author}
              </div>
            </div>
          </div>
          <div className="flex w-[66%] mx-auto items-center justify-center">
            <AudioPlayer audioSrc={bookData.audioLink} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Player;
