import { useEffect, useState } from "react"
import apiRequest from "../lib/apiRequest";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 30px;
    padding-bottom: 50px;

    @media (max-width: 1350px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1050px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 750px) {
      grid-template-columns: 1fr;
    }
`;

const SavedVideos = () => { 
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
        try {
            const res = await apiRequest.get("/users/savedVideos");
            setVideos(res.data);
        } catch (err) {
            console.error("Failed to fetch saved videos:", err);
        }
    };  
    fetchVideos();
  }, []);

  const handleUnsave = (videoId) => {
    setVideos((prev) => prev.filter((video) => video._id !== videoId));
  };

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} onUnsave={handleUnsave} />
      ))}
    </Container>
  )
}

export default SavedVideos
