import React from "react";
import { useNavigate } from "react-router-dom";
import icons from "../../../assets/icons";
const { BsPersonPlus } = icons;
function ArtistHint({ data }) {
  const navigate = useNavigate();
  const handleplay = (item) => {
    navigate(item.link);
  };
  const list = data[6]?.items?.slice(0, 5);
  return (
    <div className="w-full">
      <div className="mb-4">
        <span className="font-bold text-xl">Có thể bạn quan tâm</span>
      </div>
      <div className="grid grid-cols-5 gap-4 place-content-between ">
        {list?.map((item, index) => (
          <div className="flex flex-col gap-1 items-center" key={index}>
            <div
              className="cursor-pointer"
              onClick={() => {
                handleplay(item);
              }}
            >
              <img
                src={item.thumbnail}
                alt="thumbnail"
                className="w-full h-full rounded-[50%]"
              />
            </div>
            <span className="hover:text-main-500 cursor-pointer font-bold text-sm">
              {item.title?.length > 20
                ? `${item.title?.slice(0, 20)}...`
                : item.title}
            </span>
            <span
              className="cursor-pointer hover:border-b-[0.5px] hover:border-b-main-500 hover:text-main-500 font-semibold text-base"
              onClick={() => {
                handleplay(item);
              }}
            >
              {item?.name}
            </span>
            <button className="flex flex-row gap-1 items-center px-5 py-1 bg-main-500 text-white text-sm rounded-xl">
              <BsPersonPlus size={14} />
              Quan tâm
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistHint;
