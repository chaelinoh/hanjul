import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">{userObj}의 Home</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj}의 Profile</Link>
                </li>
                <li>
                    <Link to="/HotPost">인기글</Link>
                </li>
                <li>
                    <Link to="/Recommend">오늘의 한줄 추천</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;