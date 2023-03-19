import { authService, dbService } from '../fBase';
import {  doc, updateDoc, addDoc, collection, onSnapshot, query, getDoc, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { Link, UNSAFE_enhanceManualRouteObjects } from 'react-router-dom';
import Hanjul from '../components/Hanjul'
import HanjulFactory from 'components/HanjulFactory';
import { Hashtags } from 'Styles/HanjulListStyles';

import Hashtag from 'components/Hashtag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPen, faPencil, faPencilAlt, faPencilRuler, faPencilSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons';




const Home = ({ userObj }) => {


    const [hanjuls, setHanjuls] = useState([]);

    const[search, setSearch] = useState("");

    const [hashtags, setHashtags] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

  
    useEffect(() => {
    
        onSnapshot(query(collection(dbService, "hanjuls"), 
        orderBy('createdAt', 'desc')),
        (snapshot) => {
          const hanjulArray = snapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(),
          }));
          setHanjuls(hanjulArray);
        });
      }, []);

      const searchHanjul=(e)=>{
        e.preventDefault();
        setHanjuls(hanjuls.filter((hanjul)=>
        hanjul.text.toLowerCase().includes(search.toLowerCase())
        ));
      };

      const onSearch = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
      }
    
      const filteredHanjuls = hanjuls.filter(hanjul => hanjul.hashtags && hanjul.hashtags.includes(searchTerm));

      const timeChanger = (time) => {
        const dateObj = new Date(time);
        let dateStr = `${dateObj.getFullYear()}년 ${
          dateObj.getMonth() + 1
        }월 ${dateObj.getDate()}일 작성`;
    
        return dateStr;
      };

      return (
        <div className="container"> 
        <nav>
          <ul style={{ display: "flex", justifyContent: "right", marginTop: 5 }}>
            <li>
            <Link to="/write">
              <FontAwesomeIcon icon={faPenToSquare} color={"#ff9d00"} size="2x" />
            </Link>
            </li>
          </ul>
        </nav>         

      <form onSubmit={(e)=>{searchHanjul(e)}}>
        <input className="factoryInput__input" onChange={(e)=>{setSearch(e.target.value)}} placeholder="한줄을 검색하세요"
        style={{ marginTop: 10 }} />
        <button type="submit" >검색</button>
      </form>
            <div style={{ marginTop: 30 }}>
                {hanjuls.map((hanjul, {timestamp})=>(
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
export default Home;