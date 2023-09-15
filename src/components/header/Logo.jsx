import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Logo = () => (
  <Link to="/">
    <div className="h-full pr-[20px]">
      <img src={logo} alt="logo" className="pt-[20px]" />
    </div>
  </Link>
);

export default Logo;
