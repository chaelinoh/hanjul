import { authService, dbService } from "../fBase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Home from "routes/Home";

const Hanjul = ({ hanjulObj, isOwner, handleLike }) => {
    const [editing, setEditing] = useState(false);
    const [likeButton, setLikeButton] = useState("🤍");
    const [newHanjul, setNewHanjul] = useState(hanjulObj.text);
    const HanjulTextRef = doc(dbService, "hanjuls", `${hanjulObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 지우시겠습니까?");
        console.log(ok);
        if (ok) {
            await deleteDoc(HanjulTextRef);  //firestore 경로(hanjul) 과 home.js에서 가져온 hanjulobj속 id
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(hanjulObj, newHanjul);
        await updateDoc(HanjulTextRef, { text: newHanjul, });
        setEditing(false);
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewHanjul(value);

    };

    const likeHandler = () => {
        setLikeButton((prevState) => (prevState === "🤍" ? "🖤" : "🤍"))
    }
    


    return (
        <div>
            {
                editing ? (
                    <>
                        {isOwner && <>
                            <form onSubmit={onSubmit}>
                                <input type="text" placeholder="글 수정" value={newHanjul} required onChange={onChange} />
                                <input type="submit" value="업데이트" />
                            </form>
                            <button onClick={toggleEditing}>취소</button>
                        </>}
                    </>

                ) : (
                    <>
                        <h4>{hanjulObj.text}</h4>
                        <p>Likes:{hanjulObj.likeCount}</p>
                        <div>
                            {!isOwner && <button onClick={() =>{ handleLike(hanjulObj); likeHandler();}}>{likeButton}</button>}
                        </div>

                        {isOwner && (
                            <>

                                <button onClick={onDeleteClick}>삭제</button>
                                <button onClick={toggleEditing}>수정</button>
                            </>
                        )}
                    </>
                )}
        </div>
    );
};

export default Hanjul;