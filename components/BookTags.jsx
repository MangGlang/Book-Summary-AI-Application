// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const BookTags = () => {
//   // get bookData from cloudfunction to display as a button heading
//   const [bookDataTags, setBookDataTags] = useState(null);
//   async function getBookData() {
//     const { data } = await axios.get(
//       `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
//     );
//     setBookData(data.tags);
//     console.log(bookDataTags)
//   }

// //   const bookTagHeadings = bookData.map((tags, index) => (
// //     <button key={index}>{tags}</button>
// //   )
// //   );

//   useEffect(() => {
//     getBookData();
//   });

// //   return <button>{bookTagHeadings}</button>;
// };

// export default BookTags;
