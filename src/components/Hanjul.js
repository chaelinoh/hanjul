import { authService, dbService } from "../fBase";
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc, collection , getDoc} from "firebase/firestore";
import Home from "routes/Home";


const Hanjul = ({ hanjulObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [likeStatus, setLikeStatus] = useState({
        liked: hanjulObj.likes.includes(hanjulObj.uid),
        likeCount: hanjulObj.likeCount
    });
    const [newHanjul, setNewHanjul] = useState(hanjulObj.text);
    const HanjulTextRef = doc(dbService, "hanjuls", `${hanjulObj.id}`);
    //const HanjullikeCountRef = doc(dbService, "hanjuls", `${hanjulObj.likeCount}`);
    //const HanjullikesRef = doc(dbService, "hanjuls", `${hanjulObj.likes}`);
    const userId = authService.currentUser.uid;


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

    //좋아요 함수
    const handleLike = async (hanjulObj) => {
        //클릭에 따라 하트 색 바꿔주는 부분
        const newLikeStatus = { ...hanjulObj };
        if (!newLikeStatus.liked) {
            newLikeStatus.liked = true;
            newLikeStatus.likeCount++;
        } else {
            newLikeStatus.liked = false;
            newLikeStatus.likeCount--;
        }
        setLikeStatus(newLikeStatus);

        const hanjulRef = doc(dbService, "hanjuls", `${newLikeStatus.id}`);
        const hanjulDoc = await getDoc(hanjulRef);
        
        //likes필드에 id가 존재한다면 id삭제 후 likeCount - 1 해줌. 존재하지 않으면 그 반대.
        if (hanjulDoc.exists) {
            const likes = hanjulDoc.data().likes || [];
            const likeCount = hanjulDoc.data().likeCount || 0;
            if (likes.includes(userId)) {
                // remove the like if the user has already liked it
                await updateDoc(hanjulRef, {
                    likes: likes.filter(like => like !== userId),
                    likeCount: likeCount -1
                });
            } else {
                // add the like if the user hasn't liked it yet
                await updateDoc(hanjulRef, {
                    likes: [...likes, userId],
                    likeCount: likeCount +1
                });
            }
        }
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
                            {!isOwner && <button onClick={() => {handleLike(hanjulObj)}}>{likeStatus.liked ? "❤️" : "🤍"} {likeStatus.likeCount}</button>}
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