import { useEffect, useState } from "react";
import styled from "styled-components";
import apiRequest, { url } from "../lib/apiRequest";
import { assets } from "../assets/assets";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* gap: 10px;
  margin: 30px 0px; */
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
    width: max(3vw, 24px);
    height: max(3vw, 24px);
    border-radius: 50%;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: max(0.95vw, 13px);
  font-weight: 500; 
`;


const Date = styled.span`
  font-size: max(0.85vw, 12px);
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: max(0.85vw, 12px);
`;

const DeleteBtn = styled.button`
  padding: max(0.3vw, 3px) max(0.6vw, 8px);
  background: transparent; 
  border: 1px solid #f00d0d;
  color: ${({ theme }) => theme.text};
  font-size: max(0.8vw, 11px);
  cursor: pointer;
`;

const Comment = ({ comment, currentVideo, setComments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await apiRequest.get(`/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.error("Error fetching channel", err);
      }
    };
    fetchChannel();
  }, [comment.userId]);  

  
  
  const handleDelete = async () => {
    try {
      await apiRequest.delete(`/comments/${comment._id}`)
      setComments((prev) => prev.filter((c) => c._id !== comment._id));

    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  const isOwner = currentUser && (currentUser._id === comment.userId || currentUser._id === currentVideo.userId);

  return (
    <Container>
      <Wrapper>
        <Avatar src={channel.fromGoogle ? channel.img : channel.img ? `${url}/images/${channel.img}` : assets.noavatar} />
        <Details>
          <Name>{channel.name} <Date>{format(channel.createdAt)}</Date></Name>
          <Text>
            {comment.description}
            
          </Text>
        </Details>
      </Wrapper>
      {isOwner && (<DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>)}
    </Container>
  )
}

export default Comment
