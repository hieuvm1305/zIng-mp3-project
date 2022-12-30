import React from "react";
import icons from "../assets/icons";
import { useDispatch } from "react-redux";
import { setCurSongId} from "../redux/musicSlice";
import { setPlaying } from "../redux/playSlice";

const { BsMusicNoteBeamed } = icons;
function List({ songData }) {
  const dispatch = useDispatch();

  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer"
      onClick={() => {
        dispatch(setCurSongId(songData?.encodeId));
        dispatch(setPlaying(true));
      }}
    >
      <div className="flex items-center gap-3 flex-1">
        <span>
          <BsMusicNoteBeamed />
        </span>
        <img src={songData?.thumnail} alt="thumnail"></img>
        <span className="flex flex-col w-full">
          <span className="text-sm font-semibold">
            {songData?.title?.length > 30
              ? `${songData?.title?.slice(0, 30)}...`
              : songData?.title}
          </span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>
    </div>
  );
}

export default List;
