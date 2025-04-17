// import axios from "axios";

// export const url = "http://localhost:8800";

// const apiRequest = axios.create({
//     baseURL: `${url}/api`,
//     withCredentials: true
// });

// export default apiRequest;




import axios from "axios";

export const url = "https://video-app-server-bby4.onrender.com";

const apiRequest = axios.create({
    baseURL: `${url}/api`,
    withCredentials: true
});

export default apiRequest;