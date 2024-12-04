import axios from "axios";


const axiosInstance=axios.create({
    baseURL:'https://chat-app-backend-lsx0.onrender.com',
    withCredentials:true 
})

export default axiosInstance