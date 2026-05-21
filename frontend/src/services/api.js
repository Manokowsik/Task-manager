import axios from "axios";

const API = axios.create ({
    baseURL: "https://task-manager-api-vbca.onrender.com"
})

export default API;