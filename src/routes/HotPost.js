import React from 'react';
import {authService, dbService } from "../fBase";
import { collection, orderBy, query ,getDocs} from "firebase/firestore";
import { useEffect, useState } from "react";
import Hanjul from "../components/Hanjul";


const HotPost = () => {
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const getPostings = async () => {
      const q = query(
        collection(dbService, "hanjuls"),
        orderBy("likeCount", "desc")
      );
      const querySnapshot = await getDocs(q);
      const postingArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostings(postingArray);
    };
    getPostings();
  }, []);

  return (
    <div>
      {postings.map((posting) => (
        <Hanjul
          key={posting.id}
          hanjulObj={posting}
          isOwner={posting.creatorId === authService.currentUser.uid}
        />
      ))}
    </div>
  );
};

export default HotPost;

