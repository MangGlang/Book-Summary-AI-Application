import React from 'react'
import { BsStarFill } from "react-icons/bs";

const CreateStars = ( { num } ) => {

  return (
    <>
        {
          // TODO: Give id's to stars
            new Array(num).fill(<BsStarFill />)
        }
    </>
  )
}

export default CreateStars