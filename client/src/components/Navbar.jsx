import styled from 'styled-components'
import { assets } from "../assets/assets";
import SearchIcon from "@mui/icons-material/Search"
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest, { url } from '../lib/apiRequest';
import { logout } from '../redux/userSlice';
import { useState } from 'react';

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 997;
    background: ${({ theme }) => theme.bg};
    padding: 37px max(2.5vw, 10px);
    color: ${({ theme }) => theme.text};
    width: 100%;
    box-shadow: 0 0 10px ${({theme}) => theme.textSoft};
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;
    gap: max(1.4vw, 3px);
`;

const MenuIcon = styled.img`
    width: max(1.6vw, 18px);
    cursor: pointer;
`;

const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    gap: max(0.5vw, 3px);
    font-size: max(1.4vw, 16px);
    font-weight: bold;
`;

const LogoText = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoImg = styled.img`
    width: max(2.8vw, 30px);
    
`;

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    padding: max(0.3vw, 3px) max(0.8vw, 8px);
    border-radius: 25px;
`;

const Input = styled.input`
    width: max(25vw, 100px);
    border: 0;
    outline: 0;
    background: transparent;
    color: ${({theme}) => theme.text};
    font-size: max(1vw, 12px);
`;

const StyledSearchIcon = styled(SearchIcon)`
    cursor: pointer;
    color: ${({theme}) => theme.text};
    
    &.MuiSvgIcon-root {
        width: max(1.8vw, 18px);
        height: max(1.8vw, 18px);
    }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: max(0.6vw, 5px);
  font-weight: 500;
  color: ${({theme}) => theme.text};
`;

const StyledVideoIcon = styled(VideoCallOutlinedIcon)`
  cursor: pointer;

  &.MuiSvgIcon-root {
      width: max(2vw, 24px);
      height: max(2vw, 24px);
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #999;
  cursor: pointer;
`;

const P = styled.p`
  @media (max-width: 700px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  padding: 2px 8px;
  background: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-size: max(0.8vw, 11px);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 750px) {
    padding: 2px 5px;
    gap: 1px;
  }
`;

const StyledAccountIcon = styled(AccountCircleOutlinedIcon)`
  &.MuiSvgIcon-root {
      width: max(1.5vw, 18px);
      height: max(1.5vw, 18px);
  }
`;

const Button = styled.button`
  padding: max(0.3vw, 2px) max(1vw, 6px);
  background: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: max(0.9vw, 12px);

  @media (max-width: 750px) {
    gap: 1px;
  }
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  &.MuiSvgIcon-root {
      width: max(1.5vw, 18px);
      height: max(1.5vw, 18px);
  }
`;

const Navbar = ({ menuOpen, setMenuOpen, setVideoOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [q, setQ] = useState("");
    
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await apiRequest.get("/auth/signout");
      dispatch(logout(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <Nav>
        <NavLeft>
            <MenuIcon src={assets.menu_icon} onClick={() => setMenuOpen(!menuOpen)} />
            <Link to="/">
              <ImgContainer>
                  <LogoImg src={assets.logo} />
                  <LogoText>PGTube</LogoText>
              </ImgContainer>
            </Link>
        </NavLeft>

        <SearchBox>
            <Input placeholder="Search..." onChange={(e) => setQ(e.target.value)} />
            <StyledSearchIcon onClick={() => navigate(`/search?q=${q}`)} />
        </SearchBox>

        <NavRight>
            {
                currentUser
                    ?
                <User>
                    <StyledVideoIcon onClick={() => setVideoOpen(true)} />
                    <Avatar onClick={() => navigate(`/user/${currentUser._id}`)} src={currentUser?.fromGoogle ? currentUser?.img : currentUser.img ? `${url}/images/${currentUser.img}` : assets.noavatar} />
                        <P>{currentUser.name}</P>
                    <LogoutButton onClick={handleLogout}>
                        <StyledLogoutIcon />
                        Logout
                    </LogoutButton>
                </User>
                    :
                <Link to="/login">
                  <Button>
                      <StyledAccountIcon />
                      Sign In
                  </Button>
                </Link>
            }
        </NavRight>
      </Nav>

      
    </>
  )
}
export default Navbar