import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Lists from "../components/Lists";
import { Scrollbars } from "react-custom-scrollbars-2";
import { getDetailPlaylist } from "../service";

function Album() {
  const pid = useParams();
  const [playlistData, setPlaylistData] = useState();
  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const response = await getDetailPlaylist(pid);
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
      }
    };
    fetchDetailPlayList();
    return () => {};
  }, [pid]);

  return (
    <div className="flex gap-8 w-full h-full px-[60px]">
      <div className="flex-none w-1/4 border border-red-500 flex flex-col items-center gap-2">
        <img
          src={playlistData?.thumbnailM}
          alt="thumbnail"
          className="w-full object-contain rounded-md shadow-md"
        />
        <div className="flex flex-col items gap-1">
          <h3 className="text-[20px]  font-bold text-gray-800">
            {playlistData?.title}
          </h3>
          <span>Cập Nhật:</span>
          <span>
            {moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YY")}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs">{`${Math.round(
            playlistData?.like / 1000
          )}K người yêu thích`}</span>
        </div>
      </div>
      <Scrollbars style={{ width: "100%", height: "80%" }}>
        <div className="flex-auto mb-40">
          <span className="text-sm">
            <span className="text-gray-600">Lời tựa </span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <Lists
            songs={playlistData?.song?.items}
            totalDuration={playlistData?.song?.totalDuration}
          />
        </div>
      </Scrollbars>
    </div>
  );
}

export default Album;
