import AppRouter from "../components/Router";
import React, {useEffect, useState} from "react";
import { authService } from "../fBase";
import {getAuth, onAuthStateChanged} from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
    if(user){
      setUserObj(user);
    }
    setInit(true);
  });
  }, []);
  return (
    <>
      {init ? (<AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> ) : ("Initialzing....")}

    </>
  );
}

export default App;
