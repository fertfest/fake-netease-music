import Logo from './Logo';
import Nav from './Nav';
import Search from './Search';
import CreatorCentor from './CreatorCentor';
import Avatar from './Avatar';

const Header = () => (
  <div className="bg-[#242424] h-[70px] w-screen">
    <div className="mx-auto flex w-[1100px] h-full">
      <Logo />
      <Nav />
      <Search />
      <CreatorCentor />
      <Avatar />
    </div>
  </div>
);

export default Header;
