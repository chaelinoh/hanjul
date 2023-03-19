import { authService, dbService } from '../fBase';
import {useInsertionEffect, useState} from "react";
import React, { useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {collection, getDocs, orderBy, query, where} from "@firebase/firestore";
import {getAuth, signOut} from "firebase/auth";
import {updateProfile} from "@firebase/auth";
import Hanjul from 'components/Hanjul';
import { onSnapshot } from '@firebase/firestore';
import { faCog, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HanjulFactory from 'components/HanjulFactory';
import Profile from './Profile';


const MyPage = ({userObj}) => {

    const [myHanjuls, setMyHanjuls] = useState([]);

    useEffect(() => {
    
        onSnapshot(
          query(collection(dbService, "hanjuls"), where("creatorId","==",userObj.uid), orderBy("createdAt","desc")), 
          (snapshot) => {
          const hanjulArray = snapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(),
          }));
          setMyHanjuls(hanjulArray);
        });
      }, []);



    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.dispalyName);
    const auth = getAuth(); 

    if (userObj.displayName !== newDisplayName){
        updateProfile(userObj, {displayName: newDisplayName});
    }





    const onLogOutClick = () => {
        signOut(auth);
        navigate("/",{replace: true});
     };


     const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(userObj, {displayName: newDisplayName});
        }
    };

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
          <ul style={{ display: "flex", justifyContent: "right", marginTop: 10 }}>
            <li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faCog} color={"#ff9d00"} size="2x" />
            </Link>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: 30 }}>
                {myHanjuls.map((hanjul,{timestamp})=>(
                <Hanjul key={hanjul.id} hanjulObj={hanjul} isOwner={hanjul.creatorId === userObj.uid} >{timeChanger(timestamp)}</Hanjul>
                ))}
            </div>
        </div>
     )


};

export default MyPage;