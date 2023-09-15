import { Link } from 'react-router-dom';

const DiscoverNavItem = ({ text, to }) => (
  <div className="mx-[17px] pt-[3px] h-full">
    <Link to={to}>
      <div className="rounded-[20px] bg-[#9b0909] px-[13px] text-[12px] text-white h-[20px] my-[5px]">
        {text}
      </div>
    </Link>
  </div>

);

export default DiscoverNavItem;
