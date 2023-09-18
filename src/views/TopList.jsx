import { useEffect, useState } from 'react';
import toplistService from '../services/toplists';
import TopListLeft from '../components/toplist/TopListLeft';
import TopListRight from '../components/toplist/TopListRight';

const TopList = () => {
  const [data, setData] = useState([]);
  const [defaultId, setDefaultId] = useState(-1);

  useEffect(() => {
    toplistService
      .getAllToplists()
      .then((list) => {
        setData(list);
        if (list.length > 0) {
          setDefaultId(list[0].id);
        }
      });
  }, []);

  return (
    <div className="flex">
      <TopListLeft data={data} defaultId={defaultId} />
      <TopListRight toplists={data} defaultId={defaultId} />
    </div>
  );
};

export default TopList;
