import axios from 'axios';

const api = axios.create({
    baseURL: 'https://hungrydogback.herokuapp.com/',
})

export default api;