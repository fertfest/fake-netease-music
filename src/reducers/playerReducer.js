import { createSlice } from '@reduxjs/toolkit';
import songService from '../services/song';

/**
 * 更新localStorage中存储的播放列表数据
 * 注意歌曲的格式 [{id, name, ar: [{id, name}] }]，无关信息不应该存储
 */
const updatePlaylistInLocalStorage = (songs) => {
  localStorage.setItem('playlist', JSON.stringify(songs));
};

const getPlaylistInLocalStorage = () => JSON.parse(localStorage.getItem('playlist'));

const initPlaylist = getPlaylistInLocalStorage() || [];

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
    playlist: initPlaylist,
    playlistVisible: false,
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
    /**
     * 添加歌曲到播放列表，同时将播放列表更新到localStorage，action附带songs参数
     * songs：[{id, name, ar: [{id, name}] }]
     */
    addToPlayerPlaylist(state, action) {
      // 更新状态playlist
      try {
        if (!action.payload) {
          throw new Error('传入payload不应该为空！');
        }

        const oldPlaylist = state.playlist;
        // 现存播放列表中的所有歌曲id
        const ids = oldPlaylist.map((song) => song.id);

        const songs = action.payload;
        const newPlaylist = songs
          .filter((song) => !ids.includes(song.id))
          .map((song) => ({
            name: song.name,
            id: song.id,
            ar: song.ar.map((oneAr) => ({ name: oneAr.name, id: oneAr.id })),
          }));
        const resPlaylist = oldPlaylist.concat(newPlaylist);

        updatePlaylistInLocalStorage(resPlaylist);

        return {
          ...state,
          playlist: resPlaylist,
        };
      } catch (e) {
        console.error(e);
      }

      return [];
    },
    /**
     * 从播放列表中删除一首歌曲
     * payload为歌曲id
     */
    deleteOnePlaylist(state, action) {
      const newPlaylist = state.playlist.filter((oneSong) => oneSong.id !== action.payload);
      updatePlaylistInLocalStorage(newPlaylist);
      // 如果删除的是正在播放的歌曲
      if (action.payload === state.songId && state.playlist.length !== 1) {
        const idx = state.playlist.findIndex((one) => one.id === action.payload);
        if (idx === -1) {
          console.error(new Error('在playlist中找不到对应歌曲id'));
        }

        const newIdx = idx >= newPlaylist.length ? 0 : idx;
        const newId = newPlaylist[newIdx].id;
        return { ...state, playlist: newPlaylist, songId: newId };
      }

      return { ...state, playlist: newPlaylist };
    },
    /**
     * 清空播放列表
     */

    clearPlaylist(state) {
      updatePlaylistInLocalStorage([]);
      return { ...state, playlist: [] };
    },

    showPlaylist(state) {
      return { ...state, playlistVisible: true, playerLock: true };
    },
    hidePlaylist(state) {
      return { ...state, playlistVisible: false, playerLock: false };
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
  addToPlayerPlaylist,
  deleteOnePlaylist,
  clearPlaylist,
  showPlaylist,
  hidePlaylist,
} = playerSlice.actions;

/**
 * 传入歌曲信息，应该包含歌曲id，歌曲名，歌曲作者
 * @param {歌曲id} id
 * @returns null
 */
export const playOneSong = (song) => (
  (dispatch) => {
    dispatch(showPlayer());
    dispatch(setSongId(song.id));
    dispatch(addToPlayerPlaylist([song]));
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

export default playerSlice.reducer;
