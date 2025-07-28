import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://local-food-server-iota.vercel.app`
})

const simpleAxios = () => {
    return axiosInstance;
};

export default simpleAxios;