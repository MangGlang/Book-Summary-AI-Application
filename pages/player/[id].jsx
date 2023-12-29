import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";

const Player = () => {
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
      <div className="flex">
        <Sidebar />
        {/* TODO: Implement increasing text sizes */}

        <div className="flex-row max-w-[100%] w-full">
          <Search />
          <div className="summary max-w-[948px] mx-auto px-24 py-8">
            {/* <div>{bookData.title}</div> */}
            {bookData && (
              <div className="flex-col">
                <div className="for-you__tile whitespace-nowrap leading-6 font-sans !important text-2xl max-w-[100%] tracking-tight border-b pb-6">
                  {bookData.title}
                </div>
                <div className="text-[#031f41] py-2 whitespace-pre-line leading-5 font-md">{bookData.summary}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
