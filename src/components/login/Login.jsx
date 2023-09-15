import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AiOutlineWechat, AiOutlineQq, AiOutlineWeibo } from 'react-icons/ai';
import { RiNeteaseCloudMusicFill } from 'react-icons/ri';
import { closeLoginBox, setLogged } from '../../reducers/loginReducer';
import scanQR from '../../assets/scanQR.png';
import otherMethods1 from '../../assets/otherMethods1.png';
import otherMethods2 from '../../assets/otherMethods2.png';
import loginService from '../../services/login';

let intervalId = null;

const STATUS = {
  QRLOGIN_OUTDATE: 800,
  WATING_FOR_SCANNING: 801,
  WATING_FOR_CONFIRM: 802,
  LOGIN_SUCCESS: 803,
  NO_COOKIE: 502,
};

const PAGE = {
  // 二维码登录
  QRLOGIN: 0,
  // 其它方式登录
  OTHER_METHODS: 1,
  // 手机号登录
  PN_LOGIN: 2,
  // 等待确认
  WATING_FOR_CONFIRM: 3,
};

const Header = ({ title }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full h-[39px] bg-[#2d2d2d] flex justify-between">
      <p className="text-[#ffffff] leading-[39px] ml-[13px]">{title}</p>
      <p className="text-[#888888] text-[23px] mr-[18px] leading-[39px] relative">
        ×
        <input
          type="button"
          className="hover:cursor-pointer w-full h-full absolute right-[1px]"
          onClick={() => { clearInterval(intervalId); dispatch(closeLoginBox()); }}
        />
      </p>
    </div>
  );
};

const Login = () => {
  const [status, setStatus] = useState(-1);
  const [qrValid, setQrValid] = useState(true);
  const [qrimgUrl, setQrimgUrl] = useState('');
  const [receive, setReceive] = useState(false);
  const [page, setPage] = useState(PAGE.QRLOGIN);

  const dispatch = useDispatch();

  const startPoll = async () => {
    try {
      const { key, qrimg } = await loginService.getQRImg();
      setQrimgUrl(qrimg);

      let queryParams = key;

      // 开始轮询
      intervalId = setInterval(async () => {
        const { code } = await loginService.getQRStatus(queryParams);
        console.log(code);
        switch (Number(code)) {
          case STATUS.QRLOGIN_OUTDATE:
            if (status !== STATUS.QRLOGIN_OUTDATE) {
              setStatus(STATUS.QRLOGIN_OUTDATE);
            }
            clearInterval(intervalId);
            intervalId = null;
            break;
          case STATUS.WATING_FOR_SCANNING:
            if (status !== STATUS.WATING_FOR_SCANNING) {
              setStatus(STATUS.WATING_FOR_SCANNING);
            }
            console.log('wating for scanning');
            break;
          case STATUS.WATING_FOR_CONFIRM:
            if (status !== STATUS.WATING_FOR_CONFIRM) {
              setStatus(STATUS.WATING_FOR_CONFIRM);
            }
            break;
          case STATUS.LOGIN_SUCCESS:
            clearInterval(intervalId);
            setStatus(STATUS.LOGIN_SUCCESS);
            dispatch(closeLoginBox());
            dispatch(setLogged());
            // todo
            break;
          case STATUS.NO_COOKIE:
            queryParams = `${key}&noCookie=true`;
            if (status !== STATUS.NO_COOKIE) {
              setStatus(STATUS.NO_COOKIE);
            }
            break;
          default:
            throw new Error('未知的状态码');
        }
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    startPoll();
  }, []);

  // 如果otherMethods为false，渲染二维码登录组件
  if (page === PAGE.QRLOGIN) {
    return (
      <div
        className="top-1/2 left-1/2 mt-[-174px] ml-[-265px] fixed w-[530px] h-[368px] rounded-[10px] overflow-hidden  shadow-xl"
      >
        <Header title="登录" />
        <div className="h-full w-full bg-white">
          <div className="h-[270px] w-full  flex">
            <div className="h-full w-[140px] ml-[80px]">
              <img src={scanQR} alt="请扫描右侧二维码" className="mt-[30px]" />
            </div>

            <div className="w-[200px] h-[213px]  flex-col text-center mt-[36px] ml-[30px]">
              <h3 className="text-[#333333]">扫码登录</h3>
              <div className="w-[128px] h-[128px] bg-gray-500 mx-auto mt-[10px]">
                <img src={qrimgUrl} alt="二维码" />
              </div>
              <div className="text-[#999999] text-[14px] mt-[15px]">
                <span>使用&nbsp;</span>
                <span className="text-[#0c73c2]"><Link to="/download">网易云音乐APP</Link></span>
                <span>&nbsp;扫码登录</span>
              </div>
            </div>

          </div>
        </div>
        <div className="w-full mt-[-75px]">
          <div
            className="mx-auto h-[30px] w-[120px]  border-solid border-[1px] border-[#979797]  rounded-2xl text-center hover:cursor-pointer"
          >
            <button type="button" className="text-[12px] w-full h-full" onClick={() => { setPage(PAGE.OTHER_METHODS); }}>选择其他登录模式</button>
          </div>
        </div>
      </div>
    );
  }

  // 渲染其它方式登录页面
  if (page === PAGE.OTHER_METHODS) {
    return (
      <div
        className="top-1/2 left-1/2 mt-[-174px] ml-[-265px] fixed w-[530px] h-[368px]  rounded-[10px] overflow-hidden  shadow-xl"
      >
        <Header title="登录" />

        <div className="w-full bg-white flex-col">
          <div className="w-full h-[240px] flex">
            <div className="w-[300px] h-[192px] flex-col pl-[30px] mt-[30px] ml-[20px] border-separate border-r-[1px] border-[#cccccc]">
              <div className="w-[224px] h-[120px]">
                <img src={otherMethods1} alt="computer" className="w-full h-full" />
              </div>
              <div className="w-[224px] h-[30px] bg-white mt-[30px] text-white text-[14px]">
                <button
                  type="button"
                  className="w-[224px] bg-[#2a7bc8] h-full border-solid border-[1px] border-[#3984ce] rounded-[5px]"
                  onClick={() => { setPage(PAGE.PN_LOGIN); }}
                >
                  手机号登录/注册
                </button>
              </div>
            </div>

            {/**
           * 四种登录方式
           */}
            <div className="w-[187px] h-[221px] mt-[2px] ml-[23px] flex-col">
              <div
                className="w-[148px] h-[39px] bg-white ml-[20px] mt-[14px] flex"
              >
                <div className="w-[38px] h-[38px] border-solid border-[1px] border-[#d1d1d1]  rounded-[19px]">
                  <AiOutlineWechat size="25px" className="text-green-600 ml-[6px] mt-[6px]" />
                </div>
                <span className="text-[12px] text-[#333333] leading-[39px] ml-[11px]">微信登录</span>
              </div>
              <div
                className="w-[148px] h-[39px] bg-white ml-[20px] mt-[14px] flex"
              >
                <div className="w-[38px] h-[38px] border-solid border-[1px] border-[#d1d1d1]  rounded-[19px]">
                  <AiOutlineQq size="25px" className="text-[#34a1de] ml-[6px] mt-[6px]" />
                </div>
                <span className="text-[12px] text-[#333333] leading-[39px] ml-[11px]">QQ登录</span>
              </div>
              <div
                className="w-[148px] h-[39px] bg-white ml-[20px] mt-[14px] flex"
              >
                <div className="w-[38px] h-[38px] border-solid border-[1px] border-[#d1d1d1]  rounded-[19px]">
                  <AiOutlineWeibo size="25px" className="text-[#e94d45] ml-[6px] mt-[6px]" />
                </div>
                <span className="text-[12px] text-[#333333] leading-[39px] ml-[11px]">微博登录</span>
              </div>
              <div
                className="w-[148px] h-[39px] bg-white ml-[20px] mt-[14px] flex"
              >
                <div className="w-[38px] h-[38px] border-solid border-[1px] border-[#d1d1d1]  rounded-[19px]">
                  <RiNeteaseCloudMusicFill size="25px" className="text-[#dd6352] ml-[6px] mt-[6px]" />
                </div>
                <span className="text-[12px] text-[#333333] leading-[39px] ml-[11px]">网易邮箱账号登录</span>
              </div>
            </div>
          </div>

          {/**
           * 同意政策
           */
          }
          <div className="w-full h-[87px]">
            <div className="w-full h-[20px]  text-[12px] pl-[30px]">
              <input type="radio" className="inline" checked={receive} onChange={() => setReceive(!receive)} />
              <span>同意</span>
              <span className="text-[#507daf]">《服务条款》</span>
              <span className="text-[#507daf]">《隐私政策》</span>
              <span className="text-[#507daf]">《儿童隐私政策》</span>
            </div>
          </div>
        </div>

        {/**
         * 右下角二维码图案
         */
        }
        <div
          className="w-[52px] h-[52px] absolute bottom-0 right-0"
        >
          <input className="absolute w-full h-full" type="button" onClick={() => { setPage(PAGE.QRLOGIN); }} />
          <img src={otherMethods2} alt="右下角二维码图案" />
        </div>
      </div>
    );
  }

  // todo 手机号登录/注册
  if (page === PAGE.PN_LOGIN) {
    return (
      <div
        className="top-1/2 left-1/2 mt-[-174px] ml-[-265px] fixed w-[530px] h-[368px]  rounded-[10px] overflow-hidden  shadow-xl"
      >
        <Header title="手机号登录" />
      </div>
    );
  }

  // todo 等待确认页面
  if (page === PAGE.WATING_FOR_CONFIRM) {
    return (
      <div>ss</div>
    );
  }

  return '';
};

export default Login;
