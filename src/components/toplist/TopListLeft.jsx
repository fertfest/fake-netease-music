import { Link, useSearchParams } from 'react-router-dom';

const Header = ({ title }) => (
  <h3 className="w-full mt-[31px] ml-[15px] font-semibold text-[14px] font-['宋体']">
    {title}
  </h3>
);

const TopListItem = ({ toplist, defaultId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let id = searchParams.get('id');
  id = id ? id : defaultId;
  const style = Number(id) === toplist.id
    ? { background: '#e6e6e6' }
    : {};
  return (
    <Link to={`/discover/toplist?id=${toplist.id}`}>
      <li
        className="w-full h-[62px] pt-[10px] hover:cursor-pointer hover:bg-[#f4f2f2] relative"
        style={style}
        key={toplist.id}
      >
        <div className="flex">
          <img src={toplist.coverImgUrl} alt={toplist.name} className="w-[40px] h-[40px] ml-[20px]" />
          <div className="h-[40px] flex-col ml-[10px] overflow-hidden">
            <h3 className="text-[12px] whitespace-nowrap overflow-ellipsis">{toplist.name}</h3>
            <span className="text-[12px] text-[#999999]">{toplist.updateFrequency}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

const TopLists = ({ data, defaultId }) => (
  <ul className="w-full mt-[20px]">
    {
      data.map((toplist) => (
        <TopListItem
          key={toplist.id}
          toplist={toplist}
          defaultId={defaultId}
        />
      ))
    }
  </ul>
);

const TopListLeft = ({ data, defaultId }) => (
  <div
    className="
      bg-[#f9f9f9]
      w-[240px]
      border-solid
      border-l-[#d3d3d3]
      border-l-[1px]
      border-r-[#d5d5d5]
      border-r-[1px]
      flex-col"
  >
    <Header title="云音乐特色榜" />
    <TopLists data={data.slice(0, 4)} defaultId={defaultId} />
    <Header title="全球媒体榜" />
    <TopLists data={data.slice(4)} defaultId={defaultId} />
  </div>
);

export default TopListLeft;
