import { useDispatch, useSelector } from "react-redux";
import { openLoginBox } from "../../../reducers/loginReducer";
import { Link } from "react-router-dom";
import topService from '../../../services/top';
import djService from '../../../services/dj';
import { useEffect, useState } from "react";

const ContentRightProfile = () => {
  const logged = useSelector((state) => state.login.logged);
  const dispatch = useDispatch();

  if (logged) {
    return (
      <div className="w-[250px] absolute top-0 right-0 flex-col">
        <div className="w-full h-[184px] bg-[#f6f6f6] flex-col border-solid border-[#b2b2b2] border-b-[1px] pt-[30px]">
          <div className="w-full h-[91px] flex">
            <div className="w-[80px] h-[80px] bg-black ml-[20px]">

            </div>
            <div className="w-[115px] h-[91px] bg-black ml-[30px] flex-col">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[124px] bg-[#ededed] text-center pt-[20px]">
      <p className="text-[12px] text-[#666666] w-[205px] mx-auto">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <button
        type="button"
        className="bg-[#cf0f16] w-[100px] h-[30px] border-solid border-[1px] border-[#b40a10] text-[12px] text-white rounded-md hover:bg-[#e3232a] mt-[12px]"
        onClick={() => { dispatch(openLoginBox()); }}
      >
        用户登录
      </button>
    </div>
  );
};

const ContentRight = () => {
  const [residentSingers, setResidentSingers] = useState([]);
  const [hotDJs, setHotDJs] = useState([]);

  useEffect(() => {
    topService
      .getResidentSingers()
      .then((data) => {
        setResidentSingers(data);
      })
      .catch((e) => {
        console.error(e);
      });

    djService
      .getHotDJs()
      .then((data) => {
        setHotDJs(data);
      });
  }, []);

  const logged = useSelector((state) => state.login.logged);
  return (
    <div className="w-[250px] flex-col absolute top-0 right-0">
      <ContentRightProfile />
      <div className="w-full h-[455px] mt-[16px] text-[12px]">
        <div className="w-[210px] h-[24px] mx-auto flex justify-between border-solid border-[#cccccc] border-b-[1px]">
          <h3 className="font-bold text-[14px]">
            入驻歌手
          </h3>
          <span className="mt-[2px] hover:underline"><Link to="/discover/artist/signed">查看全部&gt;</Link></span>
        </div>
        <ul className="w-[210px] h-[380px]  mt-[10px] mx-auto">
          {
            residentSingers.map((singer) => (
              <Link to={`/artist/id=${singer.id}`} key={singer.id}>
                <li
                  className="w-[210px] h-[62px] border-solid border-[#e9e9e9] border-[1px] flex mt-[15px] bg-[#fafafa] hover:bg-[#f4f4f4]"
                >
                  <img src={singer.avatar} className="w-[60px] h-[60px]" alt="头像" />
                  <div className="w-[120px] flex-col text-ellipsis overflow-hidden ml-[8px]">
                    <h3 className="text-[14px] font-bold mt-[8px]">
                      {singer.name}
                    </h3>
                    <div className="w-full mt-[8px]">
                      <span className="text-ellipsis w-[120px] whitespace-nowrap">
                        {singer.briefDesc}
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            ))
          }
        </ul>
        <button type="button" className="mx-auto w-[210px] h-[31px] bg-[#f6f6f6] hover:bg-[#fdfdfd] rounded-sm block">
          申请成为网易音乐人
        </button>
      </div>

      <div className="w-full h-[294px]  mt-[20px]">
        <div className="w-[210px] h-[24px] mx-auto border-solid border-[#cccccc] border-b-[1px]">
          <h3 className="font-bold text-[14px]">
            热门主播
          </h3>
        </div>
        <ul className="w-[210px] h-[250px] mt-[10px] mx-auto flex-col">
          {
            hotDJs.map((dj) => (
              <li className="w-[210px] h-[50px] flex" key={dj.id}>
                <img src={dj.avatarUrl} alt="" className="w-[40px] h-[40px]" />
                <div className="pl-[15px] pt-[6px]">
                  <span className="text-[12px] text-[#000000]">{dj.nickName}</span>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default ContentRight;
