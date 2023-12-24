import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { BsPlayCircleFill } from "react-icons/bs";


const SelectedBook = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  async function getSelectedBook() {
     const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`)
     setSelectedBook(data[0]);
    //  console.log(data[0].imageLink);
    //  setSelectedBook(data[0].imageLink);
    //  console.log(data[0].title)
  }

  useEffect(() => {
    getSelectedBook();
  }, []);
// comment for info??

  return (
    <>
      <div className="row ">
        <div className="book__container">
          <h1 className="for-you__tile">Selected just for you</h1>
          {/*  xl:w-full 2xl:w-3.5/5 */}
          <a href="" className="selected__book flex w-full xl:w-[70%]">
            <div className="selected__book--sub-title tracking-wide leading-5">
              How Constant Innovation Creates Radically Successful Businesses
            </div>
            <div className="selected__book--divider"></div>
            <div className="selected__book--content">
              <figure className="">
                {selectedBook &&
                  <img src={selectedBook.imageLink} alt="Selected Book" className="w-36 h-36 max-w-none" />
                  }
              </figure>
              <div className="mx-4">
                {selectedBook && 
                  (
                    <div>
                      <h1 className="font-bold text-blue-950 font-sans">{selectedBook.title}</h1>
                      <p className="text-sm my-1 font-sans">{selectedBook.author}</p>
                      <BsPlayCircleFill className="selected__book--content-style my-4"/>
                    </div>
                  )
                  
                }
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default SelectedBook;
