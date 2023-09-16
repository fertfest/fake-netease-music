import axiosInstance from './axiosInstance';

const getHotDJs = async () => {
  const { data } = await axiosInstance.get('/dj/toplist/newcomer?limit=5');
  return data.data.list;
};

export default {
  getHotDJs,
};
