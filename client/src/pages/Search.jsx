import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { useLocation, useParams } from "react-router-dom";
import Card from "../components/Card";
import styled from "styled-components";

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

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const searchVideos = async () => {
            const res = await apiRequest.get(`/videos/search${query}`);
            setVideos(res.data);
        };
        searchVideos();
    }, [query]);

    return (
        <Container>
            {videos.map((video) => (
                <Card key={video._id} video={video} />
            ))}
        </Container>
    )
}

export default Search
