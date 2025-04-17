import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import apiRequest from '../lib/apiRequest';
import Card from './Card';

const Container = styled.div`
    flex: 2;
`;

const RecommendedVideos = ({ tags }) => {
    
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
        try {
            const res = await apiRequest.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
        } catch (err) {
            console.error("Failed to fetch videos", err);
        }
    };
    fetchVideos();
  }, [tags])

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} type="sm" video={video} />
      ))}
    </Container>
  )
}

export default RecommendedVideos
