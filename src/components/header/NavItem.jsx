import { Link } from 'react-router-dom';

const NavItem = ({ text, to }) => (
  <Link to={to}>
    <div className="h-full px-[19px] leading-[70px]">
      {text}
    </div>
  </Link>
);

export default NavItem;
