import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

const CreateStars = ({ starsData }) => {
  const stars = [];

  for (let i = 0; i < starsData; ++i) {
    stars.push(<BsStarFill key={i} />);
  }
  
  return <>{stars}</>;
};

export default CreateStars;
