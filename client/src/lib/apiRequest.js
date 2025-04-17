import axios from "axios";

export const url = "https://video-app-server-4px5.onrender.com";

const apiRequest = axios.create({
    baseURL: `${url}/api`,
    withCredentials: true
});

export default apiRequest;