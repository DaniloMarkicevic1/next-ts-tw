import axiosInstance from './axiosInstance';

export const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    const data = await response.data;
    return data;
};
