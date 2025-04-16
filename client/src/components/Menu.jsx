import styled from "styled-components";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 997;
`;


const Container = styled.div`
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-size: max(1vw, 12px);
    width: 15vw;
    padding-top: max(3.5vw, 50px);
    padding-left: max(1.8vw, 5px);
    min-height: 100vh;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: max(0.8vw, 5px);
  cursor: pointer;
  padding: max(0.5vw, 3px) 0px;

  &:hover {
    background: ${({theme}) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: max(1vw, 5px) 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  width: 100%;
`;

const Login = styled.div`

`;

const Button = styled.button`
  padding: max(0.3vw, 2px) max(1vw, 6px);
  background: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  margin-top: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: max(0.4vw, 2px);
  font-size: max(0.9vw, 10px);
`;

const StyledAccountIcon = styled(AccountCircleOutlinedIcon)`
  &.MuiSvgIcon-root {
      width: max(1.5vw, 18px);
      height: max(1.5vw, 18px);
  }
`;

const Title = styled.h2`
  font-size: max(0.8vw, 11px);
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: max(1vw, 5px);
`;

const Menu = ({ darkMode, setDarkMode, menuOpen, setMenuOpen }) => {
    const currentUser = false;

    return (
        <>
            <MenuWrapper>
                <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

                <Container className={menuOpen ? "mobile-menu active" : "mobile-menu"}>
                    <Link to="/">
                        <Item>
                            <HomeOutlinedIcon />
                            Home
                        </Item>
                    </Link>
                    <Link to="/trend">
                        <Item>
                            <ExploreOutlinedIcon />
                            Explore
                        </Item>
                    </Link>
                    {
                        currentUser
                        &&
                        <Link to="/sub">
                            <Item>
                                <SubscriptionsOutlinedIcon />
                                Subscriptions
                            </Item>
                        </Link>
                    }
                    <Hr />
                    {
                        currentUser
                        &&
                        <Link to="/savedVideos">
                            <Item>
                                <VideoLibraryOutlinedIcon />
                                Library
                            </Item>
                        </Link>
                    }
                    <Item>
                        <HistoryOutlinedIcon />
                        History
                    </Item>
                    <Hr />
                    {
                        !currentUser
                        &&
                        <>
                            <Login>
                                Sign in to like videos, comment and subscribe.
                                <Link to="/"><Button><StyledAccountIcon />Login</Button></Link>
                            </Login>
                            <Hr />
                        </>
                    }
                    <Title>BEST OF PGTube</Title>
                    <Link to="/">
                        <Item>
                            <LibraryMusicOutlinedIcon />
                            Music
                        </Item>
                    </Link>
                    <Link to="/">
                        <Item>
                            <SportsBasketballOutlinedIcon />
                            Sports
                        </Item>
                    </Link>
                    <Link to="/">
                        <Item>
                            <SportsEsportsOutlinedIcon />
                            Gaming
                        </Item>
                    </Link>
                    <Link to="/">
                        <Item>
                            <MovieOutlinedIcon />
                            Movies
                        </Item>
                    </Link>
                    <Link to="/">
                        <Item>
                            <ArticleOutlinedIcon />
                            News
                        </Item>
                    </Link>
                    <Link to="/">
                        <Item>
                            <VideoCameraBackOutlinedIcon />
                            Documentary
                        </Item>
                    </Link>
                    <Hr />
                    <Item onClick={() => setDarkMode(!darkMode)}>
                        <SettingsBrightnessOutlinedIcon />
                        {darkMode ? "Light" : "Dark"} Mode
                    </Item>
                </Container>
            </MenuWrapper>
        </>
    )
}

export default Menu
