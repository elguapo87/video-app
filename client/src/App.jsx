import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from "styled-components";
import Home from './pages/Home';
import Menu from './components/Menu';
import Login from "./pages/Login";
import { useState } from 'react';
import { darkTheme, lightTheme } from './utils/theme';
import Video from './pages/Video';

const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bg};
`;

const MenuContainer = styled.div`
  flex: 1;
`;

const Main = styled.div`
  margin-top: 150px;
  padding-right: max(2vw, 20px);
  color: ${({ theme }) => theme.text};
  min-height: 100vh;

  @media (max-width: 750px) {
    margin-top: 135px;
  }
`;

const App = () => {

  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <MenuContainer>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </MenuContainer>
        <Main className={menuOpen ? "narrow" : "wide"}>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/video/:id" element={<Video />} />
          </Routes>
        </Main>
      </Container>
    </ThemeProvider>
  )
}

export default App
