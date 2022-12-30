import React from "react";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import Search from "./Search";

function Header() {
  return (
    <div className="flex flex-row justify-between w-full items-center gap-2">
      <div className="flex gap-3 items-center">
        <div className="flex gap-3 text-gray-400">
            <span><HiArrowNarrowLeft size={24}/></span>
            <span><HiArrowNarrowRight size={24} /></span>
        </div>
        <div className="w-4/5">
            <Search />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button className="px-2 py-2 bg-violet-600 rounded-2xl text-white font-semibold">Đăng nhập</button>
        <button className="px-2 py-2 bg-violet-600 rounded-2xl text-white font-semibold">Đăng ký </button>
      </div>
    </div>
  );
}

export default Header;
