import axios from 'axios';

const baseUrl = process.env.VUE_APP_URL_API;
axios.defaults.baseURL = baseUrl + '/api/v1'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')