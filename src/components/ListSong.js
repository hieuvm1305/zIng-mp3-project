import React, { memo } from "react";
import List from "./List";
import icons from "../assets/icons";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars-2";
const { BsDot } = icons;

const Lists = ({ songs, totalDuration }) => {
  // console.log({ songs, totalDuration })
  return (
    <div className="w-full flex flex-col text-xs text-gray-600">
      <div className=" flex justify-between items-center p-[10px] font-semibold">
        <span>Bài hát</span>
        <span>Album</span>
        <span>Thời gian</span>
      </div>
      <Scrollbars style={{ height: 450 }}>
        <div className="flex flex-col">
          {songs?.map((item) => (
            <List key={item.encodeId} songData={item} />
          ))}
        </div>
      </Scrollbars>
      <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
        <span>{`${songs?.length} bài hát`}</span>
        <BsDot size={24} />
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
      </span>
    </div>
  );
};

export default memo(Lists);
