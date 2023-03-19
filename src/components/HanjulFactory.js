import { dbService } from "fBase";
import { addDoc, collection } from "firebase/firestore";
import {  useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import Hashtag from './Hashtag';
import Hanjul from "./Hanjul";


const HanjulFactory = ({  hashtag, timestamp,filterLists, userObj }) => {

  const [hanjul, setHanjul] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [hashDefault, setHashDefault] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
   // const hashtags =hanjul.split(" ").filter(word => word.startsWith('#'));
    if (hanjul === "") {
      return;
    }


    try {
        const hanjulObj = await addDoc(collection(dbService, "hanjuls"), {
            text: hanjul,
            creatorId: userObj.uid,
            hashtags: hashtags,
            createdAt: Date.now(),

            likes: [],
            likeCount:0
            

          
        });
        await addDoc(collection(dbService,"hanjuls"), hanjulObj);
        console.log("Document written with ID:", hanjulObj.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
    setHanjul("");
};

const onChange = (event) => {
    event.preventDefault();
    const {
        target: { value },
    } = event;
    setHanjul(value);
};




//const filteredHanjuls = hanjuls.filter(hanjul => hanjul.hashtags && hanjul.hashtags.includes(searchTerm));


  return (
    <form onSubmit={onSubmit} className="factoryForm">
    <div className="factoryInput__container">
    <input className="factoryInput__input" value={hanjul} onChange={onChange} type="text" placeholder="오늘의 한 줄을 입력하세요" maxLength={200} />
    <input type="submit" value="&rarr;" className="factoryInput__arrow"  />
    </div>
    <Hashtag
    selectedHashtagArray={hashtags}
    setHashtagsArray={setHashtags}
    hashDefault={hashDefault}
    setHashDefault={setHashDefault}
  />
    </form>
  );
};

export default HanjulFactory;