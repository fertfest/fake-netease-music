import axiosInstance from './axiosInstance';

const baseUrl = '/user';

/**
 * 获取用户头像地址
 * @returns url
 */
const getAvatarUrl = async () => {
  try {
    const resp = await axiosInstance.get(`${baseUrl}/account`);
    return resp.data.profile.avatarUrl;
  } catch (e) {
    console.error(e);
  }
  return null;
};

/**
 * 获取ContentRight组件显示的用户信息
 */
const contentRightInfo = async () => {
  try {
    const resp = await axiosInstance.get(`${baseUrl}/level`);
    console.log(resp, resp1);
  } catch (e) {
  }
};

contentRightInfo();

export default {
  getAvatarUrl,
};
