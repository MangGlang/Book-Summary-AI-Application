import React from "react";

import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";

const plansFeatures = () => {
  return (
    <div className="features__wrapper my-6 items-center flex justify-center">
      <div className="flex gap-[40px]">
        <div className="features">
          <div className="features__icon">
            <AiFillFileText />
          </div>
          <div className="features__sub--title text-[16px] text-[#394547]  ">
            <span className="font-bold">Key ideas in few mins</span> with many
            books to read
          </div>
        </div>
        <div className="features">
          <div className="features__icon">
            <RiPlantFill />
          </div>
          <div className="features__sub--title text-[16px] text-[#394547]  ">
            <span className="font-bold">3 million</span> people growing with
            Summarist everyday
          </div>
        </div>
        <div className="features">
          <div className="features__icon">
            <FaHandshake />
          </div>
          <div className="features__sub--title text-[16px] text-[#394547]  ">
            <span className="font-bold">Precise recommendations </span>{" "}
            collections curated by experts
          </div>
        </div>
      </div>
    </div>
  );
};

export default plansFeatures;
