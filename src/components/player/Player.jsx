import { useDispatch, useSelector } from 'react-redux';
import { FaRegPlayCircle, FaRandom, FaRegPauseCircle } from 'react-icons/fa';
import { ImPrevious, ImNext, ImLoop } from 'react-icons/im';
import { TbPictureInPicture } from 'react-icons/tb';
import { HiVolumeUp } from 'react-icons/hi';
import { AiOutlineFolderAdd, AiOutlineShareAlt } from 'react-icons/ai';
import { Bs1Circle, BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import { RiPlayList2Fill } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { showPlayer, hidePlayer, togglePlaying as togglePlayingActionProducer, toggleLockPlayer } from '../../reducers/playerReducer';
import format from '../../utils/format';
import defaultCoverPic from '../../assets/default_album.jpg';

import songService from '../../services/song';

const Player = () => {
  // 歌曲id
  const songId = useSelector((state) => state.player.songId);
  // 播放器是否可见
  const visible = useSelector((state) => state.player.playerVisible);
  // 小通知框是否可见
  const notificationVisible = useSelector((state) => state.player.notificationVisible);
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
  // 右上角小锁出于锁定状态？
  const [locked, setLocked] = useState(false);
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
    height: visible ? '47px' : '3px',
    // height: '47px',
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
          <ReactPlayer
            ref={playerRef}
            url={songUrl}
            playing={playing}
            width="0"
            height="0"
            onProgress={handleProgress}
            volume={volume}
          />
          <ImNext title="下一首" size="20px" className="mt-[12px] mx-[8px] hover:text-[#fafafa] text-[#535353] hover:cursor-pointer" />
          {/** 小图片 */}
          <div className="w-[34px] h-[34px] border-solid border-[1px] border-black ml-[25px] mt-[6px] rounded-[4px]">
            <img src={picUrl ? picUrl : defaultCoverPic} alt="封面" />
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
          <ImLoop size="20px" className="text-[#888888] mt-[11px] ml-[7px]" />
          {/* <FaRandom />
        <Bs1Circle /> */}

          {/** 播放列表按钮 */}
          <div className="w-[50px] h-full flex">
            <RiPlayList2Fill size="20px" className="text-[#888888] mt-[11px] ml-[7px]" />
            <div className="w-[36px] h-[14px] bg-[#1f1f1f] mt-[14px] border-solid border-black border-[1px] rounded-r-[18px] text-center">
              <p className="text-[12px] text-[#983737] leading-[14px]">11</p>
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
