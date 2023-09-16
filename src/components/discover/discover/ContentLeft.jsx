import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlinePlayCircle, AiOutlineFolderAdd } from 'react-icons/ai';
import { BiHeadphone, BiPlayCircle } from 'react-icons/bi';
import { FiFolderPlus } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import playlistService from '../../../services/playlists';
import albumService from '../../../services/albums';
import toplistService from '../../../services/toplists';

import { setSongId } from '../../../reducers/playerReducer';

const TopListItem = ({
  toplistName,
  id,
  data,
  coverImgUrl,
}) => {
  const dispatch = useDispatch();
  const handlePlay = (songId) => () => {
    dispatch(setSongId(songId));
  };

  return (
    <div
      className="w-[229px]  h-full border-solid border-r-[#c3c3c3] border-r-[1px] float-left last:border-none"
    >
      <div className="h-[118px] w-full relative">
        {/* 图片 */}
        <Link to={`/discover/toplist?id=${id}`}>
          <div
            className="absolute w-[80px] h-[80px] left-[18px] top-[18px] opacity-70 text-[#d7f6f1] font-['Arial'] font-bold text-center"
            style={{ backgroundImage: `url(${coverImgUrl})` }}
            title={toplistName}
          >
            <span className="leading-[80px] hover:content">{toplistName}</span>
          </div>
        </Link>
        <Link to={`/discover/toplist?id=${id}`}><p className="absolute left-[110px] top-[32px] hover:underline">{toplistName}</p></Link>
        <BiPlayCircle className="absolute left-[109px] top-[58px] text-[25px] text-[#bfbfbf] hover:text-[#9b9b9b] " />
        <FiFolderPlus className="absolute left-[139px] top-[58px] text-[25px] text-[#bfbfbf] hover:text-[#9b9b9b] " />
      </div>
      <ul className="h-[320px] w-full">
        {
          data.map((item, order) => (
            <li key={item.id} className="h-[32px] odd:bg-[#e8e8e8] group">
              <div className="ml-[25px] relative">
                <span className="text-[16px]  w-[20px] inline-block leading-[32px] text-[#666666]">{order + 1}</span>
                <Link to={`/song?id=${item.id}`}><span className="text-[12px] hover:underline">{item.name}</span></Link>
                <div className="w-[84px] h-full absolute right-0 top-0 flex gap-[4px] invisible group-hover:visible">
                  <div className="h-full w-[20px] relative">
                    <input
                      type="button"
                      className="hover:cursor-pointer absolute w-full h-full"
                      title="播放"
                      onClick={handlePlay(item.id)}
                    />
                    <AiOutlinePlayCircle size="20px" className="mt-[7px]" />
                  </div>
                  <div className="h-full w-[20px] relative">
                    <input type="button" className="hover:cursor-pointer absolute w-full h-full" />
                    <MdAdd size="20px" className="mt-[7px]" />
                  </div>
                  <div className="h-full w-[20px] relative">
                    <input type="button" className="hover:cursor-pointer absolute w-full h-full" />
                    <AiOutlineFolderAdd size="20px" className="mt-[7px]" />
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      <div className="bg-[#e8e8e8] w-full h-[32px]"></div>
    </div>
  );
};

const ContentLeft = () => {
  const navItems = [
    {
      text: '华语',
      key: 1,
    },
    {
      text: '流行',
      key: 2,
    },
    {
      text: '摇滚',
      key: 3,
    },
    {
      text: '民谣',
      key: 4,
    },
    {
      text: '电子',
      key: 5,
    },
  ];

  const [data, setData] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [toplistData, setToplistData] = useState([]);
  useEffect(() => {
    playlistService
      .hot8Playlists()
      .then((resp) => {
        setData(resp);
      })
      .catch((e) => {
        console.error(e);
      });

    albumService
      .getNewAlbums()
      .then((resp) => {
        setNewAlbums(resp.slice(0, 5));
      }).catch((e) => {
        console.error(e);
      });

    toplistService
      .discoverToplists()
      .then((resp) => {
        const promises = resp.map((toplist) => playlistService.getPlaylistById(toplist.id));
        return Promise.all(promises);
      })
      .then((resp) => {
        const toplists = resp.map((item) => (
          {
            topTen: item.playlist.tracks.slice(0, 10),
            name: item.playlist.name,
            id: item.playlist.id,
            coverImgUrl: item.playlist.coverImgUrl,
          }));
        setToplistData(toplists);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className="w-[730px] absolute top-0 left-0 border-solid border-r-[1px] border-[#d4d4d4] h-full">
      <div className="w-[690px] absolute left-[20px] top-[20px]  flex flex-wrap  gap-x-[42px] gap-y[12px]">
        {/* 热门推荐导航栏 */}
        <div className="w-full border-b-2 border-solid border-b-[#c10d0c]">
          <Link to="/discover/playlist"><h3 className="inline-block">热门推荐</h3></Link>
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={`/playlist?cat=${item.text}`}
              className="mx-[13px]"
            >
              {item.text}
            </Link>
          ))}
          <Link to="/discover/playlist" className="absolute right-[40px] hover:underline">更多</Link>
        </div>
        {/** 热门推荐内容 */}
        {data.map((item) => (
          <div
            key={item.id}
            className=" w-[140px] h-[201px] my-[15px]"
          >
            <div className="relative top-0">
              <img src={`${item.coverImgUrl}?140y140`} alt={item.description} />
              <div className="w-full h-[27px] absolute bottom-0 bg-[#131313] bg-opacity-80 text-[#cccccc] text-[12px] pt-1">
                <BiHeadphone size="15px" className="absolute bottom-[5px] left-[5px]" />
                <span className="ml-4 absolute bottom-[3px] left-[11px]">
                  {item.playCount >= 100000 ? `${Math.floor(item.playCount / 10000)}万` : item.playCount}
                </span>
                <Link to={`/discover/playlist/${item.id}`}><AiOutlinePlayCircle size="2em" className="absolute bottom-[2px] right-1" /></Link>
              </div>
              <Link to={`/ discover / playlist / ${item.id}`}>
                <div className="mt-[5px] absolute text-[12px] hover:underline">
                  <span>
                    {item.name}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}

        {/** 新碟上架导航栏 */}
        <div className="w-full border-b-2 border-solid border-b-[#c10d0c] flex justify-between mt-[30px]">
          <Link to="/discover/album"><h3 className="inline-block">新碟上架</h3></Link>
          <Link to="/discover/album" className="mr-7 hover:underline"><span>更多</span></Link>
        </div>
        {/** 新碟上架内容 */}
        <div className="w-[689px] h-[188px] border-solid border-[#d3d3d3] border-[1px] mt-[20px]">
          <ul className="w-[685px] h-[184px] bg-[#f5f5f5] m-auto flex gap-x-[11px] ">
            {
              newAlbums.map((item) => (
                <li key={item.id} className="w-[118px] h-[150px]  my-auto first:ml-[27px] relative">
                  <Link to={`/discover/album?id=${item.id}`}><img src={`${item.picUrl}?100y100`} alt={item.name} /></Link>
                  <p className="text-[12px] hover:underline mt-[0px] whitespace-nowrap overflow-hidden text-ellipsis"><Link to={`/discover/album?id=${item.id}`}>{item.name}</Link></p>
                  <Link to={`/discover/artist?id=${item.artist.id}`}><p className="text-[12px] hover:underline text-[#666666]">{item.artist.name}</p></Link>
                </li>
              ))
            }
          </ul>

        </div>

        {/** 榜单导航栏 */}
        <div className="w-full border-b-2 border-solid border-b-[#c10d0c] flex justify-between mt-[30px]">
          <Link to="/discover/toplist"><h3 className="inline-block">榜单</h3></Link>
          <Link to="/discover/toplist" className="mr-7 hover:underline"><span>更多</span></Link>
        </div>
        {/** 榜单内容 */}
        <div className="w-[689px] h-[472px] border-solid border-[#d2d2d2] border-[1px] mt-[20px] relative bg-[#f4f4f4]">
          {
            toplistData.map((toplist) => (
              <TopListItem
                toplistName={toplist.name}
                id={toplist.id}
                data={toplist.topTen}
                coverImgUrl={toplist.coverImgUrl}
                key={toplist.id}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ContentLeft;
