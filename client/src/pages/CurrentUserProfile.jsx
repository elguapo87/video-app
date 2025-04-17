import { useSelector } from "react-redux"
import styled from "styled-components";
import { format } from "timeago.js";
import apiRequest, { url } from "../lib/apiRequest";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import { assets } from "../assets/assets";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: max(1.8vw, 10px);
    color: ${({ theme }) => theme.text};
    gap: 20px;
    margin-bottom: 50px;
    position: relative;
`;

const ChannelImage = styled.img`
    width: max(15vw, 120px);
    height: max(15vw, 120px);
    border-radius: 50%;
`;

const ChannelInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: max(2.2vw, 20px);
`;

const Span = styled.span`
    font-size: max(1vw, 14px);
`;

const SubInfo = styled.div`
    font-size: max(1vw, 14px);
    margin-bottom: 40px;

    @media (max-width: 750px) {
        margin-bottom: 5px;;
    }
`;

const VideoContainer = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 20px;
    column-gap: 20px;

    @media (max-width: 750px) {
        grid-template-columns: 1fr;
    }
`;

const EditButton = styled.button`
    position: absolute;
    top: 0;
    left: 70%;
    padding: max(0.5vw, 5px) max(1.1vw, 10px);
    border-radius: 5px;
    font-size: max(0.8vw, 11px);
    border: 1px solid #3EA6FF;
    background: transparent;
    color: #3EA6FF;
    cursor: pointer;

    @media (max-width: 750px) {
        left: 80%;
        border-radius: 3px;
    }
`;

const CurrentUserProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchChannel = async () => {
            if (id !== currentUser?._id) {
                try {
                    const res = await apiRequest.get(`/users/find/${id}`);
                    setChannel(res.data);

                } catch (err) {
                    console.log(err);
                }

            } else {
                setChannel(currentUser);
            }
        };
        fetchChannel();
    }, [id, currentUser]);

    useEffect(() => {
        const fetchVideos = async () => {
            if (channel?._id) {
                try {
                    const res = await apiRequest.get(`/videos/user/${channel._id}`);
                    setVideos(res.data);

                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchVideos();
    }, [channel]);

    return (
        <Container>
            {currentUser && currentUser._id === channel?._id && !currentUser.fromGoogle && (
                <Link to="/update/:id"><EditButton>Edit</EditButton></Link>
            )}
            {channel && (
                <>
                    <ChannelImage
                        src={channel?.fromGoogle ? channel?.img : channel.img ? `${url}/images/${channel.img}` : assets.noavatar}
                        alt="Channel avatar"
                    />
                    <ChannelInfo>
                        <Title>{channel.name}</Title>
                        <Span>Joined: {format(channel.createdAt)}</Span>
                    </ChannelInfo>
                    <SubInfo>{channel.subscribers} {channel.subscribers === 1 ? "subscriber" : "subscribers"}</SubInfo>
                </>
            )}

            <Title>User Videos</Title>

            <VideoContainer>
                {
                    videos.length > 0
                        ?
                        videos.map((video) => (
                            <Card key={video._id} video={video} />
                        ))
                        :
                        "This user has no videos"
                }
            </VideoContainer>

        </Container>
    )
}

export default CurrentUserProfile
