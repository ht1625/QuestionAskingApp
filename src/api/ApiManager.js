import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://192.168.1.69:8082/api/v1',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;