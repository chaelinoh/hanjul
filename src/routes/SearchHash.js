import React, { useEffect, useState } from 'react';
import Hanjul from 'components/Hanjul';
import Hashtag from 'components/Hashtag';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from 'fBase';


const SearchHash = ({ userObj, timestamp }) => {
  const [hashtags, setHashtags] = useState([]);
  const [hashDefault, setHashDefault] = useState(false);
  const [hashHanjuls, setHashHanjuls] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchHashtag, setSearchHashtag] = useState('');
  const [selectedHashtagArray, setSelectedHashtagArray] = useState([]);

  //firebase에서 Hanjul리스트 가져오는 Effect Hook
  useEffect(() => {
    onSnapshot(query(collection(dbService, "hanjuls"),
      orderBy('createdAt', 'desc')),
      (snapshot) => {
        const hanjulArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHashHanjuls(hanjulArray);
      });
  }, []);

  //해당 해시태그에 맞는 한줄을 골라내는 함수
  const filteredHanjuls = hashHanjuls.filter(hanjul => {
    const hanjulHashtags = hanjul.hashtags;
    if(hanjulHashtags.length < hashtags.length){
      return false
    }

    const matchingHashtags = hanjulHashtags.filter(hashtag => hashtags.includes(hashtag));
    
    if(matchingHashtags.length === hashtags.length){
      return true;
    }
    if (matchingHashtags.length ==0){
      return false;
    }
    return matchingHashtags.length > 0;
  });


  const onSubmit = async (event) => {
    event.preventDefault();
    setSearching(true);
  }

  const onBlur = () => {
    setSearching(false);
  }

  const onChangeHashtag = (e) => {
    setSearchHashtag(hashtags[0]);
    setSearching(true);
  };


  //컴포넌트 렌더링
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <button type="submit" onClick={onChangeHashtag} onBlur={onBlur} >검색</button>
      {searching && (
        <div style={{ marginTop: 20 }}>
          {filteredHanjuls.map((hanjul) => (
            <Hanjul
                key={hanjul.id}
                hanjulObj={hanjul}
                isOwner={hanjul.creatorId === userObj.uid}
            />
           ))}
        </div>
       )
      }
      
      <Hashtag
          selectedHashtagArray={hashtags}
          setHashtagsArray={setHashtags}
          hashDefault={hashDefault}
          setHashDefault={setHashDefault}
      />
      </form>

      <div style={{ marginTop: 310 }}>
        {hashHanjuls.map((hanjul, { timestamp }) => (
          <Hanjul
            key={hanjul.id}
            hanjulObj={hanjul}
            isOwner={hanjul.creatorId === userObj.uid}
            hashtags={hashtags}
            currentUserId={userObj.uid}
            timestamp={timestamp} />
        ))}
      </div>

    </div>
    );
};

      
export default SearchHash;