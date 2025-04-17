import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Comments from "../components/Comments";
import { url } from "../lib/apiRequest";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../lib/apiRequest";
import { dislikeVideo, fetchFailure, fetchStart, fetchSuccess, videoLike } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import { assets } from "../assets/assets";
import RecommendedVideos from "../components/RecommendedVideos";

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 50px;
  

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`;

const VideoFrame = styled.video`
  width: 100%;
  height: 500px;
  object-fit: cover;

  @media (max-width: 1200px) {
      height: 300px;
    }

    @media (max-width: 768px) {
      height: 200px;
    }  
`;

const Title = styled.div`
  font-size: max(1.2vw, 14px);
  font-weight: 400;
  margin-top: max(1.2vw, 8px);
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: max(1vw, 13px);

  @media (max-width: 750px) {
    
  }
`;

const Info = styled.div`
  color: ${({ theme }) => theme.textSoft};
  font-size: max(1vw, 11px);

  /* @media (max-width: 750px) {
    display: none;
  } */
`;

const Buttons = styled.div`
  display: flex;
  gap: max(1.5vw, 5px);
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: max(0.3vw, 2px);
  font-size: max(1vw, 11px);
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text};
`;

const StyledThumbUpIcon = styled(ThumbUpIcon)`
   &.MuiSvgIcon-root {
      width: max(1.5vw, 17px);
      height: max(1.5vw, 17px);
    }
`;

const StyledThumbUpOutlinedIcon = styled(ThumbUpOutlinedIcon)`
   &.MuiSvgIcon-root {
      width: max(1.5vw, 17px);
      height: max(1.5vw, 17px);
    }
`;

const StyledThumbDownIcon = styled(ThumbDownIcon)`
   &.MuiSvgIcon-root {
      width: max(1.5vw, 17px);
      height: max(1.5vw, 17px);
    }
`;

const StyledThumbDownOffAltOutlinedIcon = styled(ThumbDownOffAltOutlinedIcon)`
    &.MuiSvgIcon-root {
      width: max(1.5vw, 17px);
      height: max(1.5vw, 17px);
    }
`;

const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: max(1.2vw, 8px) 0px;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: max(1.3vw, 8px);
`;

const Image = styled.img`
  width: max(3vw, 24px);
  height: max(3vw, 24px);
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  font-size: max(1vw, 14px);
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: max(1.2vw, 10px);
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const EditVideo = styled.button`
  padding: max(0.5vw, 3px) max(0.8vw, 6px);
  border-radius: 4px;
  font-size: max(0.8vw, 10px);
  border: 1px solid #3994E2;
  color: #3994E2;
  background: transparent;
  align-self: flex-start;
  margin-top: max(1.2vw, 8px);
  cursor: pointer;
`;

const Subscribe = styled.button`
  background: #cc1a00;
  font-size: max(0.8vw, 11px);
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: max(0.6vw, 6px) max(1.1vw, 10px);
  cursor: pointer;
`;

const VideoDesc = styled.div`
  font-size: max(0.9vw, 11px)
`;

const Video = () => {
  // const path = useLocation().pathname.split("/")[2];
  const { currentVideo } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart())
        const resVideo = await apiRequest.get(`/videos/find/${id}`);
        const resChannel = await apiRequest.get(`/users/find/${resVideo.data.userId}`);
        setChannel(resChannel.data);
        dispatch(fetchSuccess(resVideo.data));

      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [id, dispatch]);


  const handleLike = async () => {
    if (currentUser) {
      try {
        await apiRequest.put(`/users/like/${currentVideo._id}`);
        dispatch(videoLike(currentUser._id));
      } catch (err) {
        console.error("Error liking video:", err);
      }
    } else {
      alert("Please log in to like the video.");
    }
  };

  const handleDislike = async () => {
    if (currentUser) {
      try {
        await apiRequest.put(`/users/dislike/${currentVideo._id}`);
        dispatch(dislikeVideo(currentUser._id));
      } catch (err) {
        console.error("Error disliking video:", err);
      }
    } else {
      alert("Please log in to dislike the video.");
    }
  };

   const handleSub = async () => {
      if (currentVideo?.userId !== currentUser?._id) {
          if (currentUser) {
            try {
              if (currentUser.subscribedChannels.includes(channel._id)) {
                await apiRequest.put(`/users/unsub/${channel._id}`);
    
              } else {
                await apiRequest.put(`/users/sub/${channel._id}`);
              }
              dispatch(subscription(channel._id));
    
            } catch (error) {
              console.error("Error subscribing to this channel!:", err);
            }
    
          } else {
            alert("Please log in to subscribe.");
          }

      } else {
         alert("You can't subscribe to your own channel!");
      }
  };

  return (
    <Container>
      <Content>
  
          <VideoFrame src={currentVideo?.videoUrl} controls />


        {
            currentVideo?.userId === currentUser?._id
                      &&
            <Link to={`/updateVideo/${currentVideo?._id}`}><EditVideo>Edit Video</EditVideo></Link>
          } 

        <Title>{currentVideo?.title}</Title>

        <Details>
          <Info>{currentVideo?.views} {currentVideo?.views === 1 ? "view" : "views"} &bull; {format(currentVideo?.createdAt)}</Info>
        
          <Buttons>
            <Button onClick={handleLike}>
              {currentUser && currentVideo?.likes.includes(currentUser._id)
                ? <StyledThumbUpIcon />
                : <StyledThumbUpOutlinedIcon />}
              {currentVideo?.likes.length}
            </Button>

            <Button onClick={handleDislike}>
              {currentUser && currentVideo?.dislikes.includes(currentUser._id)
                ? <StyledThumbDownIcon />
                : <StyledThumbDownOffAltOutlinedIcon />}
              {currentVideo?.dislikes.length}
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.fromGoogle ? channel?.img : channel?.img ? `${url}/images/${channel?.img}` : assets.noavatar} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} {channel?.subscribers === 1 ? "Subscriber" : "Subscribers"}</ChannelCounter>
              <VideoDesc>
                {currentVideo?.description}
              </VideoDesc>
            </ChannelDetail>
          </ChannelInfo>
          
          <Subscribe onClick={handleSub}>
            {
              currentUser && currentUser.subscribedChannels.includes(channel._id) 
                                      ?
                                  "SUBSCRIBED"
                                      :
                                  "SUBSCRIBE"
            }
            
          </Subscribe>
        </Channel>
        <Hr />
        <Comments currentVideo={currentVideo} />
      </Content>

      <RecommendedVideos tags={currentVideo?.tags} />
    </Container>
  )
}

export default Video