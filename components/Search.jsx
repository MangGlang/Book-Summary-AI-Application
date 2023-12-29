import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";

import { TbTransitionLeft } from "react-icons/tb";
import { TbTransitionRight } from "react-icons/tb";
import logo from "@/public/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

const Search = () => {
  // const user = useSelector((state) => state.user);
  // const [expanded, setExpanded] = useState(true);
  // const expandedStyling = `overflow-hidden truncate transition-all ease-in-out duration-300
  // ${expanded ? "w-[70%] duration-300" : "w-0 duration-0"}`;

  return (
    <div className="!max-w-[100%] w-full h-20 border-gray-[#e1e7ea] border-b relative">
      <div className="items-center relative max-w-[1380px]">
        <div className="absolute w-[100%] right-0 max-w-[380px]">
          <div className="search__input--wrapper flex items-center mt-6 mr-10">
            <input
              className="text-sm font-sans font-medium input__field w-[100%] h-10 p-4 border-[#e1e7ea] border-2 bg-[#f1f6f4] rounded-lg text-[#042330] relative outline-none"
              type="text"
              placeholder="Search for books"
            />
            {/* comment */}
            {/*  */}
            {/* this is without sidebar comment */}
            <div
              className="absolute right-20 border-[#e1e7ea] border-l-2 "
              style={{ height: 35 }}
            ></div>
            <BiSearchAlt className="absolute right-10 sidebar__icon search__icon " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
