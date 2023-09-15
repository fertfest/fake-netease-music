import { useState } from 'react';

const Search = () => {
  const placeholder = '音乐/视频/电台/用户';
  const [searched, setSearched] = useState(placeholder);

  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  return (
    <div className="">
      <input
        type="text"
        className="mt-[19px] h-[32px] rounded-[20px] w-[158px]"
        value={searched}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
