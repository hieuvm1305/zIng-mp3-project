import React, {useState } from "react";
import useDebounce from "../hook/useDebounce";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  const debouncedValue = useDebounce(searchTitle, 1000);

  const handleSearch = () => {
    if(debouncedValue){
      navigate(`/search?query=${debouncedValue}`)
    }
  };
  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      handleSearch();
    }
  }
  return (
    <div className="w-full flex items-center border rounded-3xl border-black bg-[#DDE4E4]">
      <span
        className="h-10 px-4 flex items-center justify-center rounded-l-[20px] cursor-pointer"
        onClick={handleSearch}
      >
        <FiSearch size={24} />
      </span>
      <input
        type="text"
        className=" border outline-none px-4 bg-[#DDE4E4] py-2 w-full rounded-r-3xl h-10 text-gray-500"
        placeholder="Tìm kiếm bài hát, nghệ sĩ"
        onChange={(e) => {
          setSearchTitle(e.target.value);
        }}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </div>
  );
}

export default Search;
