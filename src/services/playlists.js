import axiosInstance from './axiosInstance';

const hot8Playlists = async () => {
  const resp = await axiosInstance.get('/top/playlist?limit=8&order=hot');
  return resp.data.playlists;
};

/**
 * 根据歌单id获取歌单详情（排行榜也是一种歌单）
 * @param {} id
 * @returns
 */
const getPlaylistById = async (id) => {
  const resp = await axiosInstance.get(`playlist/detail?id=${id}`);
  return resp.data;
};

export default { hot8Playlists, getPlaylistById };
