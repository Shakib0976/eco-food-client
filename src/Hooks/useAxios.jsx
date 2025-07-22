import axios from 'axios';
import { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
});

const useAxios = () => {
    const { user, logOut } =use(AuthContext);
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/errorPage2');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxios;
