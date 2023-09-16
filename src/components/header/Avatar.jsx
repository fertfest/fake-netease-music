import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  AiOutlineUser,
  AiOutlineMail,
  AiFillSetting,
  AiOutlineVerified,
} from 'react-icons/ai';
import { PiMedal } from 'react-icons/pi';
import { RiVipDiamondLine, RiShutDownLine } from 'react-icons/ri';
import { setLogged, openLoginBox, setUnlogged } from '../../reducers/loginReducer';
import userService from '../../services/users';
import logoutService from '../../services/logout';
import loginService from '../../services/login';

const Avatar = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.login.logged);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // 应用还未初始化就让程序异步获取登录状态 -10：未登录 0：已登录
  const getStatus = async () => {
    const code = await loginService.getLoginStatus();
    if (code === 0) {
      dispatch(setLogged());
    } else if (code === -10) {
      dispatch(setUnlogged());
    }
  };
  getStatus();

  const menuStyle = {
    display: menuVisible ? '' : 'none',
  };

  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setMenuVisible(false);
    }, 500);
  };

  const handleExit = async () => {
    await logoutService.logout();
    dispatch(setUnlogged());
  };

  useEffect(() => {
    if (logged) {
      userService
        .getAvatarUrl()
        .then((data) => {
          setAvatarUrl(data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [logged]);

  if (!logged) {
    return (
      <div className="h-full text-[#787878] hover:cursor-pointer leading-[65px] text-[12px] ml-[15px] relative pt-[2px]">
        <input
          type="button"
          className="w-full h-full absolute hover:cursor-pointer"
          onClick={() => { dispatch(openLoginBox()); }}
        />
        登录
      </div>
    );
  }

  return (
    <div className="w-[30px] h-full  ml-[15px] relative pt-[2px]">
      <div
        className="w-[30px] h-[30px] absolute mt-[18px] ml-[3px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-full rounded-[15px] overflow-hidden">
          <img
            src={avatarUrl}
            alt="用户头像"
          />
        </div>
        <div
          className="h-[242px] w-[160px] bg-[#2b2b2b] absolute left-[-63px] top-[38px] border-solid border-[#202020] border-[1px]"
          style={menuStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="absolute left-[70px] top-[-7px] w-0 h-0 border-[#2b2b2b] border-solid border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[7px]"
          />
          <ul className="flex-col w-full ">
            <li className="h-[34px] pt-[6px] pl-[18px] flex">
              <AiOutlineUser size="20px" className="text-[#8a8a8a]" />
              <span className="text-[12px] text-[#adadad] mt-[2px] ml-[8px]">我的主页</span>
            </li>
            <li className="h-[34px] pt-[6px] pl-[18px]  flex">
              <AiOutlineMail size="20px" className="text-[#8a8a8a]" />
              <span className="text-[12px] text-[#adadad] mt-[2px] ml-[8px]">我的主页</span>
            </li>
            <li className="h-[34px] pt-[6px] pl-[18px] flex">
              <PiMedal size="20px" className="text-[#8a8a8a]" />
              <span className="text-[12px] text-[#adadad] mt-[2px] ml-[8px]">我的等级</span>
            </li>
            <li className="h-[34px] pt-[6px] pl-[18px] border-solid border-[#232323] border-b-[1px] flex">
              <RiVipDiamondLine size="20px" className=" text-[#8a8a8a]" />
              <span className="text-[12px] text-[#adadad] mt-[2px] ml-[8px]">VIP会员</span>
            </li>
            <li className="h-[34px] pt-[6px] pl-[18px] flex">
              <AiFillSetting size="20px" className="text-[#8a8a8a]" />
              <span className="text-[12px] text-[#adadad] mt-[2px] ml-[8px]">个人设置</span>
            </li>
            <li className="h-[34px] pt-[6px] pl-[18px] border-solid border-[#232323] border-b-[1px] flex">
              <AiOutlineVerified size="20px" className="text-[#8a8a8a]" />
              <span className="text-[12px] text-[#adadad] mt-[2px] ml-[8px]">实名认证</span>
            </li>
            <li className="h-[34px] pt-[6px] pl-[18px] flex relative">
              <input
                type="button"
                className="w-full h-full hover:cursor-pointer absolute"
                onClick={handleExit}
              />
              <RiShutDownLine size="20px" className="text-[#8a8a8a]" />
              <span className="text-[12px] text-[#adadad] mt-[2px] ml-[8px]">退出</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
