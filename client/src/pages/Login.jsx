import { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;  

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: max(1.3vw, 10px) max(3.5vw, 30px);
  gap: 10px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  cursor: pointer;
  font-size: max(1.3vw, 18px);
`;

const Title = styled.h1`
  font-size: max(1.5vw, 20px);
`;

const SubTitle = styled.h2`
  font-size: max(1.2vw, 16px);
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: max(0.6vw, 5px);
  font-size: max(0.9vw, 11px);
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const ImageInput = styled.input`
  
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: max(0.6vw, 5px) max(1.2vw, 12px);
  font-size: max(0.9vw, 11px);
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: max(0.7vw, 9px);
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: max(3.5vw, 10px);
`;

const Link = styled.span`
  margin-left: max(2vw, 25px);
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const CancelImage = styled.p`
  cursor: pointer;
`;

const SignIn = () => {

    const [img, setImg] = useState(null);
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => navigate("/")}>X</Close>
                <Title>Sign in</Title>
                <SubTitle>to subscribe to PGTube</SubTitle>
                <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
                <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                {loginError && <span className="error-message">{loginError}</span>}
                <Button>Sign in</Button>
                <Title>or</Title>
                <Button>Signin with google</Button>
                <Title>or</Title>
                <ProfileImageContainer>
                  {img && <ProfileImage src={URL.createObjectURL(img)} />}
                  {img && <CancelImage onClick={handleCancelImage}>x</CancelImage>}  
                </ProfileImageContainer>
                <ImageInput onChange={(e) => setImg(e.target.files[0])} type="file" accept="image/*" id="image" />
                <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                <Button>Sign up</Button>
            </Wrapper>

            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn


