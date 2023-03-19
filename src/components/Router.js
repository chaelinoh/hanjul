import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import HotPost from "../routes/HotPost";
//import Recommend from "../routes/Recommend";
import Navigation from './Navigation';
import MyPage from "routes/MyPage";
import Write from "routes/Write";

import SearchHash from "routes/SearchHash";


const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router> {isLoggedIn && <Navigation userObj={userObj} />}
        <div
            style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}>
            
            <Routes>
                {isLoggedIn ? (
                <>
                <Route path="/" element={<Home userObj={userObj} />} />
                <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                <Route path="/mypage" element={<MyPage userObj={userObj} refreshUser={refreshUser} />} />
                <Route path="/hotpost" element={<HotPost userObj={userObj} refreshUser={refreshUser} />} />

                <Route path="/write" element={<Write userObj={userObj} refreshUser={refreshUser} />} />
                <Route path="/searchhash" element={<SearchHash userObj={userObj} refreshUser={refreshUser} />} />
                </>
                ) : (
                <>
                <Route path="/" element={<Auth />} />
                </>  
                )}
            </Routes>
            
            </div>
        </Router>
    );
};
export default AppRouter;