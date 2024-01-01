import React from "react";

import { AiFillFileText } from "react-icons/ai";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";

const plansFeatures = () => {
  return (
    <>
      <div className="features__wrapper !gap-[32px] py-16">
        <div className="features !w-[330px]">
          <div className="features__icon">
            <AiFillFileText />
          </div>
          <div className="features__sub--title text-[16px] text-[#394547]  ">
            <span className="font-bold">Key ideas in few mins</span> with many
            books to read
          </div>
        </div>
        <div className="features !w-[330px]">
          <div className="features__icon">
            <RiPlantFill />
          </div>
          <div className="features__sub--title text-[16px] text-[#394547]  ">
            <span className="font-bold">3 million</span> people growing with
            Summarist everyday
          </div>
        </div>
        <div className="features !w-[330px]">
          <div className="features__icon">
            <FaHandshake />
          </div>
          <div className="features__sub--title text-[16px] text-[#394547]  ">
            <span className="font-bold">Precise recommendations </span>{" "}
            collections curated by experts
          </div>
        </div>
      </div>
    </>
  );
};

export default plansFeatures;
