import React from "react";
import { useDispatch } from "react-redux";
import { setCurSongId } from "../redux/musicSlice";
import { setPlaying } from "../redux/playSlice";
import ArtistName from "./ArtistName";
function OutstandingSong({ data }) {
  const dispatch = useDispatch();
  const outStanding = data?.slice(0, 1)[0]?.items?.slice(0, 6);
  const handlePlay = (id) => {
    dispatch(setCurSongId(id));
    dispatch(setPlaying(true));
  };
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-x-6">
      {outStanding?.map((item) => (
        <div
          key={item.encodeId}
          className="flex flex-row items-center border-b-zinc-300 border-b-[0.5px] h-[60px] gap-1"
        >
          <div onClick={() => handlePlay(item.encodeId)} className="cursor-pointer w-10">
            <img src={item.thumbnail} alt="thumbnail" className="h-10 rounded-lg" />
          </div>
          <div className="flex flex-col gap-1">
            <span>{item?.title.length > 30 ? `${item?.title?.slice(0, 30)}...` : item?.title}</span>
            <ArtistName artists={item?.artists}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OutstandingSong;
