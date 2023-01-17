import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ListCard({ title, listCard, link, isList }) {
  const navigate = useNavigate();
  const handleplay = (item) => {
    navigate(item.link);
  };
  return (
    <div>
      {isList ? (
        <></>
      ) : (
        <div className="w-full flex flex-row justify-between items-center mb-4">
          <span className="font-bold text-xl">{title}</span>
          <div
            className="flex flex-row gap-1 items-center cursor-pointer hover:text-main-500"
            onClick={() => {
              navigate(`${link}`);
            }}
          >
            <span className="text-sm">Tất cả</span>
            <MdOutlineNavigateNext size={30} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 gap-5 place-content-between">
        {listCard?.map((item, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <div
              className="cursor-pointer"
              onClick={() => {
                handleplay(item);
              }}
            >
              <img
                src={item.thumbnail}
                alt="thumbnail"
                className="w-full h-full rounded-md"
              />
            </div>
            <span className="hover:text-main-500 cursor-pointer font-bold text-sm">
              {item.title?.length > 20
                ? `${item.title?.slice(0, 20)}...`
                : item.title}
            </span>
            <span className="text-gray-500 text-sm">
              {item.releaseDateText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListCard;
