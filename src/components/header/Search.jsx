import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = () => {
  const placeholder = '音乐/视频/电台/用户';
  const [searched, setSearched] = useState(placeholder);

  const handleChange = (event) => {
    setSearched(event.target.value);
  };

  const handleBlur = () => {
    if (!searched) {
      setSearched(placeholder);
    }
  };

  const handleFocus = (event) => {
    if (event.target.value === placeholder) {
      setSearched('');
    }
  };

  return (
    <div className="mt-[20px] h-[32px] rounded-[20px] w-[158px] relative">
      <AiOutlineSearch size="20px" className="absolute mt-[3px] text-[#3e3e3e] ml-[4px]" />
      <input
        type="search"
        className="pl-[23px] pt-[5px] pb-[5px] rounded-[20px] w-full text-[12px] outline-none text-[#9b9b9b]"
        value={searched}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default Search;
