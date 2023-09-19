import axiosInstance from './axiosInstance';

const baseUrl = '/lyric';

/**
 * 通过歌曲id获得歌曲的歌词
 * @param {歌曲id} id
 */
const getLyric = async (id) => {
  try {
    const resp = await axiosInstance.get(`${baseUrl}?id=${id}`);
    const lyric = resp.data.lrc.lyric.split('\n');
    return lyric.map((line) => line.slice(line.indexOf(']') + 1));
  } catch (e) {
    console.error(e);
  }

  return null;
};

export default {
  getLyric,
};
