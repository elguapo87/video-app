import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { assets } from "../assets/assets";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';

const Container = styled.div`
    width: 100%;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: ${(props) => props.type === "sm" && "5px"};
    margin-bottom: ${(props) => props.type === "sm" && "10px"};

    @media (max-width: 750px) {
      flex-direction: ${(props) => props.type === "sm" && "column"};
      gap: ${(props) => props.type === "sm" && "8px"};
      margin-bottom: ${(props) => props.type === "sm" && "20px"};
    }
  `;

const Image = styled.img`
  width: ${(props) => props.type === "sm" ? "60%" : "100%"};
  height: ${(props) => props.type !== "sm" ? "202px" : "max(9vw, 100px)"};
  background: #999;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
      border-radius: 0;
      transform: scale(1.01);
    }

  @media (max-width: 750px) {
    height: ${(props) => props.type === "sm" && "180px"};
    width: ${(props) => props.type === "sm" && "100%"};
  }
`;

const Details = styled.div` 
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 10px;

  @media (max-width: 750px) {
    margin-top: ${(props) => props.type !== "sm" && "5px"};
  }
`;

const ChannelImage = styled.img`
  display: ${(props) => props.type === "sm" && "none"};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #999;

  @media (max-width: 750px) {
    width: ${(props) => props.type !== "sm" && "24px"};
    height: ${(props) => props.type !== "sm" && "24px"};
  }
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: ${(props) => props.type !== "sm" ? "16px" : "max(0.9vw, 12px)"};
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (max-width: 750px) {
    font-size: ${(props) => props.type !== "sm" && "13px"};
  }
`;

const ChannelName = styled.h2`
  font-size: ${(props) => props.type !== "sm" ? "14px" : "max(0.8vw, 11px)"};
  color: ${({ theme }) => theme.textSoft};
  margin: ${(props) => props.type !== "sm" ? "9px 0px" : "max(0.5vw, 2px) 0px"};

  @media (max-width: 750px) {
    /* margin: ${(props) => props.type === "sm" ? "5px 0px" : "0px"}; */
    margin: 5px 0px;
    font-size: ${(props) => props.type !== "sm" && "13px"};
  }
`;

const Info = styled.div`
  font-size: ${(props) => props.type !== "sm" ? "14px" : "max(0.8vw, 10px)"};
  color: ${({ theme }) => theme.textSoft};

  @media (max-width: 750px) {
    font-size: ${(props) => props.type !== "sm" && "12px"};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const AddButton = styled.button`
  display: ${(props) => props.type === "sm" && "none"};
  align-self: flex-start;
  justify-self: flex-end;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.text};;
`;

const StyledAddIcon = styled(LibraryAddOutlinedIcon)`
  &.MuiSvgIcon-root {
      width: max(1.5vw, 20px);
      height: max(1.5vw, 20px);
  }
`;

const Card = ({ type }) => {

    const navigate = useNavigate()

    const currentUser = true;

    return (
        <Container type={type}>
            <Image onClick={() => navigate("/video/7455")} type={type} src={assets.no_thumbnail} />
            <Details type={type}>
                <InfoContainer>
                    <Link to="/">
                        <ChannelImage type={type} src={assets.noavatar} />
                    </Link>
                    <Texts>
                        <Title type={type}>Video Title</Title>
                        <Link to="/">
                            <ChannelName type={type}>Channel Name</ChannelName>
                        </Link>
                        <Info type={type}>views &bull; 15k</Info>
                    </Texts>
                </InfoContainer>
                {
                    currentUser
                    &&
                    <AddButton type={type}>
                        <StyledAddIcon />
                    </AddButton>
                }
            </Details>
        </Container>
    )
}

export default Card
