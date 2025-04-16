import styled from 'styled-components'

const Container = styled.div`    
    display: grid;
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

const Home = () => {

  return (
    <Container>
      Home
    </Container>
  )
}

export default Home

