import { authService } from '../fBase';
import React from 'react';
import {useNavigate} from "react-router-dom";

export default () => {
    const history = useNavigate();
     const onLogOutClick = () => {
        authService.signOut()
        history.push("/");
     };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
        );
};