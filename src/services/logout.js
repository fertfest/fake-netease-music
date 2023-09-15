import axiosInstance from './axiosInstance';

const baseUrl = '/logout';

const logout = async () => {
  try {
    const resp = await axiosInstance.get(baseUrl);
    console.log(resp);
  } catch (e) {
    console.error(e);
  }
};

export default {
  logout,
};
