import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  AiOutlineClockCircle,
  AiOutlinePlayCircle,
  AiOutlinePlus,
  AiOutlineFolderAdd,
  AiOutlineDownload,
} from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FaShareSquare } from 'react-icons/fa';
import toplistService from '../../services/toplists';
import formatDate from '../../utils/formateDate';
import { formatByMilliseconds } from '../../utils/format';
import formatAuthors from '../../utils/formatAuthors';

const Header = ({ data }) => (
  <div className="w-[660px] h-[158px] mx-auto my-[40px] flex">
    <div className="w-[158px] h-[158px] border-solid border-[1px] border-[#cccccc]">
      <img src={data.coverImgUrl} alt="封面" className="w-[150px] h-[150px] mx-auto my-[3px]" />
    </div>
    <div className="w-[473px] h-[114px] flex-col ml-[29px] mt-[16px]">
      <h3 className="text-[20px]">{data.name}</h3>
      <div className="w-full h-[35px] flex pt-[10px] text-[12px]">
        <AiOutlineClockCircle className="text-[#878787]" size="16px" />
        <span className=" text-[#666] ml-[4px]">最近更新：</span>
        <span className="text-[#666]">{formatDate(new Date(data.trackUpdateTime))}</span>
        <span className="text-[#999999]">
          （
          {data.updateFrequency}
          ）
        </span>
      </div>
      <div className="w-[483px] h-[31px] flex text-[12px]">
        <button
          type="button"
          className="w-[66px] h-full bg-[#4291da] hover:bg-[#5ba1e2] text-white rounded-l-md border-[#64aaeb] border-solid border-[1px] flex"
        >
          <AiOutlinePlayCircle size="20px" className="mt-[4px] ml-[5px]" />
          <span className="ml-[4px] mt-[5px]">播放</span>
        </button>
        <button
          type="button"
          className="w-[31px] h-full bg-[#418fd9] text-white border-solid border-[1px] border-[#64aaeb] hover:bg-[#519ce3]"
        >
          <AiOutlinePlus size="18px" className="text-white ml-[5px] mt-[-1px]" />
        </button>
        <button
          type="button"
          className="bg-[#f4f4f4] h-full flex ml-[7px] border-solid border-[#c3c3c3] border-[1px] hover:bg-[#fbfbfb] rounded-md"
        >
          <AiOutlineFolderAdd size="20px" className="text-[#666666] mt-[4px] ml-[5px]" />
          <p className="mt-[5px] text-[#333333]">
            （
            {data.subscribedCount}
            ）
          </p>
        </button>
        <button
          type="button"
          className="bg-[#f4f4f4] h-full flex ml-[7px] border-solid border-[#c3c3c3] border-[1px] hover:bg-[#fbfbfb] rounded-md"
        >
          <FaShareSquare size="15px" className="text-[#666666] mt-[6px] ml-[5px]" />
          <p className="mt-[5px] text-[#333333]">
            （
            {data.shareCount}
            ）
          </p>
        </button>
        <button
          type="button"
          className="bg-[#f4f4f4] h-full flex ml-[7px] border-solid border-[#c3c3c3] border-[1px] hover:bg-[#fbfbfb] rounded-md"
        >
          <AiOutlineDownload size="18px" className="text-[#666666] mt-[4px] ml-[5px]" />
          <p className="mt-[5px] mr-[9px] text-[#333333]">
            下载
          </p>
        </button>
        <button
          type="button"
          className="bg-[#f4f4f4] h-full flex ml-[7px] border-solid border-[#c3c3c3] border-[1px] hover:bg-[#fbfbfb] rounded-md"
        >
          <BiCommentDetail size="15px" className="text-[#666666] mt-[6px] ml-[5px]" />
          <p className="mt-[5px] text-[#333333]">
            （
            {data.commentCount}
            ）
          </p>
        </button>
      </div>
    </div>
  </div>
);

const ListHeader = ({ data }) => (
  <div className="w-[670px] h-[35px] ml-[40px] flex justify-between  border-solid border-[#c20c0c] border-b-[2px]">
    <div className="h-full w-[200px] flex">
      <h2 className="text-[20px]">歌曲列表</h2>
      <p className="ml-[22px] text-[12px] pt-[8px] h-[12px]">
        {data.trackCount}
        首歌
      </p>
    </div>
    <div>
      <span className="text-[12px] text-[#c20c0c]">
        播放：
        {data.playCount}
        次
      </span>
    </div>
  </div>
);

const SongList = ({ data }) => {
  if (!data || !data.tracks) {
    return '';
  }

  return (
    <div className="w-[670px] flex-col ml-[40px] border-[#d9d9d9] border-solid border-[1px]">
      <table>
        <thead>
          <tr className="table-row h-[39px] w-full bg-[#f2f2f2] border-[#d9d9d9] border-solid border-b-[1px]">
            <th className="w-[78px] h-full border-solid border-[#e1e1e1] border-r-[1px]" aria-label="?" />
            <th className="w-[326px] h-full border-solid border-[#e1e1e1] border-r-[1px] text-[12px] text-[#666666] text-left pl-[8px]">
              标题
            </th>
            <th className="w-[91px] h-full border-solid border-[#e1e1e1] border-r-[1px] text-[12px] text-[#666666] text-left pl-[8px]">
              时长
            </th>
            <th className="w-[173px] h-full text-[12px] text-[#666666] text-left pl-[8px]">
              歌手
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data.tracks.map((song, idx) => {
              if (idx < 3) {
                return (
                  <tr key={song.id} className="h-[73px] odd:bg-[#f7f7f7]">
                    <th className="w-[78px]">
                      <span className="text-[#999999] text-[12px] font-normal">{idx + 1}</span>
                    </th>
                    <th className="w-[326px] flex">
                      <img src={song.al.picUrl} className="w-[50px] h-[50px] mt-[13px]" alt="作者" />
                      <div className="h-full w-[30px] pt-[28px] ml-[15px] relative">
                        <button type="button" title="播放">
                          <AiOutlinePlayCircle size="20px" className="text-[#b2b2b2] hover:text-[#666666]" />
                        </button>
                      </div>
                      <Link to={`/song/id=${song.id}`}>
                        <p className="text-[#333333] text-[12px] hover:underline font-normal pt-[29px] pl-[3px]">{song.name}</p>
                      </Link>
                    </th>
                    <th className="w-[91px] text-left text-[12px] font-normal pl-[8px]">
                      {formatByMilliseconds(song.dt)}
                    </th>
                    <th className="w-[173px] text-left text-[12px] font-normal pl-[8px]">
                      {formatAuthors(song.ar)}
                    </th>
                  </tr>
                );
              }
              return (
                <tr key={song.id} className="h-[30px] odd:bg-[#f7f7f7]">
                  <th className="w-[78px] h-full">
                    <span className="text-[#999999] text-[12px] font-normal">{idx + 1}</span>
                  </th>
                  <th className="w-[326px] h-[30px] flex pt-[6px] text-left">
                    <div className="h-full w-[30px]">
                      <button type="button" title="播放" className="">
                        <AiOutlinePlayCircle size="20px" className="text-[#b2b2b2] hover:text-[#666666] " />
                      </button>
                    </div>
                    <Link to={`/song/id=${song.id}`}>
                      <p className="text-[#333333] w-[250px] h-[full] whitespace-nowrap text-[12px] hover:underline font-normal pt-[2px] pl-[3px] overflow-hidden text-ellipsis">{song.name}</p>
                    </Link>
                  </th>
                  <th className="w-[91px] text-left text-[12px] font-normal pl-[8px]">
                    {formatByMilliseconds(song.dt)}
                  </th>
                  <th className="w-[173px] text-left text-[12px] font-normal pl-[8px]">
                    <p className="whitespace-nowrap h-[30px] w-[173px] overflow-hidden text-ellipsis leading-[30px]">{formatAuthors(song.ar)}</p>
                  </th>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

const CommentsHeader = ({ data }) => (
  <div className="w-[670px] h-[35px] ml-[40px] flex border-solid border-[#c20c0c] border-b-[2px] mt-[40px]">
    <div className="h-full flex">
      <h2 className="text-[20px]">评论</h2>
    </div>
    <div className="ml-[25px] mt-[5px]">
      <span className="text-[12px] text-[#666666]">
        共
        {data.commentCount}
        条评论
      </span>
    </div>
  </div>
);

const TopListRight = ({ defaultId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);

  let id = searchParams.get('id');
  id = id || defaultId;
  // const s = toplists.find((toplist) => toplist.id === Number(id));
  // const updateFrequency = s ? s.updateFrequency : '';

  useEffect(() => {
    if (Number(id) !== -1) {
      toplistService
        .getToplistDetail(id)
        .then((toplist) => {
          setData(toplist);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [id]);

  return (
    <div
      className="
                      w-[742px]
                    border-solid
                    border-r-[1px]
                    border-r-[#d3d3d3]
                    flex-col"
    >
      <Header data={data} />
      <ListHeader data={data} />
      <SongList data={data} />
      <CommentsHeader data={data} />
    </div>
  );
};

export default TopListRight;
