import axios from 'axios'

export default axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/api',
    headers: {
        "Access-Control-Allow-Origin": "localhost:3000"
    }
});