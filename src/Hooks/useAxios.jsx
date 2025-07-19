import axios from 'axios';

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials: true, // only if using cookies
});

const useAxios = () => {
    return axiosSecure;
};

export default useAxios;
