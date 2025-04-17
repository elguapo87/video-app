import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiRequest, { url } from "../lib/apiRequest";
import { format } from "timeago.js";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveVideo } from "../redux/userSlice";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';

const Container = styled.div`
    width: 100%;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: ${(props) => props.type === "sm" && "5px"};
    margin-bottom: ${(props) => props.type === "sm" && "10px"};

    @media (max-width: 750px) {
      flex-direction: ${(props) => props.type === "sm" && "column"};
      gap: ${(props) => props.type === "sm" && "8px"};
      margin-bottom: ${(props) => props.type === "sm" && "20px"};
    }
  `;

const Image = styled.img`
  width: ${(props) => props.type === "sm" ? "60%" : "100%"};
  height: ${(props) => props.type !== "sm" ? "202px" : "max(9vw, 100px)"};
  background: #999;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
      border-radius: 0;
      transform: scale(1.01);
    }

  @media (max-width: 750px) {
    height: ${(props) => props.type === "sm" && "180px"};
    width: ${(props) => props.type === "sm" && "100%"};
  }
`;

const Details = styled.div` 
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 10px;

  @media (max-width: 750px) {
    margin-top: ${(props) => props.type !== "sm" && "5px"};
  }
`;

const ChannelImage = styled.img`
  display: ${(props) => props.type === "sm" && "none"};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #999;

  @media (max-width: 750px) {
    width: ${(props) => props.type !== "sm" && "24px"};
    height: ${(props) => props.type !== "sm" && "24px"};
  }
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: ${(props) => props.type !== "sm" ? "16px" : "max(0.9vw, 12px)"};
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (max-width: 750px) {
    font-size: ${(props) => props.type !== "sm" && "13px"};
  }
`;

const ChannelName = styled.h2`
  font-size: ${(props) => props.type !== "sm" ? "14px" : "max(0.8vw, 11px)"};
  color: ${({ theme }) => theme.textSoft};
  margin: ${(props) => props.type !== "sm" ? "9px 0px" : "max(0.5vw, 2px) 0px"};

  @media (max-width: 750px) {
    /* margin: ${(props) => props.type === "sm" ? "5px 0px" : "0px"}; */
    margin: 5px 0px;
    font-size: ${(props) => props.type !== "sm" && "13px"};
  }
`;

const Info = styled.div`
  font-size: ${(props) => props.type !== "sm" ? "14px" : "max(0.8vw, 10px)"};
  color: ${({ theme }) => theme.textSoft};

  @media (max-width: 750px) {
    font-size: ${(props) => props.type !== "sm" && "12px"};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const AddButton = styled.button`
  display: ${(props) => props.type === "sm" && "none"};
  align-self: flex-start;
  justify-self: flex-end;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.text};;
`;

const StyledAddIcon = styled(LibraryAddOutlinedIcon)`
  &.MuiSvgIcon-root {
      width: max(1.5vw, 20px);
      height: max(1.5vw, 20px);
  }
`;

const StyledRemoveIcon = styled(BookmarkRemoveOutlinedIcon)`
  &.MuiSvgIcon-root {
      width: max(1.5vw, 20px);
      height: max(1.5vw, 20px);
  }
`;

const Card = ({ type, video, onUnsave }) => {
  const [channel, setChannel] = useState([]);
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await apiRequest.get(`/users/find/${video.userId}`);
        setChannel(res.data);

      } catch (err) {
        console.error("Failed to fetch channel", err);
      }
    };
    fetchChannel();
  }, [video.userId]);

  const handleAddView = async () => {
    try {
      await apiRequest.put(`/videos/view/${video._id}`);
      navigate(`/video/${video._id}`);

    } catch (err) {
      console.error("Failed to add view", err);
    }
  };

  useEffect(() => {
    if (currentUser?.savedVideos.includes(video._id)) {
      setIsSaved(true);
    }
  }, [currentUser, video._id]);

  const saveVideo = async () => {
    try {
      await apiRequest.put(`/users/saveVideo/${video._id}`);
      setIsSaved(!isSaved);
      dispatch(toggleSaveVideo(video._id));

      if (isSaved && onUnsave) {
        onUnsave(video._id);
      }

    } catch (err) {
      console.error("Failed to save/unsave video:", err);
    }
  }

  console.log(`${url}/images/${channel.img}`)

  return (
    <Container type={type}>
      <Image onClick={handleAddView} type={type} src={video.imgUrl ? video.imgUrl : assets.no_thumbnail} />
      <Details type={type}>
        <InfoContainer>
          <Link to={`/user/${channel._id}`}>
            <ChannelImage type={type} src={channel?.fromGoogle ? channel?.img : channel.img ? `${url}/images/${channel.img}` : assets.noavatar} />
          </Link>
          <Texts>
            <Title type={type}>{video.title}</Title>
            <Link to={`/user/${channel._id}`}>
              <ChannelName type={type}>{channel.name}</ChannelName>
            </Link>
            <Info type={type}>{video.views} views &bull; {format(video.createdAt)}</Info>
          </Texts>
        </InfoContainer>
        {
          currentUser
          &&
          <AddButton type={type} onClick={saveVideo}>
            {isSaved ? <StyledRemoveIcon /> : <StyledAddIcon />}
          </AddButton>
        }
      </Details>
    </Container>
  )
}

export default Card
