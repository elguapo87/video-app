import styled from "styled-components";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import apiRequest, { url } from "../lib/apiRequest";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: max(0.6vw, 5px);
`;

const Avatar = styled.img`
    width: max(3vw, 24px);
    height: max(3vw, 24px);
    border-radius: 50%;
`;

const InputBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3px;
`;

const Input = styled.textarea`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    background: transparent;
    outline: none;
    font-size: max(0.85vw, 12px);
    padding: 5px;
    width: 100%;
    color: ${({ theme }) => theme.text};
    /* resize: none;  */
    line-height: 1.5; 
`;

const SendBtn = styled.button`
    padding: max(0.4vw, 3px) max(1vw, 8px);
    font-size: 13px;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.text};;
    color: ${({ theme }) => theme.text};;
    border-radius: 3px;
    font-size: max(0.8vw, 11px);
    font-weight: 500;
    cursor: pointer;
    margin-top: 4px;
`;

const Comments = ({ currentVideo }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await apiRequest.get(`/comments/${currentVideo._id}`);
                setComments(res.data);
            } catch (err) {
                console.error("Error fetching comments", err);
            }
        };
        fetchComments();
    }, [currentVideo?._id]);

    const handleSendComment = async () => {
        if (currentUser) {
            try {
                const res = await apiRequest.post("/comments", {
                    userId: currentUser?._id,
                    videoId: currentVideo?._id,
                    description
                })
                setComments((prev) => [...prev, res.data]);
                setDescription("")
            } catch (err) {
                console.error("Error sending comment", err);
            }

        } else {
            alert("Please log in to send comment.");
            setDescription("");
        }
    };

    return (
        <Container>
            <NewComment>
                <Avatar
                    src={currentUser ?
                        (currentUser?.fromGoogle ? currentUser?.img : currentUser?.img ? `${url}/images/${currentUser?.img}` : assets.noavatar)
                        : assets.noavatar}
                />
                <InputBox>
                    <Input placeholder="Add a comment..." rows="1" onChange={(e) => setDescription(e.target.value)} value={description} />
                    {description && <SendBtn onClick={handleSendComment}>Send</SendBtn>}
                </InputBox>
            </NewComment>
            {comments.map((comment) => (
                <Comment key={comment?._id} comment={comment} currentVideo={currentVideo} setComments={setComments} />
            ))}
        </Container>
    );
};

export default Comments;
