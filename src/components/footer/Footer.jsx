import { Link } from 'react-router-dom';
import enterImg from '../../assets/foot_enter_new2.png';

const Footer = () => (
  <div className="h-[325px] bg-[#f2f2f2]">
    <div className="mx-auto w-[980px] h-[231px] mt-[33px] ">
      <ul className="h-[71px] flex gap-[80px] pl-[30px]">
        <li className="w-[45px] ">
          <Link to="https://developer.music.163.com/st/developer">
            <div className="w-[45px] h-[45px] hover:bg-[#ff3a47]" style={{ background: `url(${enterImg}) -170px -5px / 220px 220px no-repeat` }} />
          </Link>
          <span className="text-[12px] inline-block w-[100px] mt-[10px] text-center ml-[-27.5px] ">
            音乐开放平台
          </span>
        </li>
        <li className="w-[45px]">
          <Link to="https://music.163.com/st/web-sublicense/home">
            <div className="w-[45px] h-[45px]" style={{ background: `url(${enterImg}) 0% 0% / 220px 220px no-repeat`, backgroundPosition: '-170px -5px' }} />
          </Link>
          <span className="text-[12px] inline-block w-[100px] mt-[10px] text-center ml-[-27.5px] ">
            云村交易所
          </span>
        </li>
        <li className="w-[45px]">
          <Link to="https://web-amped.music.163.com/">
            <div className="w-[45px] h-[45px]" style={{ background: `url(${enterImg}) 0% 0% / 220px 220px no-repeat`, backgroundPosition: '-170px -5px' }} />
          </Link>
          <span className="text-[12px] inline-block w-[100px] mt-[10px] text-center ml-[-27.5px] ">
            Amped Studio
          </span>
        </li>
        <li className="w-[45px]">
          <Link to="https://developer.music.163.com/st/developer">
            <div className="w-[45px] h-[45px]" style={{ background: `url(${enterImg}) 0% 0% / 220px 220px no-repeat`, backgroundPosition: '-170px -5px' }} />
          </Link>
          <span className="text-[12px] inline-block w-[100px] mt-[10px] text-center ml-[-27.5px] ">
            X Studio虚拟歌手
          </span>
        </li>
        <li className="w-[45px]">
          <Link to="https://developer.music.163.com/st/developer">
            <div className="w-[45px] h-[45px]" style={{ background: `url(${enterImg}) 0% 0% / 220px 220px no-repeat`, backgroundPosition: '-170px -5px' }} />
          </Link>
          <span className="text-[12px] inline-block w-[100px] mt-[10px] text-center ml-[-27.5px] ">
            用户认证
          </span>
        </li>
        <li className="w-[45px]">
          <Link to="https://developer.music.163.com/st/developer">
            <div className="w-[45px] h-[45px]" style={{ background: `url(${enterImg}) 0% 0% / 220px 220px no-repeat`, backgroundPosition: '-170px -5px' }} />
          </Link>
          <span className="text-[12px] inline-block w-[100px] mt-[10px] text-center ml-[-27.5px] ">
            用户认证
          </span>
        </li>
        <li className="w-[45px]">
          <Link to="https://developer.music.163.com/st/developer">
            <div className="w-[45px] h-[45px]" style={{ background: `url(${enterImg}) 0% 0% / 220px 220px no-repeat`, backgroundPosition: '-170px -5px' }} />
          </Link>
          <span className="text-[12px] inline-block w-[100px] mt-[10px] text-center ml-[-27.5px] ">
            云推歌
          </span>
        </li>
        <li className="w-[45px]">
          <Link to="https://developer.music.163.com/st/developer">
            <div className="w-[45px] h-[45px]" style={{ background: `url(${enterImg}) 0% 0% / 220px 220px no-repeat`, backgroundPosition: '-170px -5px' }} />
          </Link>
          <span className="text-[12px] inline-block w-[100px] mt-[10px] text-center ml-[-27.5px] ">
            赞赏
          </span>
        </li>
      </ul>
      <div className="h-[100px] mt-[60px]">
        <div className="h-[24px] text-center text-[12px]">
          <Link to="https://st.music.163.com/official-terms/service">服务条款</Link>
          <span className="mx-[7px] text-gray-300">|</span>
          <Link to="https://st.music.163.com/official-terms/service">隐私政策</Link>
          <span className="mx-[7px] text-gray-300">|</span>
          <Link to="https://st.music.163.com/official-terms/service">儿童隐私政策</Link>
          <span className="mx-[7px] text-gray-300">|</span>
          <Link to="https://st.music.163.com/official-terms/service">版权投诉</Link>
          <span className="mx-[7px] text-gray-300">|</span>
          <Link to="https://st.music.163.com/official-terms/service">投资者关系</Link>
          <span className="mx-[7px] text-gray-300">|</span>
          <Link to="https://st.music.163.com/official-terms/service">广告合作 </Link>
          <span className="mx-[7px] text-gray-300">|</span>
          <Link to="https://st.music.163.com/official-terms/service">联系我们</Link>
        </div>
        <div className="h-[24px] text-center text-[12px]">
          <Link to="ssssss">廉政举报</Link>
          <span className="mx-[7px]">不良信息举报邮箱: 51jubao@service.netease.com</span>
          <span>客服热线：95163298</span>
        </div>
        <div className="h-[24px] text-center text-[12px]">
          <span>
            互联网宗教信息服务许可证：浙（2022）0000120 增值电信业务经营许可证：浙B2-20150198 粤B2-20090191-18  工业和信息化部备案管理系统网站
          </span>
        </div>
        <div className="h-[24px] text-center text-[12px]">
          <span>网易公司版权所有©1997-2023杭州乐读科技有限公司运营：浙网文[2021] 1186-054号  浙公网安备 33010902002564号</span>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
