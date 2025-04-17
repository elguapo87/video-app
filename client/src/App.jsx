import { useState } from 'react'
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/theme";
import Menu from "./components/Menu";
import Home from './pages/Home';
import Video from "./pages/Video";
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CurrentUserProfile from './pages/CurrentUserProfile';
import Search from './pages/Search';
import UpdateProfile from './pages/UpdateProfile';
import SavedVideos from './components/SavedVideos';
import UpdateVideo from './pages/UpdateVideo';

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
            <Route index path="/" element={<Home type="random" />} />
            <Route path="/trend" element={<Home type="trend" />} />
            <Route path="/sub" element={<Home type="sub" />} />
            <Route path="/videos" element={<Home type="tags" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/user/:id" element={<CurrentUserProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/update/:id" element={<UpdateProfile />} />
            <Route path="/updateVideo/:id" element={<UpdateVideo />} />
            <Route path="/savedVideos" element={<SavedVideos />} />   
          </Routes>
        </Main>
      </Container>
    </ThemeProvider>


  )
}

export default App
