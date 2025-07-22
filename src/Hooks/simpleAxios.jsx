import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:5000`
})

const simpleAxios = () => {
    return axiosInstance;
};

export default simpleAxios;