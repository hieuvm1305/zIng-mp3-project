import React from "react";
import { useNavigate } from "react-router-dom";
import ArtistName from "./ArtistName";

function CardItem({ title, list }) {
  const navigate = useNavigate();
  const handleplay = (item) => {
    navigate(item.link);
  };
  return (
    <div className="w-full">
      <div className="mb-4">
        <span className="font-bold text-xl">{title}</span>
      </div>
      <div className="grid grid-cols-5 gap-4 place-content-between ">
        {list?.map((item, index) => (
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
            <ArtistName artists={item.artists} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardItem;
