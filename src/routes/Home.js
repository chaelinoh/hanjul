import { authService, dbService } from '../fBase';
import {  updateDoc, addDoc, collection, onSnapshot, query, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { UNSAFE_enhanceManualRouteObjects } from 'react-router-dom';
import Hanjul from '../components/Hanjul'


const Home = ({ userObj }) => {
    const [hanjul, setHanjul] = useState("");
    const [hanjuls, setHanjuls] = useState([]);
    const [search, setSearch] = useState("");
    const [searchHashtag, setSearchHashtag] = useState("");
    const filteredHanjuls = hanjuls.filter(hanjul => hanjul.hashtags && hanjul.hashtags.includes(searchHashtag));

    useEffect(() => {

        onSnapshot(collection(dbService, "hanjuls"), (snapshot) => {
            const hanjulArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHanjuls(hanjulArray);
        });
    }, []);

    const searchHanjul = (e) => {
        e.preventDefault();
        setHanjuls(hanjuls.filter((hanjul) =>
            hanjul.text.toLowerCase().includes(search.toLowerCase())
        ));
    };


    const onSubmit = async (event) => {
        event.preventDefault();
        const hashtags = hanjul.split(" ").filter(word => word.startsWith("#"));
        try {
            const hanjulObj = {
                text: hanjul, createdAt: Date.now(),
                creatorId: userObj.uid,
                hashtags: hashtags,
                likes: [],
            };
            await addDoc(collection(dbService, "hanjuls"), hanjulObj);
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





    const handleLike = async (hanjulObj) => {
        const user = authService.currentUser;
        const { likes } = hanjulObj;
        const liked = likes.includes(user.uid);
        try {
            if (!liked) {
                const newLikes = [...likes, user.uid];
                const newLikeCount = hanjulObj.likeCount + 1;
                await updateDoc(collection(dbService, "hanjuls"), hanjulObj.id, { likes: newLikes, likeCount: newLikeCount });
            } else {
                const newLikes = likes.filter(like => like !== user.uid);
                const newLikeCount = hanjulObj.likeCount -1;
                await updateDoc(collection(dbService,"hanjuls"), hanjulObj.id, {likes: newLikes, likeCount:newLikeCount});
            }
        }catch(error){
            console.error(error);
        }
    };
                
            



    return (
        <div>
            <form>
                <input onChange={(e) => setSearchHashtag(e.target.value)} placeholder="해시태그를 검색하세요" />
                <button type="submit">Search</button>
            </form>
            <div>
                {filteredHanjuls.map((hanjul) => (
                    <Hanjul key={hanjul.id} hanjulObj={hanjul} isOwner={hanjul.creatorId === userObj.uid} handleLike={handleLike} />
                ))}
            </div>
            <form onSubmit={(e) => { searchHanjul(e) }}>
                <input onChange={(e) => { setSearch(e.target.value) }} placeholder="한줄을 검색하세요" />
                <button type="submit">검색</button>
            </form>
            <form onSubmit={onSubmit}>
                <input value={hanjul} onChange={onChange} type="text" placeholder="오늘의 한 줄을 입력하세요" maxLength={200} />
                <input type="submit" value="✔" />
            </form>
            <div>
                {hanjuls.map((hanjul) => (
                    <Hanjul key={hanjul.id} hanjulObj={hanjul} isOwner={hanjul.creatorId === userObj.uid} handleLike={handleLike} />
                ))}
            </div>
        </div>
    );
};

export default Home;