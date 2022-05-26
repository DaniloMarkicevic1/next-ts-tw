import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return req;
});

axiosInstance.interceptors.response.use((res) => {
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
    }
    if (res.data.message) {
        localStorage.removeItem('token');
    }
    return res;
});

export default axiosInstance;
