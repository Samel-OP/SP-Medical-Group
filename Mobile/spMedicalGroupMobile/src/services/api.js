import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.4.18:80/api',
});

export default api;