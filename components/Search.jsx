import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Search = () => {
  return (
    <div className="w-full h-20 border-gray-[#e1e7ea] border-b">
      <div className="items-center relative max-w-[1380px]">
        <div className="absolute w-[100%] right-0 max-w-[380px]">
          <div className="search__input--wrapper flex items-center mt-6 mr-10">
            <input
              className="text-sm font-sans font-medium input__field w-[100%] h-10 p-4 border-[#e1e7ea] border-2 bg-[#f1f6f4] rounded text-[#042330] relative outline-none"
              type="text"
              placeholder="Search for bookssss"
            />
            {/* comment */}
            {/*  */}
            {/* this is without sidebar comment */}
            <div className="absolute right-20 border-[#e1e7ea] border-l-2 " style={ { height: 35 } }></div>
            <BiSearchAlt className="absolute right-12 sidebar__icon search__icon " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
