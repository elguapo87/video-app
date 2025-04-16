import axios from "axios";

export const url = "http://localhost:8800";

const apiRequest = axios.create({
    baseURL: `${url}/api`,
    withCredentials: true
});

export default apiRequest;