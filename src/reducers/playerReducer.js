import { createSlice } from '@reduxjs/toolkit';
import songService from '../services/song';

/**
 * 与底部播放条相关的状态
 */
const playerSlice = createSlice({
  name: 'playerVisible',
  initialState: {
    playerVisible: false,
    playerLock: false,
    playing: false,
    // 正在播放的歌曲ID
    songId: '',
    songUrl: '',
    timeoutId: null,
    notificationVisible: false,
  },
  reducers: {
    hidePlayer(state) {
      if (state.playerLock) {
        return state;
      }
      return { ...state, playerVisible: false };
    },
    showPlayer(state) {
      if (state.playerLock) {
        return state;
      }
      clearTimeout(state.timeoutId);
      return { ...state, playerVisible: true };
    },
    togglePlayer(state) {
      if (state.playerLock) {
        return state;
      }
      return { ...state, playerVisible: false };
    },
    lockPlayer(state) {
      return { ...state, playerLock: true };
    },
    unlockPlayer(state) {
      return { ...state, playerLock: false };
    },
    toggleLockPlayer(state) {
      return { ...state, playerLock: !state.playerLock };
    },
    setSongId(state, action) {
      return { ...state, songId: action.payload };
    },
    togglePlaying(state) {
      return { ...state, playing: !state.playing };
    },
    setPlaying(state) {
      return { ...state, playing: true };
    },
    setSongUrl(state, action) {
      return { ...state, songUrl: action.payload };
    },
    setTimeoutId(state, action) {
      return { ...state, timeoutId: action.payload };
    },
    showNotification(state) {
      return { ...state, notificationVisible: true };
    },
    hideNotification(state) {
      return { ...state, notificationVisible: false };
    },
  },
});

export const {
  hidePlayer,
  showPlayer,
  togglePlayer,
  lockPlayer,
  unlockPlayer,
  toggleLockPlayer,
  setSongId,
  togglePlaying,
  setPlaying,
  setSongUrl,
  setTimeoutId,
  showNotification,
  hideNotification,
} = playerSlice.actions;

/**
 * 传入歌曲id会直接在播放器开始播放歌曲，并且应该弹出播放器,然后设置0.5秒的延迟让播放器自动隐藏。
 * @param {歌曲id} id
 * @returns null
 */
export const playOneSong = (id) => (
  (dispatch) => {
    dispatch(showPlayer());
    dispatch(setSongId(id));
    dispatch(setPlaying());
    dispatch(setTimeoutId(
      setTimeout(() => {
        dispatch(hidePlayer());
      }, 1500),
    ));
    dispatch(showNotification());
    setTimeout(() => {
      dispatch(hideNotification());
    }, 1500);
  }
);

// export const createAnecdote = data => {
//   return async dispatch => {
//     const resp = await anecdoteService.createOne(data)
//     dispatch(appendOne(resp))
//   }
// }

// export const vote = id => {
//   return async dispatch => {
//     await anecdoteService.voteFor(id)
//     dispatch(voteFor(id))
//   }
// }

export default playerSlice.reducer;
