import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoodreads, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCrown, faHeart, faHome, faSearch, faUser, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {








    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <li>
                    <Link to="/" style={{ marginRight: 5 }}>
                        <FontAwesomeIcon icon={faHome} color={"#ff9d00"} size="2x" />
                        </Link>
                        </li>
                        <li>
                            <Link
                            to="/mypage"
                            style={{
                            marginLeft: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                        >
                            <FontAwesomeIcon icon={faUser} color={"#ff9d00"} size="2x" />
                            <span style={{ marginTop: 10 }}>
                            {userObj.displayName
                            ? `${userObj.displayName}의 Profile`
                            : "Profile"}
                            </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/hotpost">
                                <FontAwesomeIcon icon={faHeart} color={"#ff9d00"} size="2x" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/searchhash" style={{ marginLeft: 25 }}>
                            <FontAwesomeIcon icon={faSearch} color={"#ff9d00"} size="2x" />
                                </Link>
                        </li>
            </ul>
        </nav>
    );
};

export default Navigation;