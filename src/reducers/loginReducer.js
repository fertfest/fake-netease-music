import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';

const logged = loginService.userCookieExists();

/**
 * 与登录相关的状态
 */
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginVisible: false,
    logged,
  },
  reducers: {
    openLoginBox(state) {
      return { ...state, loginVisible: true };
    },
    closeLoginBox(state) {
      return { ...state, loginVisible: false };
    },
    setLogged(state) {
      return { ...state, logged: true };
    },
    setUnlogged(state) {
      return { ...state, logged: false };
    },
  },
});

export const {
  openLoginBox,
  closeLoginBox,
  setLogged,
  setUnlogged,
} = loginSlice.actions;

export default loginSlice.reducer;
