import React from "react";
import icons from "../assets/icons";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { setCurSongId } from "../redux/musicSlice";
import { setPlaying } from "../redux/playSlice";

const { BsMusicNoteBeamed } = icons;

function List({ songData }) {
  const dispatch = useDispatch();
  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#e4dde3] cursor-pointer"
      onClick={() => {
        dispatch(setCurSongId(songData?.encodeId));
        dispatch(setPlaying(true));
      }}
    >
      <div className="flex items-center gap-2 flex-1">
        <div className="flex flex-row items-center gap-1 w-1/3">
          <span>
            <BsMusicNoteBeamed />
          </span>
          <img
            src={songData?.thumbnail}
            alt="thumbnail"
            className="rounded-md"
          ></img>
          <span className="flex flex-col">
            <span className="text-sm font-semibold">
              {songData?.title?.length > 30
                ? `${songData?.title?.slice(0, 30)}...`
                : songData?.title}
            </span>
            <span>{songData?.artistsNames}</span>
          </span>
        </div>
        <span className="w-1/3 text-center">{songData?.album?.title}</span>
        <span className="w-1/3 text-right">{moment.utc(songData?.duration * 1000).format("mm:ss")}</span>
      </div>
    </div>
  );
}

export default List;
