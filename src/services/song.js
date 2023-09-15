import axiosInstance from './axiosInstance';

const baseUrl = '/song';

const getSongUrl = async (id) => {
  try {
    const resp = await axiosInstance.get(`${baseUrl}/url?id=${id}`);
    const { url, time } = resp.data.data[0];
    return { url, time };
  } catch (e) {
    console.error(e);
  }

  return null;
};

export default {
  getSongUrl,
};
