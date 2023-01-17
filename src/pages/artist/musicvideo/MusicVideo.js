import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ArtistName from "../../../components/ArtistName";

function MusicVideo({ data }) {
  const mvList = data[3]?.items.slice(0, 3);
  const link = data[3]?.link;
  const navigate = useNavigate();
  const handleplay = (item) => {
    navigate(link);
  };



  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center mb-4">
        <span className="font-bold text-xl">MV</span>
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
      <div className="flex flex-row gap-8 justify-between items-center">
        {mvList?.map((item, index) => (
          <div className="w-1/3 flex flex-col gap-1" key={index}>
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
            <span className="hover:text-main-600 cursor-pointer font-bold text-sm">
              {item.title?.length > 20
                ? `${item.title?.slice(0, 20)}...`
                : item.title}
            </span>
            <ArtistName artists={item.artists}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicVideo;
