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

// 用于播放器显示小图片、歌名等
const getPlayingInfo = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/detail?ids=${id}`);
    const { picUrl } = data.songs[0].al;
    const { name, ar } = data.songs[0];
    const singers = ar;

    return { picUrl, name, singers };
  } catch (e) {
    console.error(e);
  }
};

export default {
  getSongUrl,
  getPlayingInfo,
};
