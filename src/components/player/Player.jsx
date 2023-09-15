import { useDispatch, useSelector } from 'react-redux';
import { FaRegPlayCircle, FaRandom, FaRegPauseCircle } from 'react-icons/fa';
import { ImPrevious, ImNext, ImLoop } from 'react-icons/im';
import { TbPictureInPicture } from 'react-icons/tb';
import { HiVolumeUp } from 'react-icons/hi';
import { AiOutlineFolderAdd, AiOutlineShareAlt } from 'react-icons/ai';
import { Bs1Circle } from 'react-icons/bs';
import { RiPlayList2Fill } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { showPlayer, hidePlayer } from '../../reducers/playerReducer';
import format from '../../utils/format';

import songService from '../../services/song';

const Player = () => {
  const visible = useSelector((state) => state.player.playerVisible);
  const songId = useSelector((state) => state.player.songId);
  const playerRef = useRef(null);

  const [songUrl, setSongUrl] = useState('');
  // 正在播放？
  const [playing, setPlaying] = useState(false);

  // 已经播放了多少
  const [played, setPlayed] = useState(0);

  // 歌曲长度:秒
  const [seconds, setSeconds] = useState(0);

  const [seeking, setSeeking] = useState(false);
  const dispatch = useDispatch();

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
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
  }, [songId]);

  const style = {
    height: visible ? '47px' : '3px',
  };

  return (
    <div
      className="
      w-full
    bg-[#2c2b2b]
      fixed bottom-0
      z-100
      border-solid border-t-black border-t-[1px]
      delay-[0.125s] duration-1000"
      onMouseEnter={() => { dispatch(showPlayer()); }}
      onMouseLeave={() => { dispatch(hidePlayer()); }}
      style={style}
    >
      <div className="w-[980px] mx-auto h-full flex">
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
        />
        <ImNext title="下一首" size="20px" className="mt-[12px] mx-[8px] hover:text-[#fafafa] text-[#535353] hover:cursor-pointer" />
        <div className="w-[34px] h-[34px] border-solid border-[1px] border-black ml-[25px] mt-[6px] rounded-[4px]" />
        <div className="h-full w-[580px] flex-col">
          <div className="h-1/2 w-full">
            <span className="ml-[10px] text-[#d2d2d2] text-[12px]">Cleam</span>
            <span className="ml-[13px] text-[#7a7a7a] text-[12px] text-opacity-90">Mister Lies</span>
          </div>
          <div className="h-1/2 w-full flex space justify-between text-[12px]">
            <input
              type="range"
              className="w-[466px] ml-[10px] accent-[#c70c0c]"
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
        <HiVolumeUp size="20px" className="text-[#888888] mt-[11px] ml-[30px]" />
        <ImLoop size="20px" className="text-[#888888] mt-[11px] ml-[7px]" />
        <RiPlayList2Fill size="20px" className="text-[#888888] mt-[11px] ml-[7px]" />
        {/* <FaRandom />
        <Bs1Circle /> */}
        <div className="w-[36px] h-[14px] bg-[#1f1f1f] mt-[14px] border-solid border-black border-[1px] rounded-r-[18px] text-center">
          <p className="text-[12px] text-[#983737] leading-[14px]">11</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
