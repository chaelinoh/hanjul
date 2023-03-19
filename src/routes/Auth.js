import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import AuthForm from 'components/AuthForm';
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {authService, firebaseInstance} from "../fBase";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
    const onSocialClick = async (event) => {
        const { 
            target: { name },
        } = event;
        let provider;
        if(name ==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);

    };

    return (
        <div className="authContainer">
        <FontAwesomeIcon
          icon={faPencil}
          color={"#00ff66"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};
export default Auth;