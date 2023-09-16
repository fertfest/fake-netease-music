import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  params: {
    timestamp: (new Date().getTime()),
  },
});

export default axiosInstance;
