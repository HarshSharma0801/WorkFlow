import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://work-flow-pearl.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
