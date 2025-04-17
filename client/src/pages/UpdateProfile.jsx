import { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import apiRequest, { url } from "../lib/apiRequest";
import { loginFailure, loginStart, loginSuccess, updateUserSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
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
  padding: max(1.3vw, 10px) max(3.5vw, 20px);
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
  width: 100%;
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

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const imageInputRef = useRef(null);

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (name) formData.append("name", name);
    else formData.append("name", currentUser.name);

    if (email) formData.append("email", email);
    else formData.append("email", currentUser.email);

    if (password) formData.append("password", password)

    if (img) {
      formData.append("image", img);
    }

    try {
      const res = await apiRequest.put(`/users/${currentUser._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(updateUserSuccess(res.data))
      navigate(`/user/${currentUser._id}`);

    } catch (err) {
      setError(err.response.data.message);
    }
  };


  const handleCancelImage = () => {
    setImg(null);
    imageInputRef.current.value = "";
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => navigate(`/user/${currentUser._id}`)}>X</Close>
        <Title>Edit Profile</Title>
        <ProfileImageContainer>
          {img ? (
            <>
              <ProfileImage src={URL.createObjectURL(img)} alt="New profile preview" />
              <CancelImage onClick={handleCancelImage}>x</CancelImage>
            </>
          ) : (
            currentUser.img && (
              <>
                <ProfileImage src={currentUser.img ? `${url}/images/${currentUser.img}` : assets.noavatar} alt="Current profile image" />
                <CancelImage onClick={handleCancelImage}>x</CancelImage>
              </>
            )
          )}
        </ProfileImageContainer>
        <ImageInput ref={imageInputRef} onChange={(e) => setImg(e.target.files[0])} type="file" accept="image/*" id="image" />
        <Input placeholder="username" onChange={(e) => setName(e.target.value)} defaultValue={currentUser.name} />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} defaultValue={currentUser.email} />
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} defaultValue={currentUser.password} />
        {error && <span className="error-message">{error}</span>}
        <Button onClick={handleUpdate}>Update Profile</Button>
      </Wrapper>
    </Container>
  )
}

export default UpdateProfile



