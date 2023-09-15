import axiosInstance from './axiosInstance';

const baseUrl = '/login';

const getQRKey = async () => {
  try {
    const timestamp = new Date().getTime();
    const resp = await axiosInstance.get(`${baseUrl}/qr/key?timestamp=${timestamp}`);
    const key = resp.data.data.unikey;
    return key;
  } catch (e) {
    console.error(e);
  }
  return null;
};

const getQRImg = async () => {
  try {
    const key = await getQRKey();
    const timestamp = new Date().getTime();
    const resp = await axiosInstance.get(`${baseUrl}/qr/create?key=${key}&qrimg=1&timestamp=${timestamp}`);
    return { key, qrimg: resp.data.data.qrimg };
  } catch (e) {
    console.error(e);
  }
  return null;
};

const getQRStatus = async (key) => {
  try {
    const timestamp = new Date().getTime();
    const resp = await axiosInstance.get(`${baseUrl}/qr/check?key=${key}&timestamp=${timestamp}`);
    return resp.data;
  } catch (e) {
    console.error(e);
  }
  return null;
};

/**
 * 将cookies转成键值对数组的形式，如：
 * [
 * {key: 'NMTID', value: '00OLhaGf9VjfwUK10KKq6o4LLkh5nMAAAGKlubJfw'},
 * {key: '__csrf', value: '029317986457d26a0e1ed85bf54697d3'}
 * ]
 * }
 */
const cookiesToKeyValuePairs = () => {
  const cookies = document.cookie.split(';').map((cookie) => {
    const [key, value] = cookie.trim().split('=');
    return { key, value };
  });
  return cookies;
};

const userCookieExists = () => {
  try {
    const cookies = cookiesToKeyValuePairs();
    const loginCookie = cookies.find((pair) => pair.key === 'NMTID');
    if (loginCookie) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
  }
  return null;
};

export default {
  getQRKey,
  getQRImg,
  getQRStatus,
  userCookieExists,
};
