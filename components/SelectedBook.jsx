import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const SelectedBook = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  async function getSelectedBook() {
     const { data } = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected`)
     setSelectedBook
     console.log(data[0].imageLink);
     setSelectedBook(data[0].imageLink);
  }

  useEffect(() => {
    getSelectedBook();
  }, []);

  return (
    <>
      <div className="row ">
        <div className="container">
          <h1 className="for-you__tile">Selected just for you</h1>
          <a href="" className="selected__book flex">
            <div className="selected__book--sub-title font-sans">
              How Constant Innovation Creates Radically Successful Businesses
            </div>
            <div className="selected__book--divider"></div>
            <div className="selected__book--content">
              <figure>
                {selectedBook &&
                  <img src={selectedBook} alt="Selected Book" className="w-36 h-36" />
                  }
              </figure>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default SelectedBook;
