import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import apiRequest from '../lib/apiRequest';
import Card from '../components/Card';

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

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchVideos = async () => {
      let url = `/videos/${type}`;
      const queryParams = new URLSearchParams(location.search);
      const tags = queryParams.get("tags");

      if (tags) {
        url = `/videos/tags?tags=${tags}`;
      } 

      const res = await apiRequest.get(url);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type, location]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Home
