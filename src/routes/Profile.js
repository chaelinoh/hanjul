import { authService, dbService } from '../fBase';
import {useInsertionEffect, useState} from "react";
import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {collection, getDocs, orderBy, query, where} from "@firebase/firestore";
import {getAuth, signOut} from "firebase/auth";
import {updateProfile} from "@firebase/auth";

const Profile = ({userObj}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.dispalyName);
    const auth = getAuth(); 

    if (userObj.displayName !== newDisplayName){
        updateProfile(userObj, {displayName: newDisplayName});
    }

    const getMyHanjuls = async () =>{
        const q = query(
            collection(dbService, "hanjuls"),
            where("creatorId","==",userObj.uid),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>",doc.data());
        });
    };

    useEffect(()=> {
        getMyHanjuls();
    });


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

     return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placholder="Display name" value={newDisplayName} />
            <input type="submit" value="Update Profile"/>
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
     )


};

export default Profile;