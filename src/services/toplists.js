import axiosInstance from './axiosInstance';

/**
 * 获取所有榜单，如飙升榜、新歌榜
 */
const getAllToplists = async () => {
  const resp = await axiosInstance.get('/toplist');
  return resp.data.list;
};

/**
 * 获取discover 热榜区域需要的飙升榜、新歌榜、原创榜
 */
const discoverToplists = async () => {
  const all = await getAllToplists();
  return all.filter((item) => item.name === '飙升榜' || item.name === '新歌榜' || item.name === '原创榜');
};

export default { discoverToplists };
