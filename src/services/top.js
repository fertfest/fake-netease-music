import axiosInstance from './axiosInstance';

const baseUrl = '/top';

// 首页右下角入驻歌手数据
const getResidentSingers = async () => {
  const resp = await axiosInstance.get(`${baseUrl}/artists?offset=0&limit=5`);
  const { artists } = resp.data;
  const promises = artists.map((artist) => axiosInstance.get(`/artist/detail?id=${artist.id}`));

  let res;
  return Promise
    .all(promises)
    .then((details) => {
      res = details.map((detail) => ({
        avatar: detail.data.data.artist.avatar,
        id: detail.data.data.artist.id,
        briefDesc: detail.data.data.artist.briefDesc,
        name: detail.data.data.artist.name,
      }));
      return res;
    });
};

export default {
  getResidentSingers,
};
