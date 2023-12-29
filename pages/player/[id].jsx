import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
  }, [])

  return (
    <div className="row">
      <div className="container">
        <h1>this is the player</h1>
      </div>
    </div>
  );
}

export default Player