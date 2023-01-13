import React from "react";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import Search from "./Search";
import { RiVipFill } from "react-icons/ri";
import { AiOutlineUpload, AiOutlineSetting } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

function Header() {

  return (
    <div className="flex flex-row justify-between w-full items-center py-3 px-10">
      <div className="flex gap-3 items-center">
        <div className="flex gap-3 text-gray-400">
          <span>
            <HiArrowNarrowLeft size={24} />
          </span>
          <span>
            <HiArrowNarrowRight size={24} />
          </span>
        </div>
        <div className="w-4/5">
          <Search />
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div className="cursor-pointer">
          <RiVipFill size={24} />
        </div>
        <div className="cursor-pointer">
          <AiOutlineSetting size={24} />
        </div>
        <div className="cursor-pointer">
          <AiOutlineUpload size={24} />
        </div>
        <div className="cursor-pointer">
          <BsPersonCircle size={24} />
        </div>
      </div>
    </div>
  );
}

export default Header;
