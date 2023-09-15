import axiosInstance from './axiosInstance';

const getNewAlbums = async () => {
  const resp = await axiosInstance.get('/top/album?limit=10');
  return resp.data.weekData;
};

export default { getNewAlbums };
