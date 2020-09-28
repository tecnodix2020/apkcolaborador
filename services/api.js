import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendsecretaria.herokuapp.com/',
});

export default api;