import { createSlice } from '@reduxjs/toolkit';

/**
 * 与登录相关的状态
 */
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginVisible: false,
    logged: false,
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
