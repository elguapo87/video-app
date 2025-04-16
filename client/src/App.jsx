import { Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import Home from './pages/Home';
import Menu from './components/Menu';

const Container = styled.div`
  display: flex;
`;

const MenuContainer = styled.div`
  flex: 1;
`;

const App = () => {

  return (
    <Container>
      <MenuContainer>
          <Menu />
        </MenuContainer>
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App
