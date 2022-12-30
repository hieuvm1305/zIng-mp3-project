import React from "react";
import { FiSearch } from "react-icons/fi";

function Search() {
  return (
    <div className="w-full flex items-center border rounded-3xl border-black">
      <span className="h-10 px-4 bg-[#DDE4R$] flex items-center justify-center rounded-l-[20px] text-gray-500">
        <FiSearch size={24} />
      </span>
      <input
        type="text"
        className=" border outline-none px-4 bg-[#DDE4E4] py-2 w-full rounded-r-3xl h-10 text-gray-500"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  );
}

export default Search;
