import { createSlice } from '@reduxjs/toolkit';

/**
 * 与底部播放条相关的状态
 */
const playerSlice = createSlice({
  name: 'playerVisible',
  initialState: {
    playerVisible: false,
    playerLock: false,

    // 正在播放的歌曲ID
    songId: '',
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
    setSongId(state, action) {
      return { ...state, songId: action.payload };
    },
  },
});

export const {
  hidePlayer,
  showPlayer,
  togglePlayer,
  lockPlayer,
  unlockPlayer,
  setSongId,
} = playerSlice.actions;

// export const showPlayer = () => (dispatch) => {
//   console.log(dispatch);
//   dispatch(showPlayerReducer());
// };

// export const initAnecdotes = () => {
//   return async dispatch => {
//     const data = await anecdoteService.getAll();
//     dispatch(setAnecdotes(data))
//   }
// }

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
