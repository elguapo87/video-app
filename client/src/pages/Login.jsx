import { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import apiRequest from "../lib/apiRequest";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};

  @media (max-width: 750px) {
    
  }
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

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState(null);
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState("");
    const [signInError, setSignInError] = useState("");
    const imageInputRef = useRef(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();

      dispatch(loginStart());

      try {
        const res = await apiRequest.post("/auth/signin", {
          name,
          password
        });
        dispatch(loginSuccess(res.data));
        navigate("/");

      } catch (err) {
        dispatch(loginFailure());
        setLoginError(err.response.data.message);
      }    
    };

    const handleSignUp = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email),
      formData.append("password", password);
      if (img) {
        formData.append("image", img);
      }

      try {
        await apiRequest.post("/auth/signup", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        handleLogin(e);

      } catch (err) {
        setSignInError(err.response.data.message);
      }
    };

    const signInWithGoogle = async () => {
      dispatch(loginStart());
      signInWithPopup(auth, provider)
        .then((result) => {
          apiRequest.post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL  
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate("/");
          })
        })
        .catch((error) => {
          dispatch(loginFailure());
        });
    };

    const handleCancelImage = () => {
      setImg(null);
      imageInputRef.current.value = "";
    };

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => navigate("/")}>X</Close>
                <Title>Sign in</Title>
                <SubTitle>to subscribe to PGTube</SubTitle>
                <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
                <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                {loginError && <span className="error-message">{loginError}</span>}
                <Button onClick={handleLogin}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Signin with google</Button>
                <Title>or</Title>
                <ProfileImageContainer>
                  {img && <ProfileImage src={URL.createObjectURL(img)} />}
                  {img && <CancelImage onClick={handleCancelImage}>x</CancelImage>}  
                </ProfileImageContainer>
                <ImageInput ref={imageInputRef} onChange={(e) => setImg(e.target.files[0])} type="file" accept="image/*" id="image" />
                <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                {signInError && <span className="error-message">{signInError}</span>}
                <Button onClick={handleSignUp}>Sign up</Button>
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

export default Login


