import NavItem from './NavItem';

const Nav = () => {
  const navItems = [
    {
      text: '发现音乐',
      to: '/',
      key: 1,
    },
    {
      text: '我的音乐',
      to: '/my',
      key: 2,
    },
    {
      text: '关注',
      to: '/friend',
      key: 3,
    },
    {
      text: '商城',
      to: '/',
      key: 4,
    },
    {
      text: '音乐人',
      to: '/',
      key: 5,
    },
    {
      text: '云推歌',
      to: '/',
      key: 6,
    },
    {
      text: '下载客户端',
      to: '/',
      key: 7,
    },
  ];

  return (
    <div className="h-full flex text-white">
      {navItems.map((item) => <NavItem text={item.text} to={item.to} key={item.key} />)}
    </div>
  );
};

export default Nav;
