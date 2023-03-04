import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import HotPost from "../routes/HotPost";
import Recommend from "../routes/Recommend";
import Navigation from './Navigation';


const AppRouter = ({  refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router> {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home userObj={userObj} refreshUser={refreshUser} />} />
                        <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                        <Route path="/HotPost" element={<HotPost userObj={userObj} refreshUser={refreshUser} />} />

                    </>
                ) : (
                    <>
                        <Route path="/" element={<Auth />} />

                    </>
                )}
            </Routes>
        </Router>
    );
};
export default AppRouter;


