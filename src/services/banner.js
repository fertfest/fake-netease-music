import axiosInstance from './axiosInstance';

const baseUrl = '/banner';

const getBanners = async () => {
  let resp = null;
  try {
    resp = await axiosInstance.get(baseUrl);
  } catch (e) {
    console.error(e);
  }
  return resp.data.banners;
};

export default { getBanners };
