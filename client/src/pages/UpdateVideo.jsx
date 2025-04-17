import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import app from "../lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 998;
`;

const Wrapper = styled.div`
    width: max(35vw, 400px);
    /* height: max(35vw, 400px); */
    background: ${({ theme }) => theme.bgLight};
    color: ${({ theme }) => theme.text};
    padding: max(2.5vw, 20px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
`;

const Close = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    font-size: max(1.5vw, 16px);
`;

const Title = styled.h1`
    font-size: max(2vw, 20px);
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    font-size: max(0.8vw, 11px);
    border-radius: 3px;
    padding: max(0.7vw, 5px);
    background: transparent;
`;

const Desc = styled.textarea`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    font-size: max(0.8vw, 11px);
    border-radius: 3px;
    padding: 10px;
    background: transparent;
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: max(0.75vw, 5px) max(1.5vw, 10px);
    font-size: max(0.8vw, 11px);
    font-weight: 500;
    cursor: pointer;
    background: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
    font-size: max(1vw, 13px);
`;

const UpdateVideo = ({ urlType }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const { currentVideo } = useSelector((state) => state.video);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentVideo) {
      setInputs({
        title: currentVideo.title,
        description: currentVideo.description,
        videoUrl: currentVideo.videoUrl,
        imgUrl: currentVideo.imgUrl,
      });
      setTags(currentVideo.tags);
    }
  }, [currentVideo]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => ({ ...prev, [urlType]: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl")
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl")
  }, [img]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!inputs.title) {
      setError("Please provide a title.");
      return;
    }

    if (!inputs.description) {
      setError("Please provide a description.");
      return;
    }

    try {
      const res = await apiRequest.put(`/videos/${currentVideo._id}`, { ...inputs, tags });
      res.status === 200 && navigate(`/video/${res.data._id}`);

    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => navigate(`/video/${currentVideo._id}`)}>X</Close>
        <Title>Edit video</Title>
        <Label>Video:</Label>
        {
          videoPerc > 0
            ?
            ("Uploading:" + videoPerc + "%")
            :
            (<Input type="file" accept="videos/*" onChange={(e) => setVideo(e.target.files[0])} />)

        }
        <Input type="text" placeholder="Title" name="title" defaultValue={currentVideo?.title} onChange={handleChange} required />
        <Desc placeholder="Description" rows={8} name="description" defaultValue={currentVideo?.description} onChange={handleChange}></Desc>
        <Input type="text" placeholder="Separate the tags with commas." defaultValue={currentVideo?.tags} onChange={handleTags} />
        <Label>Image:</Label>
        {
          imgPerc > 0
            ?
            ("Uploading:" + imgPerc + "%")
            :
            (<Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />)
        }
        {error && <span className="error-message">{error}</span>}
        <Button onClick={handleUpdate}>Update</Button>
      </Wrapper>
    </Container>
  )
}

export default UpdateVideo

