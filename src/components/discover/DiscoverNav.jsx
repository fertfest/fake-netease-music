import DiscoverNavItem from './DiscoverNavItem';

const DiscoverNav = () => {
  const navItems = [
    {
      text: '推荐',
      to: '/discover',
      key: 1,
    },
    {
      text: '排行榜',
      to: '/discover/toplist',
      key: 2,
    },
    {
      text: '歌单',
      to: '/discover/playlist',
      key: 3,
    },
    {
      text: '主播电台',
      to: '/discover/djratio',
      key: 4,
    },
    {
      text: '歌手',
      to: '/discover/artlist',
      key: 5,
    },
    {
      text: '新碟上架',
      to: '/discover/album',
      key: 6,
    },
  ];

  return (
    <div className="w-full bg-[#c20c0c] h-[35px]">
      <div className="w-[982px] flex mx-auto pl-[114px]">
        {navItems.map((item) => <DiscoverNavItem text={item.text} to={item.to} key={item.key} />)}
      </div>
    </div>
  );
};

export default DiscoverNav;
