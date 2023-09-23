import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import {
  FaRegPlayCircle,
  FaRandom,
  FaRegPauseCircle,
} from 'react-icons/fa';
import { ImPrevious, ImNext, ImLoop } from 'react-icons/im';
import { TbPictureInPicture } from 'react-icons/tb';
import { HiVolumeUp } from 'react-icons/hi';
import { AiOutlineFolderAdd, AiOutlineShareAlt, AiOutlineDownload } from 'react-icons/ai';
import {
  Bs1Circle,
  BsFillLockFill,
  BsFillUnlockFill,
  BsTrash,
} from 'react-icons/bs';
import { RiPlayList2Fill } from 'react-icons/ri';
import { GiPlayButton } from 'react-icons/gi';
import {
  showPlayer,
  hidePlayer,
  togglePlaying as togglePlayingActionProducer,
  toggleLockPlayer,
  playOneSong,
  deleteOnePlaylist,
  clearPlaylist,
  showPlaylist,
  hidePlaylist,
  setTimeoutId,
  setPlaying,
  setSongId,
} from '../../reducers/playerReducer';
import format from '../../utils/format';
import songService from '../../services/song';
import lyricService from '../../services/lyric';
import FormatAuthors from '../common/FormatAuthors';
import defaultCoverPic from '../../assets/default_album.jpg';

const Player = () => {
  // 播放模式对应名称
  const modeTitles = ['列表循环', '随机播放', '单曲循环'];
  // 播放列表数据
  const playlistData = useSelector((state) => state.player.playlist);
  // 歌曲id
  const songId = useSelector((state) => state.player.songId);
  // 播放器是否可见
  const visible = useSelector((state) => state.player.playerVisible);
  // 小通知框是否可见
  const notificationVisible = useSelector((state) => state.player.notificationVisible);
  // 播放列表是否可见
  const playlistVisible = useSelector((state) => state.player.playlistVisible);
  // 切换播放模式后的小提示框是否可见
  const [playingModeVisible, setPlayingModeVisible] = useState(false);
  // 小提示框计时器ID
  let playingModeTimeoutId;
  const playerRef = useRef(null);

  // 歌曲文件地址
  const [songUrl, setSongUrl] = useState('');
  // 小封面地址
  const [picUrl, setPicUrl] = useState('');
  // 正在播放的歌名
  const [playingName, setPlayingName] = useState('');
  // 歌手
  const [singers, setSingers] = useState([]);

  // 正在播放？
  const playing = useSelector((state) => state.player.playing);
  // 已经播放了多少
  const [played, setPlayed] = useState(0);
  // 歌曲长度:秒
  const [seconds, setSeconds] = useState(0);
  // 是否在寻道
  const [seeking, setSeeking] = useState(false);
  // 音量
  const [volume, setVolume] = useState(0.5);
  // 播放模式 0-列表循环 1-随机播放 2-单曲循环
  const [playingMode, setPlayingMode] = useState(0);
  // 右上角小锁出于锁定状态？
  const [locked, setLocked] = useState(false);
  // 歌词
  const [lyric, setLyric] = useState([]);
  const dispatch = useDispatch();

  const togglePlaying = () => {
    dispatch(togglePlayingActionProducer());
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const style = {
    // display: visible ? '' : 'none',
    // height: visible ? '47px' : '3px',
    height: '47px',
  };

  const notificationStyle = {
    display: notificationVisible ? '' : 'none',
  };

  useEffect(() => {
    if (songId) {
      songService
        .getSongUrl(songId)
        .then(({ url, time }) => {
          setSongUrl(url);
          setSeconds(Math.floor(time / 1000));
        })
        .catch((e) => {
          console.error(e);
        });
    }

    if (songId) {
      songService
        .getPlayingInfo(songId)
        .then(({ name, picUrl, singers }) => {
          setPicUrl(picUrl);
          setSingers(singers);
          setPlayingName(name);
        })
        .catch((e) => {
          console.error(e);
        });
    }

    if (songId) {
      lyricService
        .getLyric(songId)
        .then((resp) => {
          setLyric(resp);
        });
    }
  }, [songId]);

  return (
    <div
      className="w-full fixed bottom-0"
      onMouseEnter={() => { dispatch(showPlayer()); }}
      onMouseLeave={() => { dispatch(hidePlayer()); }}
    >
      {/** 用于显示播放器 */}
      <div
        className="opacity-0 w-full h-[10px] peer"
      />

      <div
        className="
      w-full
      relative
    bg-[#2c2b2b]
      border-solid border-t-black border-t-[1px]
      delay-[0.125s] duration-1000
      h-[47px]
      "
        style={style}
      >
        <div className="w-[980px] mx-auto h-full flex relative">
          <ImPrevious title="上一首" size="20px" className="mt-[12px] mx-[8px] hover:text-[#fafafa] text-[#535353] hover:cursor-pointer" />
          {
            !playing
              ? <FaRegPlayCircle title="播放" className="mt-[5px] hover:text-[#fafafa] text-[#535353] hover:cursor-pointer" size="33px" onClick={togglePlaying} />
              : (
                <FaRegPauseCircle
                  title="暂停"
                  className="mt-[5px] hover:text-[#fafafa] text-[#535353] hover:cursor-pointer"
                  size="33px"
                  onClick={togglePlaying}
                />
              )
          }
          {/** 播放器组件 */}
          <ReactPlayer
            ref={playerRef}
            url={songUrl}
            playing={playing}
            width="0"
            height="0"
            onProgress={handleProgress}
            volume={volume}
            loop={playingMode === 2}
            onEnded={() => {
              try {
                if (!playlistData) {
                  setPlaying(false);
                } else if (playlistData.length === 1) {
                  setSeconds(0);
                } else if (playingMode === 1) {
                  const idx = Math.floor(Math.random() * playlistData.length);
                  dispatch(setSongId(playlistData[idx].id));
                } else if (playingMode === 0) {
                  const idx = playlistData.findIndex((song) => song.id === songId);
                  dispatch(setSongId(playlistData[idx + 1].id));
                } else {
                  throw new Error('单曲循环模式下触发onEnded事件');
                }
              } catch (e) {
                console.error(e);
              }
            }}
          />
          <ImNext title="下一首" size="20px" className="mt-[12px] mx-[8px] hover:text-[#fafafa] text-[#535353] hover:cursor-pointer" />
          {/** 小图片 */}
          <div className="w-[34px] h-[34px] border-solid border-[1px] border-black ml-[25px] mt-[6px] rounded-[4px]">
            <img src={picUrl || defaultCoverPic} alt="封面" />
          </div>
          <div className="h-full w-[580px] flex-col">
            <div className="h-1/2 w-full">
              <span className="ml-[10px] text-[#d2d2d2] text-[12px] hover:underline">
                <Link to={`/song?id=${songId}`}>
                  {playingName}
                </Link>
              </span>
              {
                singers.map((singer, idx) => {
                  if (idx !== 0) {
                    return (
                      <span className="text-[#7a7a7a] text-[12px] text-opacity-90 hover:underline ml-0" key={singer.id}>
                        <Link to={`/artist?id=${singer.id}`}>{`/${singer.name}`}</Link>
                      </span>
                    );
                  }
                  return (
                    <span className="ml-[13px] text-[#7a7a7a] text-[12px] text-opacity-90 hover:underline" key={singer.id}>
                      <Link to={`/artist?id=${singer.id}`}>{singer.name}</Link>
                    </span>
                  );
                })
              }
            </div>
            <div className="h-1/2 w-full flex space justify-between text-[12px]">
              <input
                type="range"
                className="w-[466px] ml-[10px] accent-[#c70c0c] "
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
              />
              <span className="text-white">{format(Math.floor(seconds * played))}</span>
              <span className="text-[#686868]">/</span>
              <span className="text-[#686868]">{format(seconds)}</span>
            </div>
          </div>
          <TbPictureInPicture size="20px" className="text-[#888888] mt-[11px] ml-[30px]" />
          <AiOutlineFolderAdd size="20px" className="text-[#888888] mt-[11px] ml-[7px]" />
          <AiOutlineShareAlt size="20px" className="text-[#888888] mt-[11px] ml-[7px]" />

          <div className="w-[20px] h-[20px] mt-[11px] ml-[30px] relative">
            {/** 音量按键 */}
            <HiVolumeUp
              size="20px"
              className="text-[#888888]
              hover:cursor-pointer
              hover:text-[#d3d3d3]
              peer
              "
            />
            {/** 音量滑片 */}
            <div
              className="absolute w-[32px] h-[114px]  bottom-[30px] right-[-6px] bg-[#292929] border-solid border-[1px] border-[#343434] invisible peer-hover:visible hover:visible duration-500"
            >
              <input
                type="range"
                className="rotate-[270deg] w-[92px] h-[4px] bg-black accent-[#c70c0c] absolute top-[55px] right-[-32px]"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
          {/** 播放器模式切换按钮和通知框 */}
          <div className="relative w-[30px] h-[30px]">
            <div className={`absolute z-10 ${playingModeVisible ? 'visible' : 'invisible'}
            w-[75px] h-[32px]
            bg-[#191919] opacity-90
            -top-9 -left-5
            border-black border-solid border-[1px]
            rounded-sm
            text-white text-[14px] text-center
            pt-[6px]`}
            >
              <span>{modeTitles[playingMode]}</span>
            </div>
            <div className="text-[#888888]">
              <button
                type="button"
                className="w-full h-full"
                onClick={() => {
                  setPlayingMode(playingMode === 2 ? 0 : playingMode + 1);
                  setPlayingModeVisible(true);
                  clearTimeout(playingModeTimeoutId);
                  playingModeTimeoutId = setTimeout(() => {
                    setPlayingModeVisible(false);
                  }, 1500);
                }}
                title={modeTitles[playingMode === 2 ? 0 : playingMode + 1]}
              >
                <ImLoop size="20px" className={`mt-[11px] ml-[7px] absolute top-0 left-0 ${playingMode === 2 ? 'visible' : 'invisible'}`} />
                <FaRandom size="20px" className={`mt-[11px] ml-[7px] absolute top-0 left-0  ${playingMode === 0 ? 'visible' : 'invisible'}`} />
                <Bs1Circle size="20px" className={`mt-[11px] ml-[7px] absolute top-0 left-0  ${playingMode === 1 ? 'visible' : 'invisible'}`} />
              </button>
            </div>
          </div>

          {/** 播放列表按钮 */}
          <div className="w-[50px] h-full flex">
            <button
              type="button"
              title="播放列表"
              className="ml-[7px] mb-[4px]"
              onClick={() => { dispatch(showPlaylist()); }}
            >
              <RiPlayList2Fill size="20px" className="text-[#888888]" />
            </button>
            <div className="w-[36px] h-[14px] bg-[#1f1f1f] mt-[14px] border-solid border-black border-[1px] rounded-r-[18px] text-center">
              <p className="text-[12px] text-[#983737] leading-[14px]">{playlistData.length}</p>
            </div>
          </div>

          {/** 在页面中直接点击播放按钮时出现的小通知框 */}
          <div
            className="
            absolute top-[-50px] bg-[#313131]
            right-[-10px] w-[152px] h-[40px]
            border-solid border-[#000000] border-[1px]
            rounded-md text-center"
            style={notificationStyle}
          >
            <div className="absolute bottom-[-10px] right-[20px]  border-t-[10px] border-l-[10px] border-r-[10px] border-transparent border-t-[#313131]">

            </div>
            <span className="text-white text-[14px] leading-[40px]">
              已开始播放
            </span>
          </div>

          {/** 播放列表框 */}
          <div
            className={`
            w-[986px] h-[301px]
            absolute
            bottom-[47px] left-[10px]
            overflow-hidden
            rounded-tl-md
            rounded-tr-md
            flex-col
            ${playlistVisible ? 'visible' : 'invisible'}
            `}
          >
            {/** 播放列表Header */}
            <div className="w-full h-[41px] bg-[#1f1f1f] flex">
              <h3 className="text-[14px] text-[#e2e2e2] leading-[41px] ml-[25px] w-[200px]">
                播放列表(
                {playlistData.length}
                )
              </h3>
              <div className="w-[80px] h-[16px] ml-[180px] mt-[10px] text-[#9b9b9b] hover:text-[#e2e2e2] hover:underline flex border-solid border-r-[1px] border-black">
                <button type="button" className="w-[90px] absolute flex">
                  <AiOutlineFolderAdd size="20px" />
                  <p className="text-[12px] hover:underline pt-[2px] pl-[5px]">
                    收藏全部
                  </p>
                </button>
              </div>
              <div className="w-[100px] h-[16px] mt-[10px] text-[#9b9b9b] hover:text-[#e2e2e2] hover:underline flex border-solid border-l-[1px] border-[#2c2c2c] pl-[5px]">
                <button type="button" className="w-[90px] absolute flex" onClick={() => { dispatch(clearPlaylist()); }}>
                  <BsTrash size="16px" className="mt-[3px]" />
                  <p className="text-[12px] hover:underline pt-[2px] pl-[5px]">
                    清除
                  </p>
                </button>
              </div>
              <div className="w-[346px] h-full text-center">
                <h3 className="leading-[41px] text-[#ffffff]">
                  {playingName}
                </h3>
              </div>
              <div className="w-[15px] text-[#666666] text-[23px] hover:text-[#7c7c7c] ml-[20px] pt-[2px]">
                <button type="button" onClick={() => { dispatch(hidePlaylist()); }}>
                  ×
                </button>
              </div>
            </div>

            {/** 播放列表内容 */}
            <div className="w-full h-[260px] flex">
              <ul className="w-[559px] h-full overflow-scroll player_scroll bg-[#202224]">
                {
                  playlistData.map((song) => (
                    <li
                      key={song.id}
                      className={`h-[28px] w-full flex relative group hover:bg-[#0f0f0f] ${song.id === songId ? 'bg-[#0f0f0f]' : ''}`}
                    >
                      <input type="button" className="absolute w-full h-full hover:cursor-pointer" onClick={() => { dispatch(playOneSong(song)); }} />
                      <div className="w-[24px] pt-[5px]">
                        {
                          songId === song.id
                            ? <GiPlayButton className="text-[#b80a0a] ml-[5px] mt-[1px]" />
                            : ''
                        }
                      </div>
                      <p className="text-[12px] text-[#cccccc] whitespace-nowrap overflow-hidden text-ellipsis w-[266px] h-full ml-[3px] leading-[28px]">
                        {song.name}
                      </p>
                      <div className="w-[88px] h-full text-[#9b9b9b] ml-[10px] gap-[5px] pt-[4px] invisible group-hover:visible">
                        <button type="button" title="收藏" className="hover:text-[#e2e2e2] relative z-1">
                          <AiOutlineFolderAdd />
                        </button>
                        <button type="button" title="转发" className="hover:text-[#e2e2e2] relative z-1">
                          <AiOutlineShareAlt />
                        </button>
                        <button type="button" title="下载" className="hover:text-[#e2e2e2] relative z-1">
                          <AiOutlineDownload />
                        </button>
                        <button type="button" title="删除" className="hover:text-[#e2e2e2] relative z-1" onClick={() => { dispatch(deleteOnePlaylist(song.id)); }}>
                          <BsTrash />
                        </button>
                      </div>
                      <div className="w-[80px] h-full">
                        <p className="text-[12px] text-[#898989] whitespace-nowrap overflow-hidden text-ellipsis leading-[28px]">
                          <FormatAuthors ar={song.ar} />
                        </p>
                      </div>
                    </li>
                  ))
                }
              </ul>

              {/** 歌词 */}
              <div className="w-[430px] h-full bg-[#1a1a1a] overflow-scroll player_scroll">
                <div
                  className="w-[380px] h-[220px] mx-auto ml-[20px]  text-center "
                >
                  {
                    // eslint-disable-next-line react/no-array-index-key
                    lyric.map((line, index) => <p className="text-[12px] text-white my-[10px]" key={index}>{line}</p>)
                  }
                </div>
              </div>
            </div>

          </div>
        </div>

        {/** 播放器最右侧的小锁 */}
        <div
          className="w-[50px] h-[14px] absolute top-[-14px] right-[28px] flex"
        >
          <div className="border-transparent border-t-[14px] border-b-[14px] w-0 h-0 border-r-[14px] border-r-[#2c2b2b]">

          </div>
          <div className="w-[22px] h-full bg-[#2c2b2b] relative pl-[5px]">
            <button
              type="button"
              onClick={() => { setLocked(!locked); dispatch(toggleLockPlayer()); }}
              className="block"
            >
              {
                locked
                  ? <BsFillLockFill className="text-[#828282]" size="12px" />
                  : <BsFillUnlockFill className="text-[#828282]" size="12px" />
              }
            </button>
          </div>
          <div className="border-transparent border-t-[14px] border-b-[14px] w-0 h-0 border-l-[14px] border-l-[#2c2b2b]">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
