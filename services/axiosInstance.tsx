import axios from 'axios';
import { getCookie, removeCookies, setCookies } from 'cookies-next';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((req: any) => {
    const token = getCookie('token');
    console.log(token);
    if (token) {
        req.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return req;
});

axiosInstance.interceptors.response.use((res) => {
    console.log(res);
    if (res.data.token) {
        setCookies('token', res.data.token);
    }
    if (res.data.message) {
        removeCookies('token');
    }
    return res;
});

export default axiosInstance;
