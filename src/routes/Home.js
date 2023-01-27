import { dbService } from '../fBase';
import { addDoc, collection, onSnapshot, query, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { UNSAFE_enhanceManualRouteObjects } from 'react-router-dom';
import Hanjul from '../components/Hanjul'


const Home = ({ userObj }) => {
    const [hanjul, setHanjul] = useState("");
    const [hanjuls, setHanjuls] = useState([]);

    useEffect(() => {
    
        onSnapshot(collection(dbService, "hanjuls"), (snapshot) => {
          const hanjulArray = snapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(),
          }));
          setHanjuls(hanjulArray);
        });
      }, []);


    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const hanjulObj = await addDoc(collection(dbService, "hanjuls"), {
                text: hanjul, createdAt: Date.now(),
                creatorId: userObj.uid,
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

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={hanjul} onChange={onChange} type="text" placeholder="오늘의 한 줄을 입력하세요" maxLength={200} />
                <input type="submit" value="✔" />
            </form>
            <div>
                {hanjuls.map((hanjul)=>(
                <Hanjul key={hanjul.id} hanjulObj={hanjul} isOwner={hanjul.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;